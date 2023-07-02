<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$components/ui/button/Button.svelte';
	import Table from '$components/ui/table/Table.svelte';
	import TableBody from '$components/ui/table/TableBody.svelte';
	import TableCell from '$components/ui/table/TableCell.svelte';
	import TableHead from '$components/ui/table/TableHead.svelte';
	import TableHeader from '$components/ui/table/TableHeader.svelte';
	import TableRow from '$components/ui/table/TableRow.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let offset: number = 0;
	let pageSize: number = 50;
	let groups: any = [];
	async function load(offset: number) {
		console.log('res.data');
		if (offset < 0) {
			offset = 0;
		}
		const res = await supabaseClient
			.from('groupJoin')
			.select()
			.range(offset, offset + pageSize - 1);
		if (res.error) console.log(res.error);
		groups = res.data;
	}
	$: load(offset);

	onMount(async () => {
		// todo Backend auth so the sidie don't get loaded on login
		if (!data.session) {
			goto('/');
		}
	});
</script>

<section>
	<div class="flex m-4 justify-between">
		<span class="text-2xl">Alle Gruppen</span>
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
				<TableHead class="text-right">Ersteller</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each groups as group}
				<TableRow class="row">
					<TableCell key={group.id}>{group.id.substring(0, 8)}</TableCell>
					<TableCell><a href="/group/{group.id}">{group.title}</a></TableCell>
					<TableCell class="text-right">
						{group.Name}
					</TableCell>
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

<style></style>
