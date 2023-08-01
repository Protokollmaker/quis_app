<script lang="ts">
	import { browser } from '$app/environment';
	import QuestionMenager from '$components/question/QuestionMenager.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { addValue, questionData } from '$lib/stores/questionPercent';
	import { createQuestionsStore, nextQuestion, prevQuestion } from '$lib/stores/questionStore';
	import { get } from 'svelte/store';
	const defaltFill = { anwerser: {} };
	const questionstore = createQuestionsStore(defaltFill);
	let questioncount: number = 0;
	let lastquestioncount: number = -1;
	let first_anwnser_correct: null | any = null;
	let arrayOfQuestionIds: Array<string> = [];

	$: questionData.set(
		addValue(get(questionData), first_anwnser_correct?.id, first_anwnser_correct?.percent).obj
	);
	$: {
		if (first_anwnser_correct?.id) arrayOfQuestionIds.push(first_anwnser_correct.id);
	}

	function load(n: number) {
		if (!browser) return 0;
		if (n > lastquestioncount) {
			nextQuestion(questionstore, defaltFill, 10, async (n: number) => {
				const res = await supabaseClient.rpc('helper_random_question_not_in_array', {
					t_array: arrayOfQuestionIds,
					t_limit: n,
					t_offset: 0
				});
				if (res.error) console.log(res.error);
				return res.data;
			});
		}
		if (n < lastquestioncount) {
			prevQuestion(questionstore, defaltFill);
		}
		lastquestioncount = n;
	}
	$: load(questioncount);
</script>

<section>
	{#if $questionstore.current?.question}
		<QuestionMenager
			bind:question={$questionstore.current.question}
			bind:count={questioncount}
			bind:answered={$questionstore.current.anwerser}
			bind:first_answer={first_anwnser_correct}
		/>
	{:else}
		Schau ob du eingelogt bist oder Alle Fragen Einmal beantwortet hast
	{/if}
</section>

<style></style>
