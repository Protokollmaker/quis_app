<script lang="ts">
	import { supabaseClient } from '$lib/func/Clients/supabase';
	export let image_src: string;
	export let bucket: string;
	export let alt: string = '';
	let imageBase64: any;

	async function load(t_image_src: string) {
		const { data, error } = await supabaseClient.storage.from(bucket).download(t_image_src);
		if (error) {
			console.log(error);
			return;
		}
		const reader = new FileReader();
		reader.onloadend = () => {
			imageBase64 = reader.result;
		};
		if (data == undefined) return;
		reader.readAsDataURL(data);
	}

	$: load(image_src);
</script>

<section>
	{#if imageBase64}
		<img src={imageBase64} {alt} />
	{/if}
</section>

<style>
	* {
		width: 100%;
		height: 100%;
	}
</style>
