<script lang="ts">
	import Input from './Input.svelte';

	let yourName = '';
	let inputCount = 0;
	let blurCount = 0;
</script>

<svelte:head>
	<title>Svelte Preprocess Delegate Events DEMO</title>
	<meta name="description" content="Svelte Preprocess Delegate Events demo app" />
</svelte:head>

<section>
{inputCount} : {blurCount}
	<Input
		label="Your Name"
		bind:value={yourName}
		on:input={() => (inputCount += 1)}
		on:blur={() => (blurCount += 1)}
	/>
</section>

<style>
</style>
