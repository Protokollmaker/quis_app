<script lang="ts">
	import ImageSupabase from '$components/image/imageSupabase.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import FileInput from '$components/ui/input/FileInput.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Textarea from '$components/ui/textarea/Textarea.svelte';
	import { X } from 'lucide-svelte';
	import { uploadImage } from '.';

	type questionType = {
		text: string;
		alt?: string;
		filepath?: string | undefined | null;
	};
	type Multiplechoiselemnt = {
		text?: undefined | string;
		alt?: undefined | string; // alternative text for image
		filepath?: undefined | null | string; // userid/imagename
	};
	export let question: questionType = { text: '' };
	export let userid: string | null;
	export const NumberOfChoices = 5;
	let answers: Array<Multiplechoiselemnt> = Array.from(Array(NumberOfChoices), () => {
		return { text: undefined };
	});
	let questionImg: Array<File> = [];
	let anwerserImage: Array<Array<File>> = [];
	let validation: number = -1;

	$: uploadImageQuestion(questionImg);
	function uploadImageQuestion(File: Array<File>) {
		if (!File?.length) question.filepath = undefined;
		uploadImage(File[0], userid).then((value) => {
			question.filepath = value?.path;
		});
	}
	function uploadImageArray(t_img: Array<Array<File>>) {
		t_img.forEach(function (value, i) {
			if (!value?.length) answers[i].filepath = undefined;
			uploadImage(value[0], userid).then((value) => {
				answers[i].filepath = value?.path;
			});
		});
	}
	$: uploadImageArray(anwerserImage);

	export function serialize() {
		let sendjson: any = {};
		sendjson.question = question;
		sendjson.answers = {
			answers: answers
		};
		sendjson.validation = {
			validation: validation
		};
		return sendjson;
	}

	export function deserialise(sendjson: any) {
		question = sendjson.question;
		answers = sendjson.answers.answers;
		validation = sendjson.validation.validation;
	}

	export function clear() {
		question = { text: '', filepath: undefined };
		answers = Array.from(Array(NumberOfChoices), () => {
			return { text: undefined };
		});
		questionImg = [];
		anwerserImage = [];
		validation = -1;
	}
</script>

<section>
	<h2 class="mb-2">Frage</h2>
	<Textarea placeholder="Schreibe hier diene Frage herein" bind:value={question.text} />
	<div class="flex mt-2 mb-5 gap-2">
		<Input type="text" placeholder="alternertiver text" bind:value={question.alt} />
		<FileInput
			accept="image/png, image/jpeg"
			bind:files={questionImg}
			id="avatar"
			name="avatar"
			type="file"
		/>
		<Button
			variant="secondary"
			on:click={() => {
				questionImg = [];
			}}><X /></Button
		>
	</div>
	{#if question.filepath}
		<ImageSupabase
			image_src={question.filepath}
			bucket={'Question images'}
			alt={''}
			style="max-height: 13rem;"
		/>
	{/if}
	<h2 class="mb-2">Antwort</h2>
	{#each answers as answer, i}
		<h4>Antwort {i + 1}</h4>
		<Textarea placeholder="Schreibe hier diene Frage herein" bind:value={answer.text} />
		<div class="flex mt-2 mb-5 gap-2">
			<Input type="text" placeholder="alternertiver text" bind:value={answer.alt} />
			<FileInput
				accept="image/png, image/jpeg"
				bind:files={anwerserImage[i]}
				id="avatar"
				name="avatar"
				type="file"
			/>
			<Button
				variant="secondary"
				on:click={() => {
					anwerserImage[i] = [];
					anwerserImage = [...anwerserImage];
				}}><X /></Button
			>
		</div>
		{#if answer.filepath}
			<ImageSupabase
				image_src={answer.filepath}
				bucket={'Question images'}
				alt={''}
				style="max-height: 13rem;"
			/>
		{/if}
	{/each}
	<select name="valedation" class="py-2 px-10" bind:value={validation}>
		{#each answers as _, i}
			<option value={i}>{i + 1}</option>
		{/each}
	</select>
</section>

<style>
</style>
