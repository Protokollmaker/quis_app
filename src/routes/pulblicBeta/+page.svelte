<script lang="ts">
	// TODO maybe questions for motortypenschild and KKS identifiers
	// TODO musterlösung für X-template
	// TODO maybe put alt somwher other than temp images
	import ImageSupabase from '$components/image/imageSupabase.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import Checkbox from '$components/ui/checkbox/Checkbox.svelte';
	import FileInput from '$components/ui/input/FileInput.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import { Table, TableHead, TableHeader, TableRow } from '$components/ui/table';
	import TableBody from '$components/ui/table/TableBody.svelte';
	import TableCell from '$components/ui/table/TableCell.svelte';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$components/ui/tabs';
	import Textarea from '$components/ui/textarea/Textarea.svelte';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { Plus, X } from 'lucide-svelte';
	import type { PageData } from '../dev/create/template/$types';
	// user data
	export let data: PageData;
	// Question general
	let question: any = { type: 'Multiple choice' };
	let exams: Array<type_uuid_exam> = [];
	let tags: Array<string> = [];
	let questionImage: any = { alt: undefined, Img: undefined };
	let questionPath: string | undefined = undefined;

	let uploadedImages: Array<String> = [];

	let sendjson: any = {};
	let error: string = '';
	// X Template
	let XTemplateText: string = '';
	let XTemplateNames: Array<string> = [];
	let XTemplateArray: any = [];
	type type_uuid_exam = {
		year: number | undefined;
		exam_part: 'Teil1' | 'Teil2' | undefined;
		part: 'TeilA' | 'TeilB' | undefined;
		question: number | undefined;
	};
	// Multiple choice
	let MultiplechoiceAnwerser: Array<any> = Array(5);
	let MultiplechoiceImages: Array<any> = Array.from(Array(5), () => {
		return { alt: undefined, Img: undefined };
	});
	let MultiplechoiceImagesURL: Array<string | undefined> = Array(5).fill(undefined);
	// Tabel
	let TabelRows: Array<string> = [];
	let TabelColumns: Array<string> = [];
	let TableType = 'checkbox';
	// Generly functions
	$: uploadarrayMultplechois(MultiplechoiceImages);

	async function uploadarrayMultplechois(array: Array<any>) {
		array.forEach(function (value, i) {
			uploadImages(value).then((filepath: any) => {
				MultiplechoiceImagesURL[i] = filepath;
			});
		});
	}

	$: uploadImages(questionImage).then((filepath: any) => (questionPath = filepath));
	async function uploadImages(obj: {
		alt: string | undefined;
		Img: any | undefined;
		filepath: string | undefined;
	}) {
		if (obj.Img == undefined) return null;
		if (!data.session?.user.id) return null;

		const path = data.session?.user.id + '/';
		for (const file of obj.Img) {
			// check if file was upladed
			const index = uploadedImages.findIndex((item) => item === `${file.name}: ${file.size}`);
			if (index == -1) {
				uploadedImages.push(`${file.name}: ${file.size}`);
				// uplade file hier
				const res = await supabaseClient.storage
					.from('Question images')
					.upload(path + file.name, file, {
						cacheControl: '3600',
						upsert: false
					});
				if (res.error) console.log(res.error);
			}

			return path + file.name;
		}
	}
	//
	$: XTemplateNames = xTemplateGetVars(XTemplateText);
	function xTemplateGetVars(text: string) {
		let regex = /(?:[{]{2}(.+?)[}]{2})/g;
		let redexremove = /{{|}}/g;
		let Names = text.match(regex);
		if (Names == null) return [];
		const outputArray = Names.map((element) => element.replace(redexremove, ''));
		const uniques = [...new Set(outputArray)];
		return uniques;
	}
	$: XTemplateArray = xTamplateInitoption(XTemplateArray, XTemplateNames);
	function xTamplateInitoption(obj: any, Names: Array<string>) {
		let temp_obj: any = {};
		for (let Name of Names) {
			if (obj[Name] == undefined) {
				obj[Name] = { wert: [] };
			}
			temp_obj[Name] = obj[Name];
		}
		return temp_obj;
	}
	// TODO if xTemplate has Pirture option auto check user can override input
	// send data
	function send() {
		error = '';
		if (!data.session?.user.id) {
			error = 'dein user id ist nich vorhanden schau ob du noch eingelogt bist';
			return 1;
		}
		sendjson = {
			tags: {
				tags: tags,
				exams: exams
			},
			Type: question.type,
			version: 1,
			Title: question.Title,
			owner: data.session?.user.id
		};
	}
</script>

<section>
	<h1>Erstelle Frage V2</h1>
	<Label>Titel:</Label>
	<div class="m-3">
		<Input
			type="text"
			placeholder="Schreibe hier den namen der Frage herein"
			bind:value={question.Title}
		/>
	</div>
	<Label>Tags:</Label>
	<div class="m-2">
		{#each tags as tag, i}
			<div class="flex gap-2 mb-1">
				<Input type="text" placeholder="Füge Tags hinzue" bind:value={tag} />
				<Button
					variant="secondary"
					on:click={() => {
						tags.splice(i, 1);
						tags = [...tags];
					}}><X /></Button
				>
			</div>
		{/each}
	</div>
	<Button
		variant="secondary"
		class="m-2"
		on:click={() => {
			tags = [...tags, ''];
		}}><Plus /></Button
	>
	<div>
		<Label>Gefunden in:</Label>
		<div class="m-2">
			{#each exams as exsam, i}
				<div class="flex mb-2 gap-2">
					<Input type="text" placeholder="Jahr der Prüfung" bind:value={exsam.year} />
					<Input type="text" placeholder="nummer der Frage" bind:value={exsam.question} />
					<select name="questionPart" id="questionPart" bind:value={exsam.part}>
						<option value="TeilA">Teil A</option>
						<option value="TeilB">Teil B</option>
					</select>
					<select name="questionPart1" id="questionPart1" bind:value={exsam.exam_part}>
						<option value="Teil1">Teil 1</option>
						<option value="Teil2">Teil 2</option>
					</select>
					<Button
						variant="secondary"
						on:click={() => {
							exams.splice(i, 1);
							exams = [...exams];
						}}><X /></Button
					>
				</div>
			{/each}
		</div>
		<Button
			variant="secondary"
			class="m-2"
			on:click={() => {
				exams = [
					...exams,
					{ year: undefined, exam_part: 'Teil1', part: 'TeilA', question: undefined }
				];
			}}><Plus /></Button
		>
	</div>
	<h1>Fragen Spezifisch</h1>
	<Tabs class="w-full p-4" bind:value={question.type}>
		<TabsList class="grid w-full grid-cols-3">
			<TabsTrigger value="Multiple choice">Mehrfachauswahl</TabsTrigger>
			<TabsTrigger value="TableQuestion">Tabellen frage</TabsTrigger>
			<TabsTrigger value="X-template">X-Vorlage</TabsTrigger>
		</TabsList>
		<TabsContent value="Multiple choice">
			<!--To do make this to question-->
			<h2>Frage</h2>
			<Textarea placeholder="Schreibe hier diene Frage herein" />
			<div class="flex mt-2 mb-5 gap-2">
				<Input type="text" placeholder="alternertiver text" bind:value={questionImage.alt} />
				<FileInput
					accept="image/png, image/jpeg"
					bind:files={questionImage.Img}
					id="avatar"
					name="avatar"
					type="file"
				/>
			</div>
			<div class="imageSize">
				<ImageSupabase image_src={questionPath} bucket={'Question images'} alt={''} />
			</div>
			<h2>Antworten</h2>
			{#each MultiplechoiceAnwerser as Anwser, i}
				<Label>Antwort {i + 1}</Label>
				<Textarea placeholder="Schreibe hier die {i + 1} Antwort herien" />
				<div class="flex mt-2 mb-2 gap-2">
					<Input
						type="text"
						placeholder="alternertiver text"
						bind:value={MultiplechoiceImages[i].alt}
					/>
					<FileInput type="file" id="Mulitplechois{i}" bind:files={MultiplechoiceImages[i].Img} />
				</div>
				<div class="imageSize">
					<ImageSupabase
						image_src={MultiplechoiceImagesURL[i]}
						bucket={'Question images'}
						alt={''}
					/>
				</div>
			{/each}
			<Label class="mr-4">Richtige antwort</Label>
			<select name="valedation" id="questionPart">
				{#each MultiplechoiceAnwerser as Anwser, i}
					<option value={i}>{i + 1}</option>
				{/each}
			</select>
		</TabsContent>
		<TabsContent value="TableQuestion">
			<Label>Frage</Label>
			<Textarea
				placeholder="Tipp un X-Vorlage zu nutzen nutze &#123;&#123; Text &#125;&#125;"
				bind:value={XTemplateText}
			/>
			<!--To do make this to question-->
			<div class="flex mt-2 mb-2 gap-2">
				<Input type="text" placeholder="alternertiver text" />
				<Input id="picture" type="file" />
			</div>
			<select name="Table" bind:value={TableType}>
				<option value="radio">Eine Antwort pro Reihe</option>
				<option value="checkbox">Meherer Antworten pro Reihe</option>
				<option value="text">Text eingabe</option>
			</select><br />
			<Label>Reihe Hinzufügen</Label>
			<div class="m-2">
				{#each TabelRows as Row, i}
					<div class="flex gap-2 mb-1">
						<Input type="text" placeholder="Reihen Name {i + 1}" bind:value={Row} />
						<Input type="text" placeholder="alternertiver text" />
						<Input id="picture" type="file" />
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
					TabelRows = [...TabelRows, ''];
				}}><Plus /></Button
			>
			<br />
			<Label>Spalte Hinzufügen</Label>
			<div class="m-2">
				{#each TabelColumns as Column, i}
					<div class="flex gap-2 mb-1">
						<Input type="text" placeholder="Spalte Name {i + 1}" bind:value={Column} />
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
					TabelColumns = [...TabelColumns, ''];
				}}><Plus /></Button
			>
			<br />
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead class="w-[100px]" />
						{#each TabelColumns as Column}
							<TableHead class="text-right">{Column}</TableHead>
						{/each}
					</TableRow>
				</TableHeader>

				<TableBody>
					{#each TabelRows as Row}
						{#if TableType == 'radio'}
							<TableRow key={Row}>
								<TableCell class="">
									{Row}
									<!--<ImageSupabase
										image_src={}
										bucket={'Question images'}
										alt={''}
									/>-->
								</TableCell>
								{#each TabelColumns as Column, i}
									<TableCell>
										<div class="flex justify-end">
											<div class="h-4 w-4">
												<Input type="radio" class="h-4 w-4" name="row-{Row}" value="{i}-{Row}" />
											</div>
										</div>
									</TableCell>
								{/each}
							</TableRow>
						{:else if TableType == 'text'}
							<TableRow key={Row}>
								<TableCell class="">{Row}</TableCell>
								{#each TabelColumns as Column, i}
									<TableCell>
										<Input
											type="text"
											class="mb-2"
											placeholder="Geben sie hier einer regex zur valitation der eingabe ein"
										/>
										<Input type="text" placeholder="Geben sie hier eine musterlösung ein" />
									</TableCell>
								{/each}
							</TableRow>
						{:else}
							<TableRow key={Row}>
								<TableCell class="">{Row}</TableCell>
								{#each TabelColumns as Column, i}
									<TableCell>
										<div class="flex justify-end">
											<Checkbox />
										</div>
									</TableCell>
								{/each}
							</TableRow>
						{/if}
					{/each}
				</TableBody>
			</Table>
		</TabsContent>
		<TabsContent value="X-template">
			<Label>Frage</Label>
			<Textarea
				placeholder="Tipp un X-Vorlage zu nutzen nutze &#123;&#123; Text &#125;&#125;"
				bind:value={XTemplateText}
			/>
			<!--To do make this to question-->
			<div class="flex mt-2 mb-2 gap-2">
				<Input type="text" placeholder="alternertiver text" />
				<Input id="picture" type="file" />
			</div>
			<!--<ImageSupabase
					image_src={}
					bucket={'Question images'}
					alt={''}
				/>-->
			{#each XTemplateNames as Name}
				<div class="m-2">
					<Label>{Name}</Label>
					<div class="flex items-center space-x-2">
						<Checkbox id="X-temp-{Name}" bind:checked={XTemplateArray[Name].userOverride} />
						<Label for="X-temp-{Name}">Nutzer daf sagen das seine antwort richtig ist</Label>
					</div>
					<div class="flex gap-2 mb-1">
						<Input
							type="text"
							class="m-1"
							placeholder="Befor antwort"
							bind:value={XTemplateArray[Name].befor}
						/>
						<Input
							type="text"
							class="m-1"
							placeholder="hinter antwort"
							bind:value={XTemplateArray[Name].after}
						/>
					</div>
					<div class="m-2">
						{#each XTemplateArray[Name].wert as Option, i}
							<div class="flex gap-2 mb-1 w-full">
								<Label>Wert:</Label>
								{#if Option.pattern == 'TextOption'}
									<Input type="text" placeholder="Kann wert Sein" bind:value={Option.wert} />
									<Input
										type="text"
										placeholder="Seperiere die Antwortmöglichkeiten mit einen ;"
										bind:value={Option.anwser}
									/>
								{:else if Option.pattern == 'Picture'}
									<div class="flex gap-2  w-full">
										<Input type="text" placeholder="alternertiver text" />
										<Input id="picture" type="file" />
									</div>
									<!--<ImageSupabase
									image_src={}
									bucket={'Question images'}
									alt={''}
								/>-->
									<div class="flex gap-2  w-full">
										<Input type="text" placeholder="alternertiver text" />
										<Input id="picture" type="file" />
									</div>
									<!--<ImageSupabase
								image_src={}
								bucket={'Question images'}
								alt={''}
							/>-->
								{:else}
									<Input type="text" placeholder="Kann wert Sein" bind:value={Option.wert} />
									<Input type="text" placeholder="Richtige antwort" bind:value={Option.anwser} />
								{/if}

								<select name="pattern" bind:value={Option.pattern}>
									<option value="redex">redex</option>
									<option value="textmatch">ist text</option>
									<option value="TextOption">Auswahloptionen</option>
									<option value="Picture">Bild</option>
								</select>
								<Button
									variant="secondary"
									on:click={() => {
										XTemplateArray[Name].wert.splice(i, 1);
										XTemplateArray[Name].wert = [...XTemplateArray[Name].wert];
									}}
								>
									<X />
								</Button>
							</div>
						{/each}
					</div>
					<Button
						variant="secondary"
						class="m-2"
						on:click={() => {
							XTemplateArray[Name].wert = [...XTemplateArray[Name].wert, {}];
						}}><Plus /></Button
					>
				</div>
			{/each}
		</TabsContent>
	</Tabs>
	<Button class="m-2" on:click={send}>Sende Daten</Button>
	{JSON.stringify(sendjson)}
	{error}
</section>

<style>
	.imageSize {
		width: 100px;
	}
</style>
