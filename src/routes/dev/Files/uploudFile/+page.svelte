<script lang="ts">
	import { supabaseClient } from '$lib/func/Clients/supabase';

	let files: any;

	$: if (files) {
		// Note that `files` is of type `FileList`, not an Array:
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		console.log(files);

		for (const file of files) {
			console.log(`${file.name}: ${file.size} bytes`);
		}
	}
	async function uploadFile() {
		for (const file of files) {
			const res = await supabaseClient.storage
				.from('Question images')
				.upload('public/' + file.name, file, {
					cacheControl: '3600',
					upsert: false
				});
			console.log(res.error);
		}
	}
</script>

<section>
	<label for="avatar">Upload a picture:</label>
	<input accept="image/png, image/jpeg" bind:files id="pictur uplaud" name="avatar" type="file" />
	<button on:click={uploadFile}>Uplaoud Test</button>
</section>

<style>
</style>
