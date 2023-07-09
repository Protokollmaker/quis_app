<script lang="ts">
	// @ts-nocheck
	import ImageSupabase from '$components/image/imageSupabase.svelte';
	import Checkbox from '$components/ui/checkbox/Checkbox.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import {
		Table,
		TableBody,
		TableCaption,
		TableHead,
		TableHeader,
		TableRow
	} from '$components/ui/table';
	import TableCell from '$components/ui/table/TableCell.svelte';
	import Layout1 from './Layout1.svelte';
	// input/output saves currend selection of the question
	export let selected: any;
	export let answered: any;
	// input show correct anwerser
	export let showCorrectAnwer: boolean;
	// input cout of question that are don
	export let question_count;
	export let question_count_max;
	// input question
	export let json_question: any;

	function checkboxIsCorrect(obj_checkboxstate: boolean, checkboxname: string) {
		if (!obj_checkboxstate.hasOwnProperty(checkboxname)) return null;
		let checkboxstate = obj_checkboxstate[checkboxname];
		if (!json_question.validation.validation.hasOwnProperty(checkboxname)) return false;
		if (json_question.validation.validation[checkboxname] == checkboxstate) {
			return true;
		}
		return false;
	}
	// retruns true if ansnser shout be green: 1 red: 0 and null for uncoloerd
	function checkboxIsCorrectDisplay(obj_checkboxstate: boolean, checkboxname: string) {
		if (!obj_checkboxstate.hasOwnProperty(checkboxname)) return undefined;
		let checkboxstate = obj_checkboxstate[checkboxname];
		if (!json_question.validation.validation.hasOwnProperty(checkboxname)) return undefined;
		if (json_question.validation.validation[checkboxname]) return true;
		if (checkboxstate) {
			return false;
		}
		return null;
	}

	function checkboxIsCorrectDisplayMaped(
		obj_checkboxstate: boolean,
		checkboxname: string,
		showCorrectAnwer: boolean
	) {
		if (!showCorrectAnwer) return '';
		let state = checkboxIsCorrectDisplay(obj_checkboxstate, checkboxname);
		if (state == null) return '';
		if (state == true) return 'background-color: #45b39d;';
		if (state == false) return 'background-color: #cd6155;';
	}

	function checkboxcorrectnisInPercent(obj: any) {
		let number = 0;
		let summe = 0;
		json_question.answers.answers.rows.forEach(function (value1, i) {
			json_question.answers.answers.columns.forEach(function (value2, j) {
				number++;
				summe += checkboxIsCorrect(obj, 'checkbox' + i + '-' + j) ? 1 : 0;
			});
		});
		return summe / number;
	}
	function correctnisInPercent(obj: any) {
		if (json_question.answers.type == 'checkbox') {
			return checkboxcorrectnisInPercent(obj);
		}
	}
	// output
	export function calcPercent(ans) {
		return correctnisInPercent(ans);
	}
</script>

<Layout1>
	<!--question-->
	<div slot="question" class="p-3 h-full w-full flex justify-center items-center">
		<div>
			<Label class="text-slate-700 text-sm">
				<span>Frage:</span> <span>{question_count + 1}/{question_count_max}</span>
			</Label>
			<div class="pt-1">
				{#if json_question.question.hasOwnProperty('text')}
					<div class="text">{json_question.question.text}</div>
				{/if}
				{#if json_question.question.hasOwnProperty('filepath')}
					<ImageSupabase
						bind:image_src={json_question.question.filepath}
						bucket={'Question images'}
						bind:alt={json_question.question.alt}
						style="max-height: 400px;"
					/>
				{/if}
			</div>
		</div>
	</div>
	<!--anwser-->
	<div slot="anwerser" class="p-5 h-full w-full flex justify-center items-center">
		<Table>
			<TableCaption>Antworten</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead class={json_question.answers.type == 'checkbox' ? 'w-[400px]' : ''} />
					{#each json_question.answers.answers.columns as columns}
						<TableHead class="text-right">
							{#if columns.hasOwnProperty('text')}
								{columns.text}
							{/if}
						</TableHead>
					{/each}
				</TableRow>
			</TableHeader>
			<TableBody>
				{#if json_question.answers.type == 'checkbox'}
					{#each json_question.answers.answers.rows as rows, i}
						<TableRow key={rows.text}>
							<TableCell class="font-medium">
								{#if rows.hasOwnProperty('filepath')}
									<ImageSupabase
										bind:image_src={rows.filepath}
										bucket={'Question images'}
										bind:alt={rows.alt}
										style="max-height: 100px;"
									/>
								{/if}
								{rows.text}</TableCell
							>
							{#each json_question.answers.answers.columns as columns, j}
								<TableCell
									class="text-right"
									style={checkboxIsCorrectDisplayMaped(
										answered,
										'checkbox' + i + '-' + j,
										showCorrectAnwer
									)}
								>
									<div class="flex items-center justify-end">
										<Checkbox bind:checked={selected['checkbox' + i + '-' + j]} />
									</div>
								</TableCell>
							{/each}
						</TableRow>
					{/each}
				{/if}
			</TableBody>
		</Table>
		<!---->
	</div>
	<div slot="fooder-right"><slot name="fooder-right" /></div>
	<div slot="fooder-left"><slot name="fooder-left" /></div>
</Layout1>

<style>
</style>
