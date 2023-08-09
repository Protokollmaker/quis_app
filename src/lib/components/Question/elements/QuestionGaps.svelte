<script lang="ts">
	// TODO: User override
	// TODO: gewichtugn der lücken
	import ImageSupabase from '$components/image/imageSupabase.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import type { conntroll } from '$lib/stores/questionStore';
	import {
		genMatrixMask,
		getShape2d,
		multiplyMatrix2D,
		permutations,
		sumMatrix2D,
		sumMatrix2DRow
	} from '$lib/utils/utils';
	import PercentBatch from '../../../../routes/question/percentBatch.svelte';
	import { text_Valitation, type type_Text_Valitation } from './textValitations';

	export let selected: any;
	export let conntrolls: conntroll;
	export const index: number | string = 0;
	// form question in db
	export let answers: type_answers_gap;
	export let validations: type_valitation_gap;
	export let layout: any;
	//

	type type_answers_gap = {
		gaps: Array<{
			text: string;
			filepath?: string;
			alt?: string;
			placeholder?: string;
		}>;
		text: string;
		order: string;
		alt?: string;
		filepath?: string;
	};

	type type_valitation_gap = {
		gaps: Array<{
			validationpattons: type_Text_Valitation;
			text: string;
			weight: number;
		}>;
		type: string;
		userOverried: boolean;
	};
	export function calcPercentOrderRamdon(ans: any) {
		let user_input_gaps: Array<string> = [];
		for (let i in answers.gaps) {
			user_input_gaps.push(ans['gap' + index + '-' + i]);
		}
		//////////////////////////////////////////
		let gaps_percent: Array<Array<number>> = [];

		user_input_gaps.forEach((text, i) => {
			gaps_percent[i] = [];
			const input_percent = gaps_percent[i];
			validations.gaps.forEach((validation, j) => {
				input_percent.push(text_Valitation(validation.validationpattons, text, validations.type));
			});
		});
		//////////////////////////////////////////
		const shape = getShape2d(gaps_percent);
		const mask = genMatrixMask(shape.rows, shape.collumes, []);
		const permutation = permutations(mask);
		//////////////////////////////////////////
		const matrix_percent: Array<Array<Array<number>>> = [];
		permutation.forEach((permut) => {
			matrix_percent.push(multiplyMatrix2D(permut, gaps_percent));
		});
		const colapes_percent: Array<number> = [];
		matrix_percent.forEach((matrix) => {
			colapes_percent.push(sumMatrix2D(matrix));
		});
		const max = Math.max(...colapes_percent);
		return max;
	}

	export function calcPercent(ans: any) {
		if (answers.order == 'random') return calcPercentOrderRamdon(ans);
		let user_input_gaps: Array<string> = [];
		for (let i in answers.gaps) {
			user_input_gaps.push(ans['gap' + index + '-' + i]);
		}
		let input_percent: Array<number> = [];

		validations.gaps.forEach((validation, j) => {
			const waited = validation.weight ? validation.weight : (1 / length) * 100;
			input_percent.push(
				text_Valitation(validation.validationpattons, user_input_gaps[j], validations.type) * waited
			);
		});
		return sumMatrix2DRow(input_percent);
	}
	let percent: number = 0;
	$: percent = calcPercent(selected);
</script>

<section class="p-2 flex gap-2 justify-stretch pr-4">
	{#if answers.hasOwnProperty('gaps')}
		<div class="w-full">
			<div class="flex items-center justify-between">
				{#if answers.hasOwnProperty('text')}
					{answers.text}
				{/if}
				<PercentBatch bind:percent />
			</div>
			<div>
				{#if answers.hasOwnProperty('filepath')}
					<ImageSupabase
						bind:image_src={answers.filepath}
						bucket={'Question images'}
						alt={answers.hasOwnProperty('alt') ? answers.alt : ''}
						class="w-full"
						style="{layout.questionimg}object-fit: contain;"
					/>
				{/if}
				{#each answers.gaps as gap, i}
					<div class="flex gap-2 items-center justify-between">
						<div>
							{#if gap.hasOwnProperty('text')}
								{gap.text}
							{/if}
							{#if gap.hasOwnProperty('filepath')}
								<ImageSupabase
									bind:image_src={gap.filepath}
									bucket={'Question images'}
									alt={gap.hasOwnProperty('alt') ? gap.alt : ''}
									class="w-full"
									style="{layout.questionimg}object-fit: contain;"
								/>
							{/if}
						</div>
						<Input
							placeholder={gap.placeholder}
							bind:value={selected['gap' + index + '-' + i]}
							disable={conntrolls.lockInput}
						/>
						{#if answers.order != 'random' && conntrolls.showAnswerser}
							<div>
								{i}: {validations.gaps[i].text}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
		{#if answers.order == 'random' && conntrolls.showAnswerser}
			<ul>
				{#each validations.gaps as solution}
					<li class="w-max ml-6">{solution.text}</li>
				{/each}
			</ul>
		{/if}
	{/if}
</section>

<style>
	ul {
		@apply list-disc;
	}
</style>
