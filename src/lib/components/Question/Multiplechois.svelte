<script lang="ts">
	import ImageSupabase from '$components/image/imageSupabase.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import type { anyobject } from '$lib/types/types';
	import Layout1 from './Layout1.svelte';
	export let json_question: any;
	export let question_count: number = 0;
	export let question_count_max: number = Infinity;
	export let selected: anyobject;
	////////////////////////////////////////////////////
	export let showCorrectAnwer = false;
	export let answered: anyobject = {};
	////////////////////////////////////////////////////
	export function calcPercent(ans: any) {
		return json_question.validation.validation == ans.selected ? 1 : 0;
	}
</script>

<Layout1>
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
						class="w-full"
						style="max-height: 400px; object-fit: contain;"
					/>
				{/if}
			</div>
		</div>
	</div>

	<div slot="anwerser" class="p-5 h-full w-full flex items-center">
		<div class="w-full">
			{#each json_question.answers.answers as answer, i}
				<div
					style="box-sizing: border-box;"
					class="{showCorrectAnwer &&
					answered.selected == i &&
					json_question.validation.validation != i
						? 'wrong'
						: ''}{showCorrectAnwer && json_question.validation.validation == i ? 'correct' : ''}"
				>
					<input
						type="radio"
						id={'answer' + i}
						name="answer"
						class="absolute hidden"
						value={i}
						bind:group={selected.selected}
					/>
					<div>
						<label class="answer flex" for={'answer' + i} id={'answer' + i + 'label'}>
							<div
								class="number flex items-center justify-center {selected.selected == i
									? 'selected'
									: ''}"
							>
								{i + 1}
							</div>
							{#if answer.hasOwnProperty('text')}
								<div class="pr-5 pl-5">{answer.text}</div>
							{/if}
							{#if answer.hasOwnProperty('filepath')}
								<div class="img mx-5">
									<ImageSupabase
										bind:image_src={answer.filepath}
										bucket={'Question images'}
										bind:alt={answer.alt}
										style="max-height: 12vh; height: 12vh;object-fit: contain;"
									/>
								</div>
							{/if}
						</label>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div slot="head-right" class="h-full"><slot name="head-right" /></div>
	<div slot="fooder-right" class="h-full"><slot name="fooder-right" /></div>
	<div slot="fooder-left" class="h-full"><slot name="fooder-left" /></div>
</Layout1>

<style>
	.answer {
		padding: 2%;
	}
	.answer .number {
		min-width: 25px;
		height: 25px;
		width: 25px;
		border-radius: 20px;

		border: 1px solid #154360;
	}
	.selected {
		background-color: #154360;
		color: #ffffff;
	}
	.wrong {
		background-color: #cd6155;
	}
	.correct {
		background-color: #45b39d;
	}
</style>
