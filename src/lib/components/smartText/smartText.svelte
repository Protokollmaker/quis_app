<script lang="ts">
	type AdvanstText = { redex: RegExp; component: any };
	export let text: string;
	export let option: Array<AdvanstText>;
	let passArray: Array<AdvanstText> = [];
	let textOptions: Array<{ index: number; text: string }> = [];
	$: passArray = [];
	function compute(text: string, options: Array<AdvanstText>) {
		let option = options[options.length - 1];
		if (option == undefined) return [];
		let array = text.split(option.redex);
		console.log(option);
		array = array.filter((text, i) => {
			return i % 4;
		});
		let elements: Array<{ index: number; text: string }> = [];
		array.forEach((text, i) => {
			if ((i + 2) % 3) elements.push({ index: -1, text: text });
			else elements.push({ index: 0, text: text });
		});
		return elements;
	}
	$: textOptions = compute(text, option);
</script>

{#if option.length != 0}
	{#each textOptions as textOption}
		{#if textOption.index == 0}
			<svelte:component this={option[option.length - 1].component} bind:value={textOption.text} />
		{:else}
			<svelte:self bind:text={textOption.text} option={passArray} {...$$restProps} />
		{/if}
	{/each}
{:else}
	<span {...$$restProps}>{text}</span>
{/if}

<style></style>
