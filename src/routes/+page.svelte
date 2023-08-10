<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$components/ui/button/Button.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import type { PageData } from './$types';

	export let data: PageData;

	const submitLogout = async ({ cancel }: any) => {
		const { error } = await supabaseClient.auth.signOut();
		if (error) {
			console.log(error);
		}
		cancel();
	};
</script>

<main class="p-2">
	<h1>Wellkommen zu Elektrikerfragen</h1>
	{#if data.session}
		<p>Angemeldet als, {data.session.user.email}</p>
		<div class="flex gap-2">
			<form action="/logout" method="POST" use:enhance={submitLogout}>
				<Button type="submit" class="btn btn-primary" variant="boarder">Logout</Button>
			</form>
			<Button
				on:click={() => {
					goto('/user');
				}}
				class="">Gehe zum Persönliche daten</Button
			>
		</div>
	{:else}
		<p>Du must dich neu einlogen</p>
		<div class="auth-buttons">
			<Button
				on:click={() => {
					goto('/login');
				}}
				class="">Login</Button
			>
		</div>
	{/if}
</main>
