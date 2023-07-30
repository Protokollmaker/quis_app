<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import { setCanCreateAccount } from '$lib/func/Permistion/admin/createAccountAuth';
	let CanCreateAccount_secret: string = '';
</script>

<section class="p-2">
	<h1>Auth</h1>
	<Label for="CanCreateAccount">Sete das Geheimes das du ein Account erstellen kannst:</Label>
	<div class="flex gap-2">
		<Input bind:value={CanCreateAccount_secret} name="CanCreateAccount" placeholder="Geheimnis" />
		<Button
			on:click={() => {
				setCanCreateAccount(CanCreateAccount_secret);
			}}>Absenden</Button
		>
	</div>
</section>

<style></style>
