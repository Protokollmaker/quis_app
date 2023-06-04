<script lang="ts">
	import { browser } from '$app/environment';
	import Question1 from '$lib/components/question1.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { next_question, prev_question, questionarray } from '$lib/stores/questionarray';
	import { get } from 'svelte/store';

	let question: any = {};
	let questioncount: number = 0;
	let lastquestioncount: number = -1;
	let anwerser: any = {};
	console.log(get(questionarray));
	questionarray.subscribe((value) => {
		question = value.current_question;
		anwerser = value.current_anwerser;
	});

	function load(n: number) {
		if (!browser) return 0;
		if (n > lastquestioncount)
			next_question(async (n: number) => {
				const res = await supabaseClient.from('QuestionsRandom').select().limit(n);
				return res.data;
			});
		if (n < lastquestioncount) prev_question();
		lastquestioncount = n;
	}
	$: load(questioncount);
</script>

<section>
	{#if question?.id}
		<Question1
			bind:question={$questionarray.current_question}
			bind:question_num={questioncount}
			bind:anwerser={$questionarray.current_anwerser}
		/>
	{/if}
</section>

<style></style>
