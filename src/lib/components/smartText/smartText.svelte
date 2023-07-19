<script lang="ts">
	export let text: string | null | undefined;
	type smartTextList = Array<{
		start: string;
		end: string;
		component: any;
	}>;
	export let list: smartTextList;

	function compute(text: string | null | undefined, list: smartTextList) {
		if (!text) return [];
		let element = list.pop();
		if (!element) return [];
		let offset = -1;
		while (true) {
			const index1 = text.indexOf(element.start, offset + 1);
			const index2 = text.indexOf(element.end, index1 + 1);
			if (index1 == -1 || index2 == -1) break;
			offset = index2;
		}

		return [];
	}
	let textList: Array<{ component: any; text: string; list?: smartTextList }>;
	$: textList = compute(text, list);
</script>

{#if list.length != 0}
	{#each textList as textelement}
		{#if textelement?.list}
			<svelte:self bind:text={textelement.text} bind:list={textelement.list} />
		{:else}
			<svelte:component this={textelement.component} bind:text />
		{/if}
	{/each}
{:else}
	{text}
{/if}

<style>
</style>
