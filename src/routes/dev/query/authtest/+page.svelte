<script lang="ts">
	import { supabaseClient } from '$lib/func/Clients/supabase';
	let countries: any = [];
	async function load() {
		const { data } = await supabaseClient.from('countries').select();
		countries = data;
		console.log(data);
	}
	load();
</script>

<ul>
	{#each countries as country}
		<li>{country.name}</li>
	{/each}
</ul>
