<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	//import type { PageData } from './$types';
	//export let data: PageData;
	export let data;
	let countries: any = [];
	async function load() {
		const { data } = await supabaseClient.from('countries').select();
		countries = data;
		console.log(data);
	}

	onMount(async () => {
		// todo Backend auth so the sidie don't get loaded on login
		if (!data.session) {
			goto('/');
		}
		load();
		console.log(supabaseClient.auth);
	});
</script>

<section>
	<p>Welcome, {supabaseClient.auth}</p>
	<h1>Query test 1</h1>
</section>

<style></style>
