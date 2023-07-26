<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$components/ui/button/Button.svelte';
	import Input from '$components/ui/input/Input.svelte';
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

<section>
	Hier kommst du zum erst login in hin und gibst deinen namen ein
	<Input>Name:<input type="text" bind:value={name} /></Input>
	<Button on:click={send}>erstellen</Button>
	{error}
</section>

<style></style>
