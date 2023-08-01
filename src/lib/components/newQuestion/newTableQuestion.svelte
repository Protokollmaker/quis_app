<script lang="ts">
	import ImageSupabase from '$components/image/imageSupabase.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import Checkbox from '$components/ui/checkbox/Checkbox.svelte';
	import FileInput from '$components/ui/input/FileInput.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import RadioInput from '$components/ui/input/RadioInput.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$components/ui/table';
	import Textarea from '$components/ui/textarea/Textarea.svelte';
	import { Plus, X } from 'lucide-svelte';
	import { uploadImage } from '.';

	export let userid: string | null;
	type TabelRowType = {
		text: string;
		filepath: string | undefined;
		alt: string | undefined;
	};
	type TabelColumnsType = {
		text: string;
	};
	let TabelRows: Array<TabelRowType> = [];
	let TabelColumns: Array<TabelColumnsType> = [];
	let TableType = 'checkbox';
	let TabelValiation: any = {};
	let TabelesRowsImages: Array<any> = [];

	let question: { text: string; alt?: string; filepath?: string | undefined | null } = { text: '' };
	let questionImg: Array<File> = [];
	export function serialize() {
		let sendjson = {
			question: question,
			answers: {
				type: TableType,
				answers: {
					rows: TabelRows,
					columns: TabelColumns
				}
			},
			validation: {
				validation: TabelValiation
			}
		};
		return sendjson;
	}

	export function deserialise(sendjson: any) {
		question = sendjson.question;
		TableType = sendjson.answers.type;
		TabelRows = sendjson.answers.answers.rows;
		TabelColumns = sendjson.answers.answers.columns;
		TabelValiation = sendjson.validation.validation;
	}

	export function clear() {
		question = { text: '' };
		TableType = 'checkbox';
		TabelRows = [];
		TabelColumns = [];
		TabelValiation = {};
	}

	$: uploadImageQuestion(questionImg);
	function uploadImageQuestion(File: Array<File>) {
		if (!File?.length) question.filepath = undefined;
		uploadImage(File[0], userid).then((value) => {
			question.filepath = value?.path;
		});
	}

	$: uploadImageRow(TabelesRowsImages);
	function uploadImageRow(Files: Array<Array<File>>) {
		Files.forEach(function (value, i) {
			uploadImage(value[0], userid).then((filepath: any) => {
				console.log(filepath);
				TabelRows[i].filepath = filepath.path;
			});
		});
	}
</script>

<section>
	<h2>Frage</h2>
	<Textarea placeholder="Schreibe hier diene Frage herein" bind:value={question.text} />
	<!--To do make this to question-->
	<div class="flex mt-2 mb-2 gap-2">
		<Input type="text" placeholder="alternertiver text" bind:value={question.alt} />
		<FileInput id="picture" type="file" bind:files={questionImg} />
	</div>
	<div class="imageSize">
		<ImageSupabase image_src={question.filepath} bucket={'Question images'} alt={''} />
	</div>
	<select name="Table" bind:value={TableType}>
		<option value="radio">Eine Antwort pro Reihe UnFertig</option>
		<option value="checkbox">Meherer Antworten pro Reihe</option>
		<option value="text">Text eingabe UnFertig</option>
	</select><br />
	<Label>Reihe Hinzufügen</Label>
	<div class="m-2">
		{#each TabelRows as Row, i}
			<div class="flex gap-2 mb-1">
				<Input type="text" placeholder="Reihen Name {i + 1}" bind:value={Row.text} />
				<Input type="text" placeholder="alternertiver text" bind:value={Row.alt} />
				<FileInput id="picture" type="file" bind:files={TabelesRowsImages[i]} />
				<Button
					variant="secondary"
					on:click={() => {
						TabelRows.splice(i, 1);
						TabelRows = [...TabelRows];
					}}><X /></Button
				>
			</div>
		{/each}
	</div>
	<Button
		variant="secondary"
		class="m-2"
		on:click={() => {
			TabelRows = [
				...TabelRows,
				{
					text: '',
					filepath: undefined,
					alt: undefined
				}
			];
		}}><Plus /></Button
	>
	<br />
	<Label>Spalte Hinzufügen</Label>
	<div class="m-2">
		{#each TabelColumns as Column, i}
			<div class="flex gap-2 mb-1">
				<Input type="text" placeholder="Spalte Name {i + 1}" bind:value={Column.text} />
				<Button
					variant="secondary"
					on:click={() => {
						TabelColumns.splice(i, 1);
						TabelColumns = [...TabelColumns];
					}}><X /></Button
				>
			</div>
		{/each}
	</div>
	<Button
		variant="secondary"
		class="m-2"
		on:click={() => {
			TabelColumns = [...TabelColumns, { text: '' }];
		}}><Plus /></Button
	>
	<br />
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead class="w-[100px]" />
				{#each TabelColumns as Column}
					<TableHead class="text-right">{Column.text}</TableHead>
				{/each}
			</TableRow>
		</TableHeader>

		<TableBody>
			{#each TabelRows as Row, j}
				{#if TableType == 'radio'}
					<TableRow key={Row.text}>
						<TableCell class="">
							{Row.text}
							<ImageSupabase bind:image_src={Row.filepath} bucket={'Question images'} alt={''} />
						</TableCell>
						{#each TabelColumns as Column, i}
							<TableCell>
								<div class="flex justify-end">
									<div class="h-4 w-4">
										<RadioInput
											class="h-4 w-4"
											name="row-{Row.text}-{j}"
											value={i.toString()}
											bind:group1={TabelValiation['radio' + j]}
										/>
									</div>
								</div>
							</TableCell>
						{/each}
					</TableRow>
				{:else if TableType == 'text'}
					<TableRow key={Row.text}>
						<TableCell class=""
							>{Row.text}<ImageSupabase
								bind:image_src={Row.filepath}
								bucket={'Question images'}
								alt={''}
							/></TableCell
						>
						{#each TabelColumns as Column, i}
							<TableCell>
								<Input
									type="text"
									class="mb-2"
									placeholder="Geben sie hier einer regex zur valitation der eingabe ein"
									bind:value={TabelValiation['text' + j + '-' + i + '-redex']}
								/>
								<Input
									type="text"
									placeholder="Geben sie hier eine musterlösung ein"
									bind:value={TabelValiation['text' + j + '-' + i + '-plaintext']}
								/>
							</TableCell>
						{/each}
					</TableRow>
				{:else}
					<TableRow key={Row.text}>
						<TableCell class=""
							>{Row.text}
							<ImageSupabase
								bind:image_src={TabelRows[j].filepath}
								bucket={'Question images'}
								alt={''}
							/></TableCell
						>
						{#each TabelColumns as Column, i}
							<TableCell>
								<div class="flex justify-end">
									<Checkbox bind:checked={TabelValiation['checkbox' + j + '-' + i]} />
								</div>
							</TableCell>
						{/each}
					</TableRow>
				{/if}
			{/each}
		</TableBody>
	</Table>
</section>

<style></style>
