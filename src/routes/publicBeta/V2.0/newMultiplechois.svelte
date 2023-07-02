<script lang="ts">
	import ImageSupabase from '$components/image/imageSupabase.svelte';
	import FileInput from '$components/ui/input/FileInput.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import Textarea from '$components/ui/textarea/Textarea.svelte';

	export const NumberOfChoices = 5;
	type Multiplechoiselemnt = {
		alt: undefined | string; // alternative text for image
		filepath: undefined | string; // userid/imagename
		text: undefined | string;
	};
	let MultiplechoiceAnwerserElement: Array<Multiplechoiselemnt> = Array.from(
		Array(NumberOfChoices),
		() => {
			return { alt: undefined, filepath: undefined, text: undefined };
		}
	);
	let MultiplechoiceAnwerser: Array<any> = Array(NumberOfChoices);
	let MultiplechoiceImages: Array<any> = Array.from(Array(NumberOfChoices), () => {
		return { alt: undefined, Img: undefined };
	});
	let MultiplechoiceImagesURL: Array<string | undefined> = Array(5).fill(undefined);
	let MultiplechoiceValidation: number = -1;
	////
	let questionImage: Array<File>;
	let question: any = { path: undefined, text: undefined, alt: undefined };
</script>

<section>
	<h2>Frage</h2>
	<Textarea placeholder="Schreibe hier diene Frage herein" bind:value={question.text} />
	<div class="flex mt-2 mb-5 gap-2">
		<Input type="text" placeholder="alternertiver text" bind:value={question.alt} />
		<FileInput
			accept="image/png, image/jpeg"
			bind:files={questionImage[0]}
			id="avatar"
			name="avatar"
			type="file"
		/>
	</div>
	<div class="imageSize">
		<ImageSupabase image_src={question.path} bucket={'Question images'} alt={''} />
	</div>
	<h2>Antworten</h2>
	{#each MultiplechoiceAnwerser as Anwser, i}
		<Label>Antwort {i + 1}</Label>
		<Textarea
			placeholder="Schreibe hier die {i + 1} Antwort herien"
			bind:value={MultiplechoiceAnwerserElement[i].text}
		/>
		<div class="flex mt-2 mb-2 gap-2">
			<Input
				type="text"
				placeholder="alternertiver text"
				bind:value={MultiplechoiceAnwerserElement[i].alt}
			/>
			<FileInput type="file" id="Mulitplechois{i}" bind:files={MultiplechoiceImages[i].Img} />
		</div>
		<div class="imageSize">
			<ImageSupabase image_src={MultiplechoiceImagesURL[i]} bucket={'Question images'} alt={''} />
		</div>
	{/each}
	<Label class="mr-4">Richtige antwort</Label>
	<select name="valedation" bind:value={MultiplechoiceValidation}>
		{#each MultiplechoiceAnwerser as Anwser, i}
			<option value={i}>{i + 1}</option>
		{/each}
	</select>
</section>

<style></style>
