<script lang="ts">
	// TODO implement picture support
	// TODO implement redex
	// TODO Suport for mohr  than one textbox
	import ImageSupabase from '$components/image/imageSupabase.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '$components/ui/collapsible';
	import Label from '$components/ui/label/Label.svelte';
	import Textarea from '$components/ui/textarea/Textarea.svelte';
	import type { anyobject } from '$lib/types/types';
	import PercentBatch from '../../../routes/question/percentBatch.svelte';
	import Layout1 from './Layout1.svelte';

	export let json_question: any = {};
	export let question_count: number = 0;
	export let question_count_max: number = Infinity;
	export let selected: anyobject = {};
	////////////////////////////////////////////////////
	export let showCorrectAnwer: boolean = false;
	export let answered: anyobject = {};
	////////////////////////////////////////////////////
	export function calcPercent(ans: any) {
		return uiControll[0].percent;
	}
	let uiControll = [
		{
			text: '',
			value: 50,
			percent: 0,
			userOverried: false
		}
	];
	let isOpen = [false];
	function calcTextProcent(
		text: string | undefined,
		validatepattons: any,
		overried: boolean,
		t_percent: number
	) {
		if (!text) return 0;
		if (overried) return t_percent;
		let percent = 0;
		for (let validatepatton of validatepattons) {
			let isIncludet = false;
			for (let patton of validatepatton.pattons) {
				if (text.includes(patton)) {
					isIncludet = true;
					break;
				}
			}
			if (isIncludet) {
				percent += validatepatton.percent;
			}
		}
		return percent / 100;
	}
	$: uiControll[0].percent = calcTextProcent(
		selected['textbox' + 0],
		json_question.validation[0].validatepattons,
		uiControll[0].userOverried,
		uiControll[0].percent
	);
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
	<div slot="anwerser" class="h-full grid grid-flow-row">
		{#each json_question.answers as answer, i}
			<div class="p-3">
				<div class="flex justify-between items-center">
					<h3>{answer.text}</h3>
					<Collapsible open={isOpen[i]}>
						<CollapsibleTrigger>
							<Button variant="ghost" size="sm">
								<PercentBatch percent={uiControll[i].percent} />
							</Button>
						</CollapsibleTrigger>
						<CollapsibleContent class="absolute right-3  w-1/3">
							{#if json_question.validation[i].userOverried}
								<div
									class="p-3 border rounded-md flex justify-center items-center w-full gap-4 bg-slate-100"
								>
									<input
										type="range"
										min="0"
										max="100"
										step="0.1"
										bind:value={uiControll[i].value}
										class="w-full slider"
										on:mouseup={() => {
											uiControll[i].percent = uiControll[i].value / 100;
											uiControll[i].userOverried = true;
										}}
									/>
									<div class="percentwith flex justify-center">
										<PercentBatch percent={uiControll[i].value / 100} />
									</div>
								</div>
							{/if}
						</CollapsibleContent>
					</Collapsible>
				</div>
				<div class="flex h-full gap-2">
					<div class="h-5/6 w-full">
						<Textarea
							placeholder="Schreibe hier diene Antwort herein"
							class="h-full"
							bind:value={selected['textbox' + i]}
						/>
					</div>
					{#if showCorrectAnwer}
						<div class="w-full" style="white-space: pre-line;">
							{json_question.validation[i].text}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
	<div slot="head-right" class="h-full"><slot name="head-right" /></div>
	<div slot="fooder-right" class="h-full"><slot name="fooder-right" /></div>
	<div slot="fooder-left" class="h-full"><slot name="fooder-left" /></div>
</Layout1>

<style>
	.percentwith {
		width: 70px;
	}
	.slider {
		appearance: none;
		background-color: #2b546f;
		height: 2px;
		border-radius: 100px;
		cursor: pointer;
	}
</style>
