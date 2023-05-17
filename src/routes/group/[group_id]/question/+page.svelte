<script lang="ts">
	import { goto } from '$app/navigation';
	import Question from '$lib/components/question.svelte';
	import { supabaseClient } from '$lib/supabase';
	import { error } from '@sveltejs/kit';
	import { onMount, setContext } from 'svelte';
	let question: any = {};
	let dataFetcht = false;
	export let data;
	let question_num = 0;
	let question_num_max = 0;
	let questionStack: any = [];
	let answers: any = {};
	async function getQuestion(uuid: any) {
		const test = await supabaseClient.from('Questions').select().eq('id', uuid).limit(1).single();
		if (test.error) {
			console.log(error);
		}
		console.log(test.data);
		question = test.data ? test.data : 0;
		dataFetcht = true;
	}
	async function isComplieaded() {
		const res = await supabaseClient
			.from('groupAnswers')
			.select()
			.eq('user', data.session?.user.id)
			.eq('group', data.data.group_id)
			.limit(1);
		if (res.error) {
			console.log(res.error);
			return 1;
		}
		return res.data.length;
	}
	onMount(async () => {
		if (await isComplieaded()) {
			goto('/group/' + data.data.group_id + '/leaderboard');
		}
		const res = await supabaseClient
			.from('group')
			.select()
			.eq('id', data.data.group_id)
			.limit(1)
			.single();
		if (res.error) console.log(res.error);
		questionStack = res.data.question;
		console.log(questionStack);
		getQuestion(questionStack[question_num].question_id);
		question_num_max = questionStack.length;
		answers.awnsersGiven = [];
		answers.user = data.session?.user.id;
		answers.group = data.data.group_id;
		answers.answersWrong = 0;
		answers.answersCorrect = 0;
	});
	function buttonNextQuestion(awnser: undefined | boolean, awnser_long: undefined | number) {
		console.log(awnser, awnser_long);
		answers.awnsersGiven.push({
			answergiven: awnser_long
		});
		if (awnser) {
			answers.answersCorrect += 1;
		} else {
			answers.answersWrong += 1;
		}
		setTimeout(async () => {
			if (question_num == question_num_max) {
				const res = await supabaseClient.from('groupAnswers').insert(answers);
				if (res.error) console.log(res.error);
				goto('/group/' + data.data.group_id + '/leaderboard');
			}
			for (let [i, answer] of question.answers.answers.entries()) {
				var div = document.getElementById('answer' + i + 'label');
				if (div != undefined) {
					div.style.backgroundColor = '#f6f6f6';
				}
			}
			if (question_num != question_num_max) {
				getQuestion(questionStack[question_num].question_id);
			}
			console.log(question);
		}, 1000);
	}

	setContext('buttoncontroll', { buttonNextQuestion });
	// fecht question id {data.data.question_id}
</script>

<section>
	{#if dataFetcht}
		<Question {question} bind:question_num bind:question_num_max />
	{/if}
</section>

<style></style>
