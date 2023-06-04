<script lang="ts">
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { onMount } from 'svelte';
	export let data;
	let leaderboard: any = {};
	onMount(async () => {
		const res = await supabaseClient
			.from('groupAnswers')
			.select()
			.eq('user', data.session?.user.id)
			.eq('group', data.data.group_id)
			.limit(1)
			.single();
		if (res.error) console.log(res.error);
		leaderboard = res.data;
	});
	async function loadgroupquestion() {
		const questionArray = await supabaseClient
			.from('group')
			.select('question')
			.eq('id', data.data.group_id)
			.limit(1)
			.single();
		if (!questionArray.data) return [];
		let ids_array: Array<any> = [];
		console.log(questionArray.data);

		let ids: any = questionArray.data.question;
		for (let question_id of ids) {
			ids_array.push(question_id.question_id);
		}
		console.log(ids_array);
		const res = await supabaseClient.from('Questions').select().in('id', ids_array);
		return res.data;
	}
</script>

<section>
	{#if leaderboard?.id}
		<div>
			<h1>Du hast schon Dies groupe Absolviert</h1>
			du hast {leaderboard.answersWrong} Falschbeantwortet und {leaderboard.answersCorrect} Richtig Beantwortet
		</div>
		<a href="/group/{data.data.group_id}/leaderboard">Schaue wie andere Abgeschnitten haben</a>
	{:else}
		<a href="/group/{data.data.group_id}/question">Strate kurs</a>
	{/if}
	<br />
	<br />
	<h2>Fragen die gestellt werden</h2>
	{#await loadgroupquestion()}
		Läde Fragen ...
	{:then questions}
		{#if questions}
			{#each questions as question}
				<div>{question.Title}</div>
			{/each}
		{/if}
	{/await}
</section>

<style></style>
