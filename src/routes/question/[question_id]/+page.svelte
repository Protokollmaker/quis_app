<script lang="ts">
	import Question from '../question.svelte';
	export let data;
	let question: any;
	console.log(data.data.question ? data.data.question[0] : {});
	question = data.data.question ? data.data.question[0] : {};
	// fecht question id {data.data.question_id}
</script>

<section>
	<Question {question} />
</section>

<style></style>
