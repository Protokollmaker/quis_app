<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Layout1 from '$components/Question/Layout1.svelte';
	import Layout2 from '$components/Question/Layout2.svelte';
	import Layout3 from '$components/Question/Layout3.svelte';
	import QuestionMenager from '$components/Question/QuestionMenager.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let questions: any;
	let anwerser: any = {};
	let first_answer: any;
	const questionsID: Array<string> = JSON.parse($page.url.searchParams.get('questionsID') || '[]');
	onMount(async () => {
		if (!browser) return 0;
		console.log(questionsID);
		console.log(data);
		const res = await supabaseClient.rpc('helper_question_in_array', {
			t_array: questionsID,
			t_limit: questionsID.length,
			t_offset: 0
		});
		console.log(res);
		questions = res.data;
	});
	const layouts = [
		{
			name: 'Layout3',
			layout: {
				layout: Layout3,
				questiontext: 'font-size: 16px;',
				anwersertext: '',
				questionimg: 'max-height: 200px;',
				anwerserimg: 'max-height: 10vh;',
				anwerserdistens: 'padding: 5px'
			}
		},
		{
			name: 'Layout2',
			layout: {
				layout: Layout2,
				questiontext: 'font-size: 16px;',
				anwersertext: '',
				questionimg: 'max-height: 200px;',
				anwerserimg: 'max-height: 10vh;',
				anwerserdistens: 'padding: 5px'
			}
		},
		{
			name: 'Layout1',
			layout: {
				layout: Layout1,
				questiontext: '',
				anwersertext: '',
				questionimg: 'max-height: 400px;',
				anwerserimg: 'max-height: 12vh; height: 12vh;',
				anwerserdistens: 'padding: 2%;'
			}
		}
	];

	function getLayout(options: typeof layouts, type: string) {
		const result = options.findIndex((item) => item.name === type);
		if (result == -1) return options[0].layout;
		return options[result].layout;
	}

	let flags = {
		ShowNextButton: false,
		ShowPrevButton: false,
		alwaysShowAnwerser: data.data.showSolustion
	};
	let numbers = Array.from(Array(23).keys());
</script>

<section class="small">
	{#if questions}
		{#each questions as question, i}
			<div style="page-break-before: auto;">
				<QuestionMenager
					layout={getLayout(layouts, data.data.Layout)}
					bind:flags
					bind:question
					bind:count={numbers[i]}
					bind:max_question_count={questionsID.length}
					bind:answered={anwerser}
					bind:first_answer
				/>
			</div>
		{/each}
	{/if}
</section>

<style>
</style>
