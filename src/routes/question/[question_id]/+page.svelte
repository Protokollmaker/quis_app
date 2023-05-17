<script lang="ts">
	import Question from '$lib/components/question.svelte';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	export let data;
	let question: any;
	onMount(async () => {
		const test = await supabaseClient.from('Questions').select().eq('id', data.data.question_id);
		console.log(test.data ? test.data[0] : {});
		//question = test.data ? test.data[0] : {};
	});
	console.log(data.data.question ? data.data.question[0] : {});
	question = data.data.question ? data.data.question[0] : {};
	// fecht question id {data.data.question_id}
</script>

<section>
	<Question {question} />
</section>

<style></style>
