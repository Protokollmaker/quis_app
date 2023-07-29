<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$components/ui/button/Button.svelte';
	import FileInput from '$components/ui/input/FileInput.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { downloadObjectAsJson } from '$lib/utils/json';
	import { getallStorageKeys } from '$lib/utils/localstorage';
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
	function mapSome(key: string) {
		if (key == 'questionData') return 'Fragen Prozente';
		if (key == 'questionBookmark') return 'Gespeicherte Fragen';
		return key;
	}
	let files: Array<Array<File>> = [];
</script>

<section class="p-2">
	{#if userfecht}
		<h1>Hallo, {user.Name}</h1>
		<h2>Namen Ändern</h2>
		<div class="p-2">
			<div class="flex gap-2">
				<Input type="text" placeholder={user.Name} bind:value={name} />
				<Button on:click={changename}>Speichern</Button>
			</div>
		</div>
		<h2>Deine Daten</h2>
		<div class="red">
			<Label
				>Wichtig Stelle sicher das du den Richting File Auswälst sonst können Komiche sachen
				passieren</Label
			>
		</div>
		<div class="p-2">
			{#each getallStorageKeys() as key, i}
				{#if key != 'DeviceID'}
					<div class="flex justify-between items-center py-1">
						<Label class="w-fit">{mapSome(key)}</Label>

						<div class="flex gap-2">
							<FileInput
								accept="application/JSON"
								bind:files={files[i]}
								id="avatar"
								name="avatar"
								type="file"
								on:change={() => {
									if (!files[i]) {
										console.log('no file given');
										return;
									}
									if (!files[i].length) {
										console.log('??? gelöcht');
										return;
									}
									const file = files[i][0];
									const reader = new FileReader();
									let filedata = undefined;
									reader.onload = () => {
										try {
											// @ts-ignore
											filedata = JSON.parse(reader.result);
											localStorage.setItem(key, filedata);
										} catch (error) {
											console.error('Error parsing JSON file:', error);
										}
										return;
									};

									reader.readAsText(file);
								}}
							/>
							<Button
								on:click={() => {
									downloadObjectAsJson(localStorage.getItem(key) || '[]', mapSome(key));
								}}>Exportiern</Button
							>
						</div>
					</div>
				{/if}
			{/each}
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
	.red {
		color: #d36163;
	}
</style>
