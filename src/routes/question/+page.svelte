<script lang="ts">
	import { goto } from '$app/navigation';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { getvalue, questionData } from '$lib/stores/questionPercent';
	import { CheckCheck, Tag } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Filter from './Filter.svelte';
	import NavMenu from './navMenu.svelte';
	import PercentBatch from './percentBatch.svelte';
	export let data: PageData;
	let tags: any = null;
	let pageSize = 50;
	let questions: any = [];
	let offset = 0;
	async function load(t_offset: number, tag: any) {
		if (t_offset < 0) {
			offset = 0;
			t_offset = 0;
		}
		const query = supabaseClient
			.from('Questions')
			.select('id, tags, version, Title')
			.range(t_offset, t_offset + pageSize - 1);
		if (tag) {
			query.contains('tags->tags::json', JSON.stringify(tag));
		}
		const res = await query;
		questions = res.data;
	}

	onMount(async () => {
		// todo Backend auth so the sidie don't get loaded on login
		if (!data.session) {
			goto('/');
		}
	});

	$: load(offset, tags);
	///////////////////////////////////////////////////////////////////////
	let questionIDs: Array<string> = [];
	function QuestionIDs(questions: any){
		let array: Array<string> = [];
		for (let question of questions) {
			array.push(question.id)
		}
		return array;
	}
	$: questionIDs = QuestionIDs(questions);
	
</script>

<section>
	<div class="flex px-4 py-4 w-screen bg-white" style="justify-content: space-between;">
		<div class="flex gap-2 justify-start items-center">
			<NavMenu bind:questionIDs={questionIDs}></NavMenu>
			<h1 class="text-2xl">Alle fragen</h1>
		</div>
		
		<Filter bind:aktivTags={tags} />
		<div class="inline">
			<Button
				variant="boarder"
				size="sm"
				on:click={() => {
					offset -= pageSize;
				}}>Vorherige Seite</Button
			>
			{offset / pageSize + 1}
			<Button
				size="sm"
				on:click={() => {
					offset += pageSize;
				}}>Nächste Seite</Button
			>
		</div>
	</div>
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead class="w-[100px]">uuid</TableHead>
				<TableHead>Title</TableHead>
				<TableHead
					><div class="flex items-center justify-end"><Tag class="p-1" />Tag</div></TableHead
				>
				<TableHead class="text-right">
					<div class="flex items-center justify-end"><CheckCheck class="p-1" />Richtig</div>
				</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each questions as question, i (i)}
				<TableRow
					key={question.id}
					on:click={() => {
						goto('/question/' + question.id);
					}}
				>
					<TableCell class="font-medium">{question.id.substring(0, 8)}</TableCell>
					<TableCell><a href="/question/{question.id}">{question.Title}</a></TableCell>
					<TableCell class="text-right"
						>{#each question.tags.tags as tag}
							<Badge variant="tag">#{tag}</Badge>
						{/each}</TableCell
					>
					<TableCell class="w-1 text-center"
						><PercentBatch percent={getvalue($questionData, question.id)} /></TableCell
					>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
	<div class="m-4 text-right">
		<Button
			variant="boarder"
			size="sm"
			on:click={() => {
				offset -= pageSize;
			}}>Vorherige Seite</Button
		>
		{offset / pageSize + 1}
		<Button
			size="sm"
			on:click={() => {
				offset += pageSize;
			}}>Nächste Seite</Button
		>
	</div>
</section>
