<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { onMount } from 'svelte';
	//import type { PageData } from './$types';
	export let data: any;
	let userid: any = undefined;
	let user: any = undefined;
	let userfecht: boolean = false;
	// page vars
	let name = '';
	let password = '';
	let currentPassword = '';
	onMount(async () => {
		// todo Backend auth so the sidie don't get loaded on login
		if (!data.session) {
			goto('/');
		}
		userid = data.session?.user.id;
		user = await supabaseClient.from('User').select().eq('user_id', userid).limit(1).single();
		user = user.data;
		userfecht = true;
	});
	async function UpdateView() {
		user = await supabaseClient.from('User').select().eq('user_id', userid).limit(1).single();
		user = user.data;
	}
	async function changename() {
		const { error } = await supabaseClient
			.from('User')
			.update({ Name: name })
			.eq('user_id', userid);
		if (error) console.log(error);
		UpdateView();
	}

	async function changepassword() {
		/*try {
			// Change the user's password
			const { error } = await supabaseClient.({
				password: password
			});

			if (error) {
				console.error('Error changing password:', error);
				return;
			}

			console.log('Password changed successfully');
		} catch (error) {
			console.error('Error changing password:', error);
		}*/
	}
</script>

<section>
	{#if userfecht}
		<h1>Welcome, {user.Name}</h1>
		<div class="name">
			Ändere Name
			<input type="text" placeholder={user.Name} bind:value={name} />
			<button on:click={changename}> Speichern</button>
		</div>
		<h2>Pasword</h2>
		<!--<div class="name"> // TODO Change Password and Email
            Ändere Pasword
            <input type="text" bind:value={password} placeholder="Neues Paswort"/>
            <input type="text" bind:value={currentPassword} placeholder="
            Altes Passwort"/>
            <button on:click={changepassword}> Speichern</button>
        </div>-->
	{/if}
	<a href="./">Zurück</a>
</section>

<style>
</style>
