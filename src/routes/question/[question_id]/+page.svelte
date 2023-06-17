<script lang="ts">
	import Question1 from '$lib/components/question1.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { onMount } from 'svelte';
	export let data;
	let question: any;
	let anwerser: any;
	let first_anwnser_correct: any;
	let question_num: number = 1;
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
		<Question1 bind:question bind:question_num bind:anwerser bind:first_anwnser_correct />
	{/if}
</section>

<style></style>
