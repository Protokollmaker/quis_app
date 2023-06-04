<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { onMount } from 'svelte';
	import '../app.postcss';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			console.log('Auth state change detected');
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<slot />

<style>
</style>
