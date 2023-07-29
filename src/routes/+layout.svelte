<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { getDeviceID, setDeviceTime } from '$lib/func/Permistion/Device/device';
	import { onMount } from 'svelte';

	import '../app.postcss';

	async function log() {
		const time = new Date();
		const deviceID = getDeviceID();
		if (deviceID.lastsend + 1000 * 60 * 20 >= time.getTime()) return;
		const response = await fetch('/api/log', {
			method: 'POST',
			body: JSON.stringify({ deviceID: deviceID.device }),
			headers: {
				'content-type': 'application/json'
			}
		});
		const res = await response.json();
		if (!res.error) setDeviceTime();
	}

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			console.log('Auth state change detected');
			log();
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});
	/*onMount(() => {
		document.documentElement.classList.add('dark');
	});*/
</script>

<slot />

<style>
</style>
