<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { getBookmarkNames, questionBookmarks } from '$lib/stores/bookmarksQuestion';
	import { get } from 'svelte/store';

	// TODO: zeige hier die colections von bookmarks an
	const types = getBookmarkNames(get(questionBookmarks));
</script>

<section>
	<div class="flex items-center justify-between p-2">
		<h1>Deine Gespeicherten Fragen Colectionen</h1>
	</div>
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead class="w-[100px]">id</TableHead>
				<TableHead>Name</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each types as type, i}
				<TableRow
					key={i}
					on:click={() => {
						goto('/question/bookmark/' + type);
					}}
				>
					<TableCell class="font-medium">{i + 1}</TableCell>
					<TableCell><a href="/question/bookmark/{type}">{type}</a></TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</section>

<style></style>
