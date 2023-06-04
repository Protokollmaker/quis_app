<script lang="ts">
	import { supabaseClient } from '$lib/func/Clients/supabase';

	let email: string;
	let password: string;
	let state: string = '';
	async function updateUser() {
		try {
			const { data, error } = await supabaseClient.auth.updateUser({
				email: email,
				password: password
			});
			if (data) {
				console.log(data);
				state = 'Passwort wurde Erfolgreich geändert';
			}
		} catch (error) {
			state = 'Es gab einen Fehler Überprüfe deine Email';
		} finally {
		}
	}
</script>

<section>
	<h1>Passwort Ändern</h1>
	email:<input type="text" bind:value={email} />
	passwort: <input type="text" bind:value={password} />
	<button on:click={updateUser}>Ändern</button>
	{state}
</section>

<style></style>
