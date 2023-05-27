<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	//import type { PageData } from './$types';
	export let data: any;
	let userid = undefined;
	let user: any = undefined;
	let userfecht = false;
	onMount(async () => {
		// todo Backend auth so the sidie don't get loaded on login
		if (!data.session) {
			goto('/');
		}
		userid = data.session?.user.id;
		user = await supabaseClient.from('User').select().eq('user_id', userid).limit(1).single();
		if (user.error) {
			goto('/user/new');
		}
		console.log(user);
		user = user.data;

		userfecht = true;
	});
</script>

<section>
	{#if userfecht}
		<h1>Welcome, {user?.Name}</h1>
	{/if}
	<a href="/user/settings">Einstellungen</a><br />
	<a href="/question">Fragen</a><br />
	<a href="/question/new">neue Fragen</a><br />
	<a href="/question/random">Zufällige Frage</a><br />
	<a href="/group">Gruppe</a><br />
	<a href="/group/new">neue Gruppe</a><br />
</section>

<style>
</style>
