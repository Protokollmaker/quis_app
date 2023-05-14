<script lang="ts">
	import SupabaseImage from '$lib/components/image/imageSupabase.svelte';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	let type_Array = Array(6);
	let files: any;
	let path: string = '';
	let questionType: string = 'Multiple choice';
	let Title: string = '';
	let tags: string = '';
	let questionPart: string = '';
	let questionPart1: string = '';
	let validation: any = -1;
	let year: number = 0;

	export let data: any;
	let userid = undefined;

	for (let [i, value] of type_Array.entries()) {
		type_Array[i] = {};
	}
	onMount(() => {
		userid = data.session?.user.id;
		path = userid + '/';
	});

	async function uploudimage(index: number) {
		for (const file of files) {
			type_Array[index].filepath = '';
			try {
				const res = await supabaseClient.storage
					.from('Question images')
					.upload(path + file.name, file, {
						cacheControl: '3600',
						upsert: false
					});
				if (res.error) console.log(res.error);
			} finally {
				type_Array[index].filepath = path + file.name;
			}
		}
	}

	async function sentdata() {
		let sent_object: any = {};
		sent_object.Type = questionType;
		sent_object.Title = Title;
		sent_object.version = 0;
		sent_object.tags = {
			tags: tags.split(' '),
			path: [year, questionPart, questionPart1]
		};
		sent_object.question = type_Array[type_Array.length - 1];
		sent_object.answers = {
			answers: type_Array.slice(0, type_Array.length - 1)
		};
		sent_object.validation = {
			validation: validation
		};
		sent_object.owner = data.session?.user.id;
		const res = await supabaseClient.from('Questions').insert(sent_object);
		if (res.error) console.log(res.error);
		if (!res.error) {
			for (let [i, value] of type_Array.entries()) {
				type_Array[i] = {};
			}
			questionType = 'Multiple choice';
			Title = '';
			tags = '';
			validation = -1;
		}
	}
</script>

<section>
	<h1>Erstelle Neue Frage</h1>
	<h2>Frage</h2>
	<div>
		Fragentype
		<select name="questionType" id="questionType" bind:value={questionType}>
			<option value="Multiple choice">Multiple choice</option>
		</select>
	</div>
	<div>
		Title
		<input type="text" bind:value={Title} />
	</div>
	<div>
		Tags
		<input type="text" bind:value={tags} />
	</div>
	<div>
		Fragen Jahr und Teil
		<input type="number" bind:value={year} />
		<select name="questionPart" id="questionPart" bind:value={questionPart}>
			<option value="TeilA">Teil A</option>
			<option value="TeilB">Teil B</option>
		</select>
		<select name="questionPart1" id="questionPart1" bind:value={questionPart1}>
			<option value="Teil1">Teil 1</option>
			<option value="Teil2">Teil 2</option>
		</select>
	</div>
	<h3>Fragen Text</h3>
	<div>
		Text <input type="text" class="Text" bind:value={type_Array[type_Array.length - 1].text} /><br
		/>
		Bild
		<input
			type="text"
			placeholder="alternativer text für Bild"
			bind:value={type_Array[type_Array.length - 1].alt}
		/>
		<input
			type="file"
			bind:files
			on:change={() => uploudimage(type_Array.length - 1)}
			accept="image/png, image/jpeg"
		/>
		{#if type_Array[type_Array.length - 1].filepath}
			<div class="supabaseImage">
				<SupabaseImage
					image_src={type_Array[type_Array.length - 1].filepath}
					bucket={'Question images'}
					alt={''}
				/>
			</div>
		{/if}
	</div>
	<h3>Antworten</h3>
	<div>
		{#each type_Array.slice(0, type_Array.length - 1) as awnser, i}
			<div>
				<h5>Antwort {i + 1}</h5>
				Text
				<input type="text" class="Text" bind:value={type_Array[i].text} /><br />
				Bild
				<input
					type="text"
					placeholder="alternativer text für Bild"
					bind:value={type_Array[i].alt}
				/>
				<input type="file" bind:files on:change={() => uploudimage(i)} />
				{#if type_Array[i].filepath}
					<div class="supabaseImage">
						<SupabaseImage image_src={type_Array[i].filepath} bucket={'Question images'} alt={''} />
					</div>
				{/if}
			</div>
		{/each}
	</div>
	<br />
	<span>Richtige Antwort</span>
	<select name="valedation" id="questionPart" bind:value={validation}>
		{#each type_Array.slice(0, type_Array.length - 1) as awnser, i}
			<option value={i}>{i + 1}</option>
		{/each}
	</select>
	<br />
	<button on:click={sentdata}>Submit</button>
</section>

<style>
	* {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	.supabaseImage {
		width: 40vh;
	}
	.Text {
		width: 80%;
		height: 20px;
	}
</style>
