<script lang="ts">
	import { supabaseClient } from '$lib/supabase';
	let countries: any = [];
	async function load() {
		const { data } = await supabaseClient.from('Beantwortete Fagen').select();
		countries = data;
		console.log(data);
	}
	load();
</script>

<ul>
	{#each countries as country}
		<li>{country.is_Correct}</li>
	{/each}
</ul>
