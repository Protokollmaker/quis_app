<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import { canCreateAccount } from '$lib/func/Permistion/admin/createAccountAuth';
</script>

<section class="p-2">
	{#if canCreateAccount()}
		<h1>Register</h1>
		<form action="?/register" method="POST" class="auth-form">
			<Label for="email">Email</Label>
			<Input type="text" name="email" />
			<Label for="password">Password</Label>
			<Input type="password" name="password" />
			<Button class="btn btn-primary">Register</Button>
		</form>
	{:else}
		Du has nicht die Berechtigung einen Account zu erstellen
	{/if}
</section>
