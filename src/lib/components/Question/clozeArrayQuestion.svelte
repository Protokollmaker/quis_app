<script lang="ts">
	import ImageSupabase from '$components/image/imageSupabase.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import type { conntroll } from '$lib/stores/questionStore';
	import QuestionGaps from './elements/QuestionGaps.svelte';

	export let json_question: any = {};
	export let question_count: number = 0;
	export let question_count_max: number = Infinity;
	export let selected: any = {};
	////////////////////////////////////////////////////
	export let conntrolls: conntroll;
	export let layout: any;
	////////////////////////////////////////////////////
	export function calcPercent(ans: any) {
		return child.calcPercent(ans);
	}
	let child: any;
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
	<div slot="anwerser" class="">
		<QuestionGaps
			bind:this={child}
			bind:selected
			bind:conntrolls
			bind:answers={json_question.answers}
			bind:layout
			bind:validations={json_question.validation}
		/>
	</div>
	<div slot="head-right" class="h-full"><slot name="head-right" /></div>
	<div slot="fooder-right" class="h-full"><slot name="fooder-right" /></div>
	<div slot="fooder-left" class="h-full"><slot name="fooder-left" /></div>
</svelte:component>

<style></style>
