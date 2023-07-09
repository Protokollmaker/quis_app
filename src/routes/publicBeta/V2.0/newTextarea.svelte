<script lang="ts">
	import ImageSupabase from '$components/image/imageSupabase.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import Checkbox from '$components/ui/checkbox/Checkbox.svelte';
	import FileInput from '$components/ui/input/FileInput.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import Textarea from '$components/ui/textarea/Textarea.svelte';
	import { Minus, Plus } from 'lucide-svelte';
	import { uploadImage } from '.';

	type questionType = {
		text: string;
		alt?: string;
		filepath?: string | undefined | null;
	};
	let questionImg: Array<File> = [];
	export let question: questionType = { text: '' };
	export let userid: string | null;
	type AnwersersType = Array<questionType>;
	let Anwersers: AnwersersType = [];
	let ImageList: Array<{ anwerserImage: Array<File>; validationImage: Array<File> }> = [];
	type ValidationsType = Array<
		{
			validatepattons: Array<{ percent: number; pattons: Array<string> }>;
			type: string;
			userOverried: boolean;
		} & questionType
	>;
	let Validations: ValidationsType = [];
	$: Validations = percent(Validations);
	function percent(Validations: ValidationsType) {
		for (let i = 0; i < Validations.length; i++) {
			for (let j = 0; j < Validations[i].validatepattons.length; j++) {
				Validations[i].validatepattons[j].percent =
					(1 / Validations[i].validatepattons.length) * 100;
			}
		}
		return [...Validations];
	}
	$: uploadImageTextareaQuestijon(questionImg);
	function uploadImageTextareaQuestijon(File: Array<File>) {
		if (File.length)
			uploadImage(File[0], userid).then((value) => {
				question.filepath = value?.path;
			});
	}
	function uploadImageArray(t_img: typeof ImageList) {
		t_img.forEach(function (value, i) {
			if (value.anwerserImage.length)
				uploadImage(value.anwerserImage[0], userid).then((value) => {
					Anwersers[i].filepath = value?.path;
				});
			if (value.validationImage.length)
				uploadImage(value.validationImage[0], userid).then((value) => {
					Validations[i].filepath = value?.path;
				});
		});
	}
	$: uploadImageArray(ImageList);

	export function serialize() {
		let sendjson: any = {};
		sendjson.question = question;
		sendjson.answers = Anwersers;
		sendjson.validation = Validations;
		return sendjson;
	}

	export function deserialise(sendjson: {
		question: questionType;
		answers: AnwersersType;
		validation: ValidationsType;
	}) {
		question = sendjson.question;
		Anwersers = sendjson.answers;
		Validations = sendjson.validation;
	}

	export function clear() {
		question = { text: '' };
		Anwersers = [];
		Validations = [];
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
	</div>
	<div class="imageSize">
		<ImageSupabase image_src={question.filepath} bucket={'Question images'} alt={''} />
	</div>
	<div class="flex justify-between items-center">
		<h2 class="mb-2">Antwort</h2>
		<Button
			variant="secondary"
			on:click={() => {
				Anwersers = [...Anwersers, { text: '' }];
				ImageList = [...ImageList, { anwerserImage: [], validationImage: [] }];
				Validations = [
					...Validations,
					{ validatepattons: [], type: 'wordlist', userOverried: true, text: '' }
				];
			}}><Plus /></Button
		>
	</div>
	{#each Anwersers as Anwerser, i}
		<div class="py-5">
			<div class="flex justify-between items-center">
				<h3>{i + 1}: Textfelt</h3>
				<Button
					variant="secondary"
					on:click={() => {
						Anwersers.splice(i, 1);
						Anwersers = [...Anwersers];
						Validations.splice(i, 1);
						Validations = [...Validations];
					}}><Minus /></Button
				>
			</div>
			<div class="flex justify-start items-center gap-2 py-1">
				<Checkbox bind:checked={Validations[i].userOverried} />
				<Label>Erlaube Nutzer die Prozente zu veränderen</Label>
			</div>
			<Textarea placeholder="Schreibe hier diene Frage herein" bind:value={Anwerser.text} />
			<div class="flex mt-2 mb-5 gap-2">
				<Input type="text" placeholder="alternertiver text" bind:value={Anwerser.alt} />
				<FileInput
					accept="image/png, image/jpeg"
					bind:files={ImageList[i].anwerserImage}
					id="avatar"
					name="avatar"
					type="file"
				/>
			</div>
			<div class="imageSize">
				<ImageSupabase image_src={Anwerser.filepath} bucket={'Question images'} alt={''} />
			</div>
			<h3>Lösung Anzeigen</h3>
			<Textarea placeholder="Schreibe hier diene Frage herein" bind:value={Validations[i].text} />
			<div class="flex mt-2 mb-5 gap-2">
				<Input type="text" placeholder="alternertiver text" bind:value={Validations[i].alt} />
				<FileInput
					accept="image/png, image/jpeg"
					bind:files={ImageList[i].validationImage}
					id="avatar"
					name="avatar"
					type="file"
				/>
			</div>
			<div class="imageSize">
				<ImageSupabase image_src={Validations[i].filepath} bucket={'Question images'} alt={''} />
			</div>
			<div class="flex justify-between items-center py-2">
				<h3>Lösung Validation</h3>
				<div class="flex justify-between items-center gap-2">
					<select bind:value={Validations[i].type}>
						<option value="wordlist">Wort Liste</option>
						<option value="redex">redex</option>
					</select>
					<Button
						variant="secondary"
						on:click={() => {
							Validations[i].validatepattons = [
								...Validations[i].validatepattons,
								{ percent: 0, pattons: [''] }
							];
						}}><Plus /></Button
					>
				</div>
			</div>
			<div>
				{#each Validations[i].validatepattons as Validation, j}
					{#each Validation.pattons as ValidationOr, k}
						<div class="flex justify-between items-center gap-2 py-2">
							{!k ? Validation.percent.toFixed(1) + '%' : 'oder'}
							<Input bind:value={ValidationOr} />
							{#if !k}
								<Button
									variant={!k ? 'secondary' : 'ghost'}
									on:click={() => {
										Validation.pattons = [...Validation.pattons, ''];
									}}><Plus /></Button
								>
							{/if}
							<Button
								variant={!k ? 'secondary' : 'ghost'}
								on:click={() => {
									if (!k) {
										Validations[i].validatepattons.splice(j, 1);
										Validations[i].validatepattons = [...Validations[i].validatepattons];
									} else {
										Validation.pattons.splice(k, 1);
										Validation.pattons = [...Validation.pattons];
									}
								}}><Minus /></Button
							>
						</div>
					{/each}
				{/each}
			</div>
		</div>
	{/each}
</section>

<style>
	.imageSize {
		width: 100px;
	}
</style>
