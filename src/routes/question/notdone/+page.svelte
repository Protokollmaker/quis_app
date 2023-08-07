<script lang="ts">
	import { browser } from '$app/environment';
	import QuestionMenager from '$components/Question/QuestionMenager.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { addValue, getQuestionIDs, questionData } from '$lib/stores/questionPercent';
	import { createQuestionsStore, nextQuestion, prevQuestion } from '$lib/stores/questionStore';
	import { get } from 'svelte/store';
	const defaltFill = { anwerser: {} };
	const questionstore = createQuestionsStore(defaltFill);
	let questioncount: number = 0;
	let lastquestioncount: number = -1;
	let first_anwnser_correct: null | any = null;
	async function getMaxQuestion() {
		if (!browser) return 0;
		const res = await supabaseClient.rpc('helper_questions_count');
		if (res.error) return 0;
		max_question = res.data - get(questionData).length;
	}
	getMaxQuestion();
	let max_question = 0;

	$: questionData.set(
		addValue(get(questionData), first_anwnser_correct?.id, first_anwnser_correct?.percent).obj
	);

	function load(n: number) {
		if (!browser) return 0;
		if (n > lastquestioncount) {
			nextQuestion(questionstore, defaltFill, 10, async (n: number) => {
				let t_array = getQuestionIDs(get(questionData));
				const res = await supabaseClient.rpc('helper_question_not_in_array', {
					t_array: t_array
				});
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
			bind:answered={$questionstore.current.extra.anwerser}
			bind:conntrolls={$questionstore.current.controlls}
			bind:first_answer={first_anwnser_correct}
			bind:max_question_count={max_question}
		/>
	{:else}
		Schau ob du eingelogt bist oder Alle Fragen Einmal beantwortet hast
	{/if}
</section>

<style></style>
