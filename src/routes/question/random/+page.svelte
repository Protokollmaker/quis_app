<script lang="ts">
	import { browser } from '$app/environment';
	import QuestionMenager from '$components/Question/QuestionMenager.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { addValue, questionData } from '$lib/stores/questionPercent';
	import { next_question, prev_question, questionarray } from '$lib/stores/questionarray';
	import { get } from 'svelte/store';

	let question: any = {};
	let questioncount: number = 0;
	let lastquestioncount: number = -1;
	let anwerser: any = {};
	let first_anwnser_correct: null | any = null;
	questionarray.subscribe((value) => {
		question = value.current_question;
		anwerser = value.current_anwerser;
	});

	$: questionData.set(
		addValue(get(questionData), first_anwnser_correct?.id, first_anwnser_correct?.percent).obj
	);

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
		<QuestionMenager
			bind:question={$questionarray.current_question}
			bind:count={questioncount}
			bind:answered={$questionarray.current_anwerser}
			bind:first_answer={first_anwnser_correct}
		/>
	{/if}
</section>

<style></style>
