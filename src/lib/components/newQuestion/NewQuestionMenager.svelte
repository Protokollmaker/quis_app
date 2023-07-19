<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$components/ui/tabs';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { Plus, X } from 'lucide-svelte';
	import NewMutltiplechois from './newMutltiplechois.svelte';
	import NewTextarea from './newTextarea.svelte';

	//import type { PageData } from './$types';
	//export let data: PageData;
	export let data: any;
	export let questionID: string | undefined = undefined;
	type type_uuid_exam = {
		year: number | undefined;
		exam_part: 'Teil1' | 'Teil2' | undefined;
		part: 'TeilA' | 'TeilB' | undefined;
		season: 'Autumn' | 'Summer' | 'Winter' | 'Spring' | undefined;
		question: number | string | undefined;
	};

	const seasons = [
		{ season: 'Autumn', name: 'Herbst' },
		{ season: 'Summer', name: 'Sommer' },
		{ season: 'Winter', name: 'Winter' },
		{ season: 'Spring', name: 'Frühling' }
	];

	const options = [
		{ component: NewMutltiplechois, type: 'Multiple choice', name: 'Mehrfachauswahl' },
		{ component: NewTextarea, type: 'Textarea', name: 'TextFelt' }
	];
	/*<TabsTrigger class="w-full" value="TableQuestion">Tabellen frage</TabsTrigger>
			<TabsTrigger class="w-full" value="cloze">Lückentext</TabsTrigger>
			<TabsTrigger class="w-full" value="Textarea">TextFelt</TabsTrigger>
			<TabsTrigger class="w-full" value="X-template">X-Vorlage</TabsTrigger>*/

	let exams: Array<type_uuid_exam> = [];
	let owner: string = data.session?.user.id;
	let focreType: string | undefined = undefined;
	//
	type questionType = {
		type: string;
		Title: string;
	};
	let questionprop: questionType = { type: options[0].type, Title: '' };
	//
	let tags: Array<string> = [];
	//
	let questionSerilaiser: any = {};
	let error: string = '';
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
		sendjson.owner = owner;
		return sendjson;
	}
	function clear() {
		let question = questionSerilaiser[questionprop.type];
		tags = [];
		questionprop.Title = '';
		focreType = undefined;
		owner = data.session?.user.id;
		questionID = undefined;
		if (exams.length) exams = [exams[0]];
		question.clear();
	}

	function deserialise(t_question: any) {
		questionprop.type = t_question.Type;
		focreType = t_question.Type;
		questionprop.Title = t_question.Title;
		owner = t_question.owner;
		questionID = t_question.id;
		tags = t_question.tags.tags;
		if (t_question.version == 0) {
			exams = deserialiseExsamV0(t_question.tags);
		} else {
			exams = t_question.tags.exams;
		}
		let question = questionSerilaiser[questionprop.type];
		question.deserialise(t_question);
	}

	function deserialiseExsamV0(json: any): Array<type_uuid_exam> {
		let exsam: Array<type_uuid_exam> = [];
		///
		let teilnumber = json.path.pop();
		let teilletter = json.path.pop();
		for (let element of json.path) {
			let year = element;
			let question = 'Fehler Fragen Nummer nicht gefunden';
			if (json.extra) question = json.extra.pop() || 'Fehler Fragen Nummer weniger als jahre';
			exsam.push({
				year: year,
				exam_part: teilnumber,
				part: teilletter,
				season: 'Autumn',
				question: question
			});
		}
		return exsam;
	}

	$: loadQuestion(questionID);
	async function loadQuestion(id: string | undefined) {
		if (!id) return;
		const res = await supabaseClient.from('Questions').select().eq('id', id).limit(1).single();
		if (res.data) {
			console.log(res.data);
			deserialise(res.data);
		} else console.log(res.error);
	}
</script>

<section>
	<!--<Button
		on:click={() => {
			loadQuestion('130694f4-56d0-4102-b25a-bbcf482e5919');
		}}>Test</Button
	>-->
	{#if questionID}
		<h1>Du editierst {questionID}</h1>
	{:else}
		<h1>Erstelle Frage V2</h1>
	{/if}
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
					<select>
						{#each seasons as season}
							<option value={season.season}>{season.name}</option>
						{/each}
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
					{
						year: undefined,
						exam_part: 'Teil1',
						part: 'TeilA',
						season: 'Autumn',
						question: undefined
					}
				];
			}}><Plus /></Button
		>
	</div>
	<h1>Fragen Spezifisch</h1>

	<Tabs class="w-full p-4" bind:value={questionprop.type}>
		<TabsList class="w-full flex justify-between">
			{#each options as option}
				{#if focreType == undefined || focreType == option.type}
					<TabsTrigger class="w-full" value={option.type}>{option.name}</TabsTrigger>
				{/if}
			{/each}
		</TabsList>
		<TabsContent class="w-full" value="null">null</TabsContent>
		{#each options as option}
			<TabsContent value={option.type}>
				<svelte:component
					this={option.component}
					userid={data.session?.user.id}
					bind:this={questionSerilaiser[option.type]}
				/>
			</TabsContent>
		{/each}
	</Tabs>
	<Button
		on:click={async () => {
			if (questionID == undefined) {
				const res = await supabaseClient.from('Questions').insert(serialize());
				if (res.error) {
					console.log(res.error);
				} else {
					clear();
				}
			} else {
				const res = await supabaseClient.from('Questions').update(serialize()).eq('id', questionID);
				if (res.error) {
					console.log(res.error);
				} else {
					clear();
				}
			}
		}}>Send zur Datenbank</Button
	>
</section>

<style></style>
