<script lang="ts">
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	let image: any;
	let showImage: boolean = false;
	let imageBase64: any;
	async function load() {
		const { data, error } = await supabaseClient.storage
			.from('Question images')
			.download('2005/Teil1/001Question.png');
		if (error) {
			console.log(error);
		}
		const reader = new FileReader();
		reader.onloadend = () => {
			imageBase64 = reader.result;
		};
		if (data == undefined) return;
		reader.readAsDataURL(data);
	}
	onMount(() => {
		load();
		showImage = true;
	});
</script>

<section>
	<div>
		{#if imageBase64}
			<img src={imageBase64} alt="Youröägff#. Image" />
		{/if}
	</div>
</section>

<style></style>
