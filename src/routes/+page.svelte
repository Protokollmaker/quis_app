<script lang="ts">
	import { enhance } from '$app/forms';
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

<main>
	<h1>SvelteKit & Supabase Auth</h1>
	{#if data.session}
		<p>Welcome, {data.session.user.email}</p>
		<form action="/logout" method="POST" use:enhance={submitLogout}>
			<button type="submit" class="btn btn-primary">Logout</button>
			<a href="/user">Gehe zum Persönliche daten</a>
		</form>
	{:else}
		<p>Let's learn how to register and login users!</p>
		<div class="auth-buttons">
			<a href="/login" class="btn btn-primary">Login</a>
			<!--<a href="/register" class="btn btn-secondary">Register</a>-->
		</div>
	{/if}
</main>
