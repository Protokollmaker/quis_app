<script lang="ts">
	import { goto } from '$app/navigation';
	import QuestionMenager from '$components/Question/QuestionMenager.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { onMount } from 'svelte';
	export let data;
	let question: any;
	let anwerser: any = {};
	let first_answer: any;
	let question_num: number = 0;
	onMount(async () => {
		// todo Backend auth so the sidie don't get loaded on login
		if (!data.session) {
			goto('/');
		}
		const res = await supabaseClient
			.from('Questions')
			.select()
			.eq('id', data.data.question_id)
			.limit(1)
			.single();
		question = res.data;
	});
	let flags = { ShowNextButton: false, ShowPrevButton: false };
</script>

<section>
	{#if question}
		<QuestionMenager
			bind:flags
			bind:question
			bind:count={question_num}
			bind:answered={anwerser}
			bind:first_answer
			max_question_count={1}
		/>
	{/if}
</section>

<style></style>
