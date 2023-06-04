<script lang="ts">
	// @ts-nocheck
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { onMount } from 'svelte';
	let tests = {
		res0: undefined
	};
	onMount(async () => {
		let res0: any = await supabaseClient.rpc('permision_edit_own_group');
		if (res0.error) {
			console.log('permistion_new_question error:', res0.error);
		}
		tests.res0 = res0.data;
	});
</script>

<section>
	permistion_new_question: {tests.res0}; <br />
</section>

<style></style>
