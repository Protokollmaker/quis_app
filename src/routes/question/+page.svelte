<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let pageSize = 10;
	let questions: any = [];
	let offset = 0;
	async function load(t_offset: number) {
		if (t_offset < 0) {
			offset = 0;
			t_offset = 0;
		}
		const { data } = await supabaseClient
			.from('Questions')
			.select()
			.range(t_offset, t_offset + pageSize - 1);
		questions = data;
	}

	onMount(async () => {
		// todo Backend auth so the sidie don't get loaded on login
		if (!data.session) {
			goto('/');
		}
	});

	$: load(offset);

	function addOffset(num: number) {
		offset += num;
	}
</script>

<section>
	<h1>Alle fragen</h1>
	<table>
		<tr class="header">
			<th class="uuid_header">uuid</th>
			<th>title</th>
			<th style="text-align: right;">Tags</th>
			<th class="version">version</th>
		</tr>
		{#each questions as question}
			<tr class="row">
				<td class="questionID"> <span class="ID_span">{question.id.substring(0, 8)}</span></td>
				<td class="title"><a href="/question/{question.id}">{question.Title}</a></td>
				<td class="tags">
					{#each question.tags.tags as tag}
						<div class="tag">#{tag}</div>
					{/each}
				</td>
				<td class="version">{question.version}</td>
			</tr>
		{/each}
	</table>
	<button
		on:click={() => {
			addOffset(-pageSize);
		}}>Vorherige Seite</button
	>
	{offset / pageSize + 1}
	<button
		on:click={() => {
			addOffset(pageSize);
		}}>Nächste Seite</button
	>
</section>

<style>
	.tags {
		text-align: right;
	}
	.tag {
		color: #402c1b;
		background-color: #fdecc8;
		display: inline;

		padding: 1px 5px 1px 5px;
		margin: 3px;
		border-radius: 320px;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-size: 14px;
	}
	th {
		text-align: left;
	}
	tr {
		height: 5vh;
	}
	a {
		width: 100%;
	}
	.ID_span {
		margin: 10px;
	}
	.uuid_header {
		width: 1px;
		margin: 10px;
	}
	tr:nth-child(even) {
		background-color: #f1f1f1;
	}
	table {
		width: 100%;
		border-collapse: collapse;
	}
	.questionID {
		margin: 10px;
	}
	.title {
		margin-left: 10px;
	}
	.version {
		text-align: right;
	}
</style>
