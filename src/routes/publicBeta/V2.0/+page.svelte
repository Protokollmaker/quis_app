<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$components/ui/tabs';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { Plus, X } from 'lucide-svelte';
	import NewTextarea from './newTextarea.svelte';
	import Newcloze from './newcloze.svelte';

	//import type { PageData } from './$types';
	//export let data: PageData;
	export let data: any;
	type type_uuid_exam = {
		year: number | undefined;
		exam_part: 'Teil1' | 'Teil2' | undefined;
		part: 'TeilA' | 'TeilB' | undefined;
		question: number | undefined;
	};
	let exams: Array<type_uuid_exam> = [];
	//
	type questionType = {
		type: string;
		Title: string;
	};
	let questionprop: questionType = { type: 'Multiple choic', Title: '' };
	//
	let tags: Array<string> = [];
	//
	let questionSerilaiser: any = {};
	let error: string = '';
	console.log(data);
	function serialize() {
		let sendjson: any = {};
		sendjson.tags = {
			tags: tags,
			exams: exams
		};
		sendjson.Type = questionprop.type;
		sendjson.Title = questionprop.Title;
		sendjson.version = 1;
		let question = questionSerilaiser[questionprop.type];
		for (const [key, value] of Object.entries(question.serialize())) {
			sendjson[key] = value;
		}
		sendjson.owner = data.session?.user.id;
		return sendjson;
	}
	function clear() {
		let question = questionSerilaiser[questionprop.type];
		tags = [];
		questionprop.Title = '';
		if (exams.length) exams = [exams[0]];
		question.clear();
	}
</script>

<section>
	<h1>Erstelle Frage V2</h1>
	<Label>Titel:</Label>
	<div class="m-3">
		<Input
			type="text"
			placeholder="Schreibe hier den namen der Frage herein"
			bind:value={questionprop.Title}
		/>
	</div>
	<Label>Tags:</Label>
	<div class="m-2">
		{#each tags as tag, i}
			<div class="flex gap-2 mb-1">
				<Input type="text" placeholder="Füge Tags hinzue" bind:value={tag} />
				<Button
					variant="secondary"
					on:click={() => {
						tags.splice(i, 1);
						tags = [...tags];
					}}><X /></Button
				>
			</div>
		{/each}
	</div>
	<Button
		variant="secondary"
		class="m-2"
		on:click={() => {
			tags = [...tags, ''];
		}}><Plus /></Button
	>
	<div>
		<Label>Gefunden in:</Label>
		<div class="m-2">
			{#each exams as exsam, i}
				<div class="flex mb-2 gap-2">
					<Input type="text" placeholder="Jahr der Prüfung" bind:value={exsam.year} />
					<Input type="text" placeholder="nummer der Frage" bind:value={exsam.question} />
					<select name="questionPart" id="questionPart" bind:value={exsam.part}>
						<option value="TeilA">Teil A</option>
						<option value="TeilB">Teil B</option>
					</select>
					<select name="questionPart1" id="questionPart1" bind:value={exsam.exam_part}>
						<option value="Teil1">Teil 1</option>
						<option value="Teil2">Teil 2</option>
					</select>
					<Button
						variant="secondary"
						on:click={() => {
							exams.splice(i, 1);
							exams = [...exams];
						}}><X /></Button
					>
				</div>
			{/each}
		</div>
		<Button
			variant="secondary"
			class="m-2"
			on:click={() => {
				exams = [
					...exams,
					{ year: undefined, exam_part: 'Teil1', part: 'TeilA', question: undefined }
				];
			}}><Plus /></Button
		>
	</div>
	<h1>Fragen Spezifisch</h1>
	<Tabs class="w-full p-4" bind:value={questionprop.type}>
		<TabsList class="w-full flex justify-between">
			<TabsTrigger class="w-full" value="Multiple choice">Mehrfachauswahl</TabsTrigger>
			<TabsTrigger class="w-full" value="TableQuestion">Tabellen frage</TabsTrigger>
			<TabsTrigger class="w-full" value="cloze">Lückentext</TabsTrigger>
			<TabsTrigger class="w-full" value="Textarea">TextFelt</TabsTrigger>
			<TabsTrigger class="w-full" value="X-template">X-Vorlage</TabsTrigger>
		</TabsList>
		<TabsContent value="cloze">
			<Newcloze />
		</TabsContent>
		<TabsContent value="Textarea">
			<NewTextarea userid={data.session?.user.id} bind:this={questionSerilaiser.Textarea} />
		</TabsContent>
	</Tabs>
	<Button
		on:click={async () => {
			const res = await supabaseClient.from('Questions').insert(serialize());
			if (res.error) {
				console.log(res.error);
			} else {
				clear();
			}
		}}>Send zur Datenbank</Button
	>
</section>

<style></style>
