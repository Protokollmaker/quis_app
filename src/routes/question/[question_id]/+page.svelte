<script lang="ts">
	import Question from '$lib/components/question.svelte';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	export let data;
	let question: any;
	onMount(async () => {
		const res = await supabaseClient
			.from('Questions')
			.select()
			.eq('id', data.data.question_id)
			.limit(1)
			.single();
		question = res.data;
	});
</script>

<section>
	{#if question}
		<Question {question} />
	{/if}
</section>

<style></style>
