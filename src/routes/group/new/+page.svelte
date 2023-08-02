<script lang="ts">
	import PrintQuestion from '$components/Question/utils/printQuestion.svelte';
	import { Button } from '$components/ui/button';
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import type { PageData } from './$types';
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
	let questionIDs: Array<string> = [];
	function turnToIDArray(array:any){
		let arrayQuestionID: Array<string> = [];
		for (let element of array) {
			arrayQuestionID.push(element.question_id);
		}
		questionIDs = arrayQuestionID;
	}
	$: turnToIDArray(array);
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
		<PrintQuestion variant="boarder" bind:questionIDs={questionIDs}/>
		<Button on:click={senddata}>Gruppe Erstellen</Button>
	</div>
	{error}
</section>

<style></style>
