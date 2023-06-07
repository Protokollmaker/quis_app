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
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Filter from './Filter.svelte';
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
		console.log(res);
	}

	onMount(async () => {
		// todo Backend auth so the sidie don't get loaded on login
		if (!data.session) {
			goto('/');
		}
	});

	$: load(offset, tags);
</script>

<section>
	<div class="flex m-4" style="justify-content: space-between;">
		<span class="text-2xl">Alle fragen</span>
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
				<TableHead class="text-right">Tag</TableHead>
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
