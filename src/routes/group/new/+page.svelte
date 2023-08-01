<script lang="ts">
	import { Button, buttonVariants } from '$components/ui/button';
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import type { PageData } from './$types';
	// @ts-ignore
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$components/ui/dialog';
	import DialogFooter from '$components/ui/dialog/DialogFooter.svelte';
	import { Printer } from 'lucide-svelte';
	export let data: PageData;
	let error = '';

	let titel: String = '';
	let array: Array<any> = [];
	function addElement() {
		array = [...array, { question_id: '' }];
	}
	function removeElement(index: number) {
		array.splice(index, 1);
		array = [...array];
	}
	let random_count = 1;
	async function addRandom() {
		const res = await supabaseClient.from('QuestionsRandom').select('id').limit(random_count);
		if (res.data == null) return;
		for (let question of res.data) {
			array = [...array, { question_id: question.id }];
		}
	}
	async function senddata() {
		error = '';
		let object: any = {};
		object.title = titel;
		object.question = array;
		object.created_by = data.session?.user.id;
		const res = await supabaseClient.from('group').insert(object);

		if (res.error) {
			console.log(res.error);
			error = 'error';
		}
	}

	//////////////////////////////////////////////////////////
	let printUrl = '/';
	let print_solution = 'false';
	let print_Layout = 'Layout3';
	function printurl(print_Layout: string, print_solution: string, array: any) {
		let arrayQuestionID = [];
		for (let element of array) {
			arrayQuestionID.push(element.question_id);
		}
		let stringQuestionID = JSON.stringify(arrayQuestionID);
		printUrl = `/question/print/${print_Layout}/${print_solution}?questionsID=${stringQuestionID}`;
		print_ready = false;
	}
	$: printurl(print_Layout, print_solution, array);
	let print_ready = false;
	function printReady() {
		print_ready = true;
	}
</script>

<section class="p-2">
	<h1>Erstelle gruppe</h1>
	<div class="flex gap-2 items-center py-1">
		<Label class="min-w-max">Titel:</Label><Input type="text" bind:value={titel} />
	</div>
	<div class="flex gap-2 items-center py-1">
		<Label class="min-w-max">Zufälige elemente hinzufügen:</Label><Input
			type="number"
			bind:value={random_count}
		/><Button on:click={addRandom}>Hinzufügen</Button>
		<Button on:click={addElement} variant="outline">Leeres Element</Button>
	</div>
	{#each array as element, i}
		<div class="flex gap-2 items-center py-1">
			<Label class="min-w-max">{i + 1}:</Label>
			<Input type="text" bind:value={element.question_id} /><Button
				variant="secondary"
				on:click={() => {
					removeElement(i);
				}}>🗑️</Button
			>
		</div>
	{/each}
	<div class="flex gap-2 items-center py-1 justify-end">
		<Dialog modal={true}>
			<DialogTrigger class={buttonVariants({ variant: 'boarder' })}>
				<Printer class="h-4 my-2 mr-2" />
				<div>Drucken</div>
			</DialogTrigger>
			<DialogContent class="w-max" style="max-width: 80%;">
				<DialogHeader>
					<DialogTitle class="flex gap-2 items-center justify-start">
						<Printer class="h-4 my-2" />
						<div>Drucken</div>
					</DialogTitle>
					<!--<DialogDescription></DialogDescription>-->
				</DialogHeader>
				<div class="px-2">
					<iframe
						class="hidden"
						src={printUrl}
						title="print"
						name="printf"
						id="printf"
						on:load={printReady}
					/>
					<div class="flex gap-2 items-center py-1">
						<Label>Ansicht:</Label>
						<select name="Layout" id="Layout" bind:value={print_Layout}>
							<option value="Layout3">Kleines Grid &#40;empfohlen&#41;</option>
							<option value="Layout2">Horizontale Ansicht</option>
							<option value="Layout1">Web Ansicht &#40;nicht empfohlen&#41;</option>
						</select>
					</div>
					<div class="flex gap-2 items-center py-1">
						<Label>Lösung:</Label>
						<select name="solution" id="solution" bind:value={print_solution}>
							<option value="false"> Nein</option>
							<option value="true">Ja</option>
						</select>
					</div>
				</div>
				<DialogFooter>
					{#if print_ready}
						<Button
							on:click={() => {
								// @ts-ignore
								window.frames['printf'].focus();
								// @ts-ignore
								window.frames['printf'].print();
							}}>Drucken</Button
						>
					{/if}
				</DialogFooter>
			</DialogContent>
		</Dialog>
		<Button on:click={senddata}>Gruppe Erstellen</Button>
	</div>
	{error}
</section>

<style></style>
