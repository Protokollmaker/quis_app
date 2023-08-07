<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import QuestionMenager from '$components/Question/QuestionMenager.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { addValue, questionData } from '$lib/stores/questionPercent';
	import { createQuestionsStore, nextQuestion, prevQuestion } from '$lib/stores/questionStore';
	import { get } from 'svelte/store';

	const defaltFill = { anwerser: {} };
	const questionstore = createQuestionsStore(defaltFill);
	let questioncount: number = 0;
	let lastquestioncount: number = -1;
	let first_anwnser_correct: null | any = null;

	const questionsID: Array<string> = JSON.parse($page.url.searchParams.get('questionsID') || '[]');
	const maxQuestion = questionsID.length;

	$: questionData.set(
		addValue(get(questionData), first_anwnser_correct?.id, first_anwnser_correct?.percent).obj
	);

	function load(n: number) {
		if (!browser) return n;
		if (n < 0) {
			return 0;
		}
		if (n > lastquestioncount) {
			nextQuestion(questionstore, defaltFill, 10, async (n: number) => {
				const t_array: Array<string> = [];
				for (let i = 0; i < 10; i++) {
					const element = questionsID.pop();
					if (!element) break;
					t_array.push(element);
				}
				console.log(questionsID, t_array);
				const res = await supabaseClient.rpc('helper_question_in_array', {
					t_array: t_array
				});
				return res.data;
			});
		}
		if (n < lastquestioncount) {
			prevQuestion(questionstore, defaltFill);
		}
		lastquestioncount = n;
		return n;
	}
	$: questioncount = load(questioncount);
</script>

<section>
	{#if $questionstore.current?.question}
		<QuestionMenager
			bind:question={$questionstore.current.question}
			bind:count={questioncount}
			bind:answered={$questionstore.current.extra.anwerser}
			bind:conntrolls={$questionstore.current.controlls}
			max_question_count={maxQuestion}
			bind:first_answer={first_anwnser_correct}
		/>
	{:else}
		Du hast alle fragen beantwortet
		<Button
			on:click={() => {
				questioncount -= 1;
			}}>Zurück</Button
		>
	{/if}
</section>

<style></style>
