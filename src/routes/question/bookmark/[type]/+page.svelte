<script lang="ts">
	import { get } from 'svelte/store';
	import type { PageData } from './$types';

	import { browser } from '$app/environment';
	import QuestionMenager from '$components/Question/QuestionMenager.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import {
		getBookmarkColection,
		getBookmarkIds,
		questionBookmarks
	} from '$lib/stores/bookmarksQuestion';
	import { next_question, prev_question, questionarray } from '$lib/stores/questionarray';
	export let data: PageData;
	let questioncount: number = 0;
	let lastquestioncount: number = -1;
	let first_anwnser_correct: null | any = null;
	let pageSize: number = 10;
	let offset: number = 0;

	function load(n: number) {
		if (!browser) return 0;
		if (n > lastquestioncount)
			next_question(async (n: number) => {
				let t_array = getBookmarkIds(
					getBookmarkColection(get(questionBookmarks), data.data.Bookmarktype)
				);
				console.log(t_array);
				const res = await supabaseClient.rpc('helper_question_in_array', {
					t_array: t_array,
					t_limit: pageSize,
					t_offset: offset
				});
				offset += pageSize;
				return res.data;
			});
		if (n < lastquestioncount) prev_question();
		lastquestioncount = n;
	}
	$: load(questioncount);
</script>

<section>
	{#if $questionarray.current_question?.id}
		<QuestionMenager
			bind:question={$questionarray.current_question}
			bind:count={questioncount}
			bind:answered={$questionarray.current_anwerser}
			bind:first_answer={first_anwnser_correct}
		/>
	{:else}
		Schaue ob du Eingelogt bist oder fragen gebookmarkt hast {data.data.Bookmarktype}
		<Button
			class="m-2"
			variant="boarder"
			on:click={() => {
				questioncount--;
			}}>vorherige Frage</Button
		>
	{/if}
</section>

<style></style>
