<script lang="ts">
	import { goto } from '$app/navigation';
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
	export let data: PageData;
	let pageSize = 50;
	let questions: any = [];
	let offset = 0;
	async function load(t_offset: number) {
		if (t_offset < 0) {
			offset = 0;
			t_offset = 0;
		}
		const { data } = await supabaseClient
			.from('Questions')
			.select('id, tags, version, Title')
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
</script>

<section>
	<div class="flex m-4" style="justify-content: space-between;">
	<span class="text-2xl">Alle fragen</span>
	<div class="inline" >
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
			<TableRow key={question.id} 
			on:click={()=>{
				goto("/question/"+ question.id)
			}}>
					<TableCell class="font-medium">{question.id.substring(0, 8)}</TableCell>
					<TableCell><a href="/question/{question.id}">{question.Title}</a></TableCell>
					<TableCell class="text-right"
						>{#each question.tags.tags as tag}
							<div 
							class="tag text-sm text-black rounded-lg">
								#{tag}
							</div>
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

<style>
	.tag {
		color: #2c5670;
		background-color: #d3e5ef;
		display: inline;

		padding: 1px 5px 1px 5px;
		margin: 3px;
	}
</style>
