<script lang="ts">
	import { supabaseClient } from '$lib/func/Clients/supabase';
	export let image_src: string | undefined | null;
	export let bucket: string;
	export let alt: string = '';
	let imageBase64: any;

	let last_image_src: string | undefined;

	async function load(t_image_src: string | undefined | null) {
		if (!t_image_src) return;
		if (t_image_src == last_image_src) return;
		last_image_src = t_image_src;
		console.log('new load: ' + image_src);
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

<section class="flex justify-center items-center">
	{#if imageBase64}
		<img src={imageBase64} {alt} {...$$restProps} />
	{/if}
</section>

<style>
</style>
