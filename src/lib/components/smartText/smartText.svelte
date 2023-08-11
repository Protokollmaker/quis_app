<script lang="ts">
	import type { smartText_Out } from './smartText';

	type AdvanstText = any;
	export let text: string;
	export let option: Array<AdvanstText>;
	let passArray: Array<AdvanstText> = [];
	let textOutArray: smartText_Out = [];
	$: passArray = [];
	function compute(text: string, options: Array<AdvanstText>) {
		if (options.length == 0) return [];
		return options[options.length - 1].func(text);
	}
	$: textOutArray = compute(text, option);
</script>

{#if option.length != 0}
	{#each textOutArray as element}
		{#if element.component != undefined}
			<svelte:component this={element.component} {...element} />
		{:else}
			<svelte:self bind:text={element.value} option={passArray} {...$$restProps} />
		{/if}
	{/each}
{:else}
	<span {...$$restProps}>{text}</span>
{/if}

<style></style>
