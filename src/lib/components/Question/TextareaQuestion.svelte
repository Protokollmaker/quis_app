<script lang="ts">
	// TODO implement picture support
	// TODO implement redex
	import ImageSupabase from '$components/image/imageSupabase.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import type { conntroll } from '$lib/stores/questionStore';
	import type { anyobject } from '$lib/types/types';
	import QuestionText from './elements/QuestionText.svelte';

	export let json_question: any = {};
	export let question_count: number = 0;
	export let question_count_max: number = Infinity;
	export let selected: anyobject = {};
	////////////////////////////////////////////////////
	export let conntrolls: conntroll;
	////////////////////////////////////////////////////
	export let layout: any;
	////////////////////////////////////////////////////
	let childs: Array<any> = [];
	export function calcPercent(ans: any) {
		let percent = 0;
		const weight = 1 / childs.length;
		for (let child of childs) {
			percent += child.calcPercent(ans) * weight;
		}
		console.log(percent);
		return percent;
	}
</script>

<svelte:component this={layout.layout}>
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
	<div slot="anwerser" class="h-full grid grid-flow-row">
		{#each json_question.answers as answer, index}
			<QuestionText
				bind:this={childs[index]}
				bind:selected
				bind:conntrolls
				bind:answers={answer}
				bind:validations={json_question.validation[index]}
				{index}
			/>
		{/each}
	</div>
	<div slot="head-right" class="h-full"><slot name="head-right" /></div>
	<div slot="fooder-right" class="h-full"><slot name="fooder-right" /></div>
	<div slot="fooder-left" class="h-full"><slot name="fooder-left" /></div>
</svelte:component>
