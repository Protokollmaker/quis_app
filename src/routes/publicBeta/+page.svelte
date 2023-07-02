<script lang="ts">
	// TODO maybe questions for motortypenschild and KKS identifiers
	// TODO musterlösung für X-template
	// TODO maybe put alt somwher other than temp images
	import ImageSupabase from '$components/image/imageSupabase.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import Checkbox from '$components/ui/checkbox/Checkbox.svelte';
	import FileInput from '$components/ui/input/FileInput.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import RadioInput from '$components/ui/input/RadioInput.svelte';
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
	type type_uuid_exam = {
		year: number | undefined;
		exam_part: 'Teil1' | 'Teil2' | undefined;
		part: 'TeilA' | 'TeilB' | undefined;
		question: number | undefined;
	};

	let question: any = { type: 'Multiple choice', text: undefined, alt: undefined };
	let exams: Array<type_uuid_exam> = [];
	let tags: Array<string> = [];
	let questionImage: any = { alt: undefined, Img: undefined };
	let questionPath: string | undefined = undefined;

	let uploadedImages: Array<String> = [];

	let sendjson: any = {};
	let error: string = '';
	// X Template
	type XTempalteArrayType = {
		[key: string]: {
			wert:
				| Array<{
						pattern: string;
						filepath: string | undefined;
						sampleSolution: string | undefined;
						anwser: string | undefined;
						anwser_filepath: string | undefined;
				  }>
				| [];
			befor: string | undefined;
			after: string | undefined;
		};
	};
	let XTemplateNames: Array<string> = [];
	let XTemplateArray: any = [];
	let XTemplateImage: Array<any> = [];

	// Multiple choice
	type Multiplechoiselemnt = {
		alt: undefined | string; // alternative text for image
		filepath: undefined | string; // userid/imagename
		text: undefined | string;
	};
	let NumberOfChoices = 5;
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
	// Tabel
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
	let TabelesRowsImagesPath: Array<string> = [];
	$: console.log(TabelesRowsImagesPath);
	// Generly functions
	$: uploadarrayMultplechois(MultiplechoiceImages);

	async function uploadarrayMultplechois(array: Array<any>) {
		array.forEach(function (value, i) {
			uploadImages(value).then((filepath: any) => {
				MultiplechoiceImagesURL[i] = filepath;
				MultiplechoiceAnwerserElement[i].filepath = filepath;
			});
		});
	}

	$: uploadarrayRowTabel(TabelesRowsImages);

	async function uploadarrayRowTabel(array: Array<any>) {
		array.forEach(function (value, i) {
			let in1 = { Img: value, alt: undefined, filepath: undefined };
			uploadImages(in1).then((filepath: any) => {
				TabelRows[i].filepath = filepath;
			});
		});
	}

	$: uploadImages(questionImage).then((filepath: any) => (questionPath = filepath));
	async function uploadImages(obj: {
		alt: string | undefined;
		Img: any | undefined;
		filepath: string | undefined;
	}) {
		if (obj.Img == undefined) return undefined;
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
	function cleanTabelValidation(valitation: any, Type: string) {
		let obj: any = {};
		for (const [key, value] of Object.entries(valitation)) {
			if (key.includes(Type)) {
				obj[key] = value;
			}
		}
		return obj;
	}
	function splitXTemplate(t_obj: any, split: 'validation' | 'anwerer') {
		/*let obj: any = {}; 
		for (const [key, value] of Object.entries(t_obj)) {
			for (const obsplit1 of Object.entries(value.wert)) {
			
			}
		}*/
	}
	//
	$: XTemplateNames = xTemplateGetVars(question.text);
	function xTemplateGetVars(text: string | undefined) {
		if (text == undefined) return [];
		let regex = /(?:[{]{2}(.+?)[}]{2})/g;
		let redexremove = /{{|}}/g;
		let Names = text.match(regex);
		if (Names == null) return [];
		const outputArray = Names.map((element) => element.replace(redexremove, ''));
		const uniques = [...new Set(outputArray)];
		return uniques;
	}
	$: XTemplateArray = xTemplateInitoption(XTemplateArray, XTemplateNames);
	function xTemplateInitoption(obj: any, Names: Array<string>) {
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
	async function send() {
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
		// question
		sendjson.question = {
			filepath: questionPath,
			alt: question.alt,
			text: question.text
		};
		// answers
		if (question.type == 'Multiple choice') {
			let Cleenedobject: Array<any> = [];
			for (let e of MultiplechoiceAnwerserElement)
				Cleenedobject.push(
					Object.fromEntries(
						Object.entries(e).filter(([key, value]) => {
							return value != null;
						})
					)
				);
			console.log(Cleenedobject);
			sendjson.answers = {
				answers: Cleenedobject
			};
		} else if (question.type == 'TableQuestion') {
			sendjson.answers = {
				type: TableType,
				answers: {
					rows: TabelRows,
					columns: TabelColumns
				}
			};
		} else if (question.type == 'X-template') {
			sendjson.answers = {
				array: XTemplateArray
			};
		}
		// validation
		if (question.type == 'Multiple choice') {
			if (MultiplechoiceValidation == -1) {
				error = 'In der Mehrfachauswahl wurde keine Lösung ausgewählt';
				return 1;
			}
			sendjson.validation = {
				validation: MultiplechoiceValidation
			};
		}
		if (question.type == 'TableQuestion') {
			sendjson.validation = {
				validation: cleanTabelValidation(TabelValiation, TableType)
			};
		}
		const res = await supabaseClient.from('Questions').insert(sendjson);
		if (res.error) console.log(res.error);
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
			<Textarea placeholder="Schreibe hier diene Frage herein" bind:value={question.text} />
			<div class="flex mt-2 mb-5 gap-2">
				<Input type="text" placeholder="alternertiver text" bind:value={question.alt} />
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
					<ImageSupabase
						image_src={MultiplechoiceImagesURL[i]}
						bucket={'Question images'}
						alt={''}
					/>
				</div>
			{/each}
			<Label class="mr-4">Richtige antwort</Label>
			<select name="valedation" bind:value={MultiplechoiceValidation}>
				{#each MultiplechoiceAnwerser as Anwser, i}
					<option value={i}>{i + 1}</option>
				{/each}
			</select>
		</TabsContent>
		<TabsContent value="TableQuestion">
			<h2>Frage</h2>
			<Textarea placeholder="Schreibe hier diene Frage herein" bind:value={question.text} />
			<!--To do make this to question-->
			<div class="flex mt-2 mb-2 gap-2">
				<Input type="text" placeholder="alternertiver text" bind:value={question.alt} />
				<FileInput id="picture" type="file" bind:files={questionImage.Img} />
			</div>
			<div class="imageSize">
				<ImageSupabase image_src={questionPath} bucket={'Question images'} alt={''} />
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
									<ImageSupabase
										bind:image_src={TabelesRowsImagesPath[j]}
										bucket={'Question images'}
										alt={''}
									/>
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
										bind:image_src={TabelesRowsImagesPath[j]}
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
		</TabsContent>
		<TabsContent value="X-template">
			<h2>Frage</h2>
			<h1>Bitte noch nicht benutzen</h1>
			<Textarea
				placeholder="Tipp un X-Vorlage zu nutzen nutze &#123;&#123; Text &#125;&#125;"
				bind:value={question.text}
			/>
			<!--To do make this to question-->
			<div class="flex mt-2 mb-2 gap-2">
				<Input type="text" placeholder="alternertiver text" />
				<FileInput id="picture" type="file" bind:files={questionImage.Img} />
			</div>
			<div class="imageSize">
				<ImageSupabase image_src={questionPath} bucket={'Question images'} alt={''} />
			</div>
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
