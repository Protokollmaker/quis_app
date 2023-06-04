<script lang="ts">
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
</script>

<section>
	<h1>Erstelle gruppe</h1>
	<div>Titel: <input type="text" bind:value={titel} /></div>
	<div>
		Zufälige elemente hinzufügen: <input type="number" bind:value={random_count} /><button
			on:click={addRandom}>Hinzufügen</button
		>
	</div>
	{#each array as element, i}
		<div>
			{i + 1}: <input type="text" bind:value={array[i].question_id} /><button
				on:click={() => {
					removeElement(i);
				}}>🗑️</button
			>
		</div>
	{/each}
	<button on:click={addElement}>Element hinzufügen</button><br /><br /><br />
	<button on:click={senddata}>Gruppe Erstellen</button>
	{error}
</section>

<style></style>
