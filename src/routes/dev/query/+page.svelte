<script>
	export let data;
	let { question } = data;
	$: ({ question } = data);
</script>

<ul>
	{#each question as country}
		<li>{country.Name}</li>
	{/each}
</ul>
