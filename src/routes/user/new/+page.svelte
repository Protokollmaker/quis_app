<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$components/ui/button/Button.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	export let data;
	let error = '';
	let name = '';
	async function send() {
		let res = await supabaseClient.from('User').insert({
			user_id: data.session?.user.id,
			Name: name
		});
		console.log(res.error);
		if (res.error) error = res.error.message;
		if (res.error?.code == '23505') error = 'Du wurdest schon regestirert';
		goto('/user');
	}
</script>

<section class="p-2">
	<Label for="name">Gib ein Wie du genant werden willst</Label><br />
	<div class="flex gap-2">
		<Input type="text" bind:value={name} placeholder="Name" id="name" />
		<Button on:click={send}>erstellen</Button>
	</div>
	{error}
</section>

<style></style>
