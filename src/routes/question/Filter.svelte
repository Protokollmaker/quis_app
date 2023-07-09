<script lang="ts">
	// @ts-nocheck
	import { Button } from '$components/ui/button';
	import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '$components/ui/collapsible';
	import { Label } from '$components/ui/label';
	import { Toggle } from '$components/ui/toggle';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { ChevronsUpDown } from 'lucide-svelte';
	export let aktivTags = null;
	let isOpen = false;
	let elemnt: any = {};

	async function loadTags(tags: Array<String> | null) {
		let res: any;
		if (tags == null) res = await supabaseClient.from('Questions_distinct_tags').select();
		else
			res = await supabaseClient.rpc('helper_questions_tag_querys', {
				tags_input: JSON.stringify(tags)
			});
		if (res.error) {
			console.log(res.error);
		}
		if (res.data != null) {
			return res.data;
		}
		return [];
	}

	function getAktivTags(tag: any) {
		const aktivTags: Array<String> = [];
		for (const [key, value] of Object.entries(tag)) {
			if (value == true) aktivTags.push(key);
		}
		if (aktivTags.length != 0) return aktivTags;
		return null;
	}
	$: aktivTags = getAktivTags(elemnt);
</script>

<Collapsible open={isOpen} class="w-[350px] space-y-2">
	<div class="flex items-center justify-between space-x-4 px-4">
		<h4 class="text-sm font-semibold">Title Suche hier</h4>
		<CollapsibleTrigger>
			<Button variant="ghost" size="sm" class="w-9 p-0">
				<ChevronsUpDown class="h-4 w-4" />
				<span class="sr-only">Toggle</span>
			</Button>
		</CollapsibleTrigger>
	</div>
	<CollapsibleContent
		class="flex-wrap flex bg-white border-b"
		style="position: absolute;width: calc(100vw - 18px);
		overflow: hidden; left: 9px;"
	>
		{#await loadTags(aktivTags)}
			läde
		{:then tags}
			{#if Array.isArray(tags)}
				{#each tags as tag}
					<Label
						class="rounded-md border px-1 py-1 text-sm flex mb-2 mr-2 min-w-fit"
						style=" flex-basis: 0; flex-grow: 1;"
						><Toggle
							class="w-full text-right flex items-center justify-center"
							variant="nocenter"
							size="sm"
							bind:pressed={elemnt[tag.tag]}>{tag.tag}</Toggle
						>
					</Label>
				{/each}
			{:else}
				Ups es ist etwas falsch glaufen
			{/if}
		{/await}
	</CollapsibleContent>
</Collapsible>

<style>
</style>
