<script lang="ts">
	import ImageSupabase from '$components/image/imageSupabase.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import type { conntroll } from '$lib/stores/questionStore';
	import type { anyobject } from '$lib/types/types';
	export let layout: any;
	export let json_question: any;
	export let question_count: number = 0;
	export let question_count_max: number = Infinity;
	export let selected: anyobject;
	////////////////////////////////////////////////////
	export let conntrolls: conntroll;
	export let answered: anyobject = {};
	////////////////////////////////////////////////////
	export function calcPercent(ans: any) {
		return json_question.validation.validation == ans.selected ? 1 : 0;
	}
</script>

<svelte:component this={layout.layout}>
	<div slot="question" class="p-3 h-full w-full flex items-center">
		<div>
			<Label class="text-slate-700 text-sm">
				<span>Frage:</span> <span>{question_count + 1}/{question_count_max}</span>
			</Label>
			<div class="pt-1">
				{#if json_question.question.hasOwnProperty('text')}
					<div class="text" style={layout.questiontext}>{json_question.question.text}</div>
				{/if}
				{#if json_question.question.hasOwnProperty('filepath')}
					<ImageSupabase
						bind:image_src={json_question.question.filepath}
						bucket={'Question images'}
						bind:alt={json_question.question.alt}
						class="w-full"
						style="{layout.questionimg}object-fit: contain;"
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
					class="{conntrolls.showAnswerser &&
					answered.selected == i &&
					json_question.validation.validation != i
						? 'wrong'
						: ''}{conntrolls.showAnswerser && json_question.validation.validation == i
						? 'correct'
						: ''}"
				>
					<input
						type="radio"
						id={'answer' + i + question_count}
						name="answer"
						class="absolute hidden"
						value={i}
						bind:group={selected.selected}
						disabled={conntrolls.lockInput}
					/>
					<div>
						<label
							class="answer flex"
							style={layout.anwerserdistens}
							for={'answer' + i + question_count}
							id={'answer' + i + 'label'}
						>
							<div
								class="number flex items-center justify-center {selected.selected == i
									? 'selected'
									: ''}"
							>
								{i + 1}
							</div>
							{#if answer.hasOwnProperty('text')}
								<div class="pr-5 pl-5" style={layout.anwersertext}>{answer.text}</div>
							{/if}
							{#if answer.hasOwnProperty('filepath')}
								<div class="img mx-5">
									<ImageSupabase
										bind:image_src={answer.filepath}
										bucket={'Question images'}
										bind:alt={answer.alt}
										style="object-fit: contain; {layout.anwerserimg}"
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
</svelte:component>

<style>
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
