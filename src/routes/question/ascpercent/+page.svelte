<script lang="ts">
	import { addValue, getArrayOrderdpercentAsc, questionData } from '$lib/stores/questionPercent';
	import { get } from 'svelte/store';

	import { browser } from '$app/environment';
	import QuestionMenager from '$components/Question/QuestionMenager.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { next_question, prev_question, questionarray } from '$lib/stores/questionarray';
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
				let t_array = getArrayOrderdpercentAsc(get(questionData));
				t_array.length = 10;
				console.log(t_array);
				const res = await supabaseClient.rpc('helper_question_in_array', {
					t_array: t_array
				});
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
	{:else}
		Schaue ob du Eingelogt bist oder ob du alle fragen beantwortet hast
	{/if}
</section>

<style></style>
