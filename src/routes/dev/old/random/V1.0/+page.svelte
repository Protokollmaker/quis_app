<script lang="ts">
	import Question from '$lib/components/question.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { onMount, setContext } from 'svelte';
	let question: any = {};
	let dataFetcht = false;
	async function getQuestion() {
		const test = await supabaseClient.from('QuestionsRandom').select().limit(1).single();
		question = test.data ? test.data : 0;
		dataFetcht = true;
	}
	onMount(async () => {
		getQuestion();
	});
	function buttonNextQuestion(awnser: undefined | boolean, awnser_long: undefined | number) {
		console.log(awnser, awnser_long);
		setTimeout(async () => {
			for (let [i, answer] of question.answers.answers.entries()) {
				var div = document.getElementById('answer' + i + 'label');
				if (div != undefined) {
					div.style.backgroundColor = '#f6f6f6';
				}
			}
			getQuestion();
			console.log(question);
		}, 1000);
	}

	setContext('buttoncontroll', { buttonNextQuestion });
	// fecht question id {data.data.question_id}
</script>

<section>
	{#if dataFetcht}
		<Question {question} />
	{/if}
</section>

<style></style>
