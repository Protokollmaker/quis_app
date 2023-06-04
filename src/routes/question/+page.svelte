<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import {
		Table,
		TableBody,
		TableCaption,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let pageSize = 20;
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
		invoices = data;
	}

	onMount(async () => {
		// todo Backend auth so the sidie don't get loaded on login
		if (!data.session) {
			goto('/');
		}
	});

	$: load(offset);
	let invoices: any = [];
</script>

<section>
	<h1 class="">Alle fragen</h1>
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
	<Table>
		<TableCaption>Eine Liste von Fragen</TableCaption>
		<TableHeader>
			<TableRow>
				<TableHead class="w-[100px]">uuid</TableHead>
				<TableHead>Title</TableHead>
				<TableHead class="text-right">Tag</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each invoices as invoice, i (i)}
				<TableRow key={invoice.id}>
					<TableCell class="font-medium">{invoice.id.substring(0, 8)}</TableCell>
					<TableCell><a href="/question/{invoice.id}">{invoice.Title}</a></TableCell>
					<TableCell class="text-right"
						>{#each invoice.tags.tags as tag}
							<div class="tag text-sm text-black ">#{tag}</div>
						{/each}</TableCell
					>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
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
</section>

<style>
	.tag {
		color: #2c5670;
		background-color: #d3e5ef;
		display: inline;

		padding: 1px 5px 1px 5px;
		margin: 3px;
		border-radius: 320px;
	}
</style>
