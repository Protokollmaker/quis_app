<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import FileInput from '$components/ui/input/FileInput.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Textarea from '$components/ui/textarea/Textarea.svelte';
	import { Plus, X } from 'lucide-svelte';
	import { uploadImage } from '.';
	type questionType = {
		text: string;
		alt?: string;
		filepath?: string | undefined | null;
	};
	let questionImg: Array<File> = [];
	export let question: questionType = { text: '' };
	export let userid: string | null;
	$: uploadImageQuestion(questionImg);
	function uploadImageQuestion(File: Array<File>) {
		if (!File?.length) question.filepath = undefined;
		uploadImage(File[0], userid).then((value) => {
			question.filepath = value?.path;
		});
	}

	export function serialize() {}
	export function deserialize(sendjson: any) {}
	export function clear() {}

	let gaps: Array<any> = [];
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
	<Textarea placeholder="Schreibe hier den Titel des Antowtextes herein" />
	<div class="flex mt-2 mb-5 gap-2">
		<Input type="text" placeholder="alternertiver text" />
		<!--<FileInput
			accept="image/png, image/jpeg"
			bind:files={questionImg}
			id="avatar"
			name="avatar"
			type="file"
		/>-->
		<Button variant="secondary" on:click={() => {}}><X /></Button>
	</div>
	<div class="flex gap-2 items-center justify-between py-2">
		<h1>Lücken</h1>
		<Button
			variant="secondary"
			on:click={() => {
				gaps = [...gaps, {}];
			}}><Plus /></Button
		>
	</div>
	{#each gaps as gap, i}
		<div class="flex gap-2 items-center justify-between py-2">
			<h4>{i + 1} Lücke</h4>
			<Button
				variant="boarder"
				on:click={() => {
					gaps.splice(i, 1);
					gaps = [...gaps];
				}}><X /></Button
			>
		</div>
		<Input placeholder="name der Lücke" />
		<Input placeholder="platzhalter für Die lücke" />
		<div class="flex mt-2 mb-5 gap-2">
			<Input type="text" placeholder="alternertiver text" />
			<!--<FileInput
                accept="image/png, image/jpeg"
                bind:files={questionImg}
                id="avatar"
                name="avatar"
                type="file"
            />-->
			<Button variant="secondary" on:click={() => {}}><X /></Button>
		</div>
	{/each}
</section>

<style></style>
