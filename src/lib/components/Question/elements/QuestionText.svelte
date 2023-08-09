<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '$components/ui/collapsible';
	import Textarea from '$components/ui/textarea/Textarea.svelte';
	import type { conntroll } from '$lib/stores/questionStore';
	import PercentBatch from '../../../../routes/question/percentBatch.svelte';
	import { text_Valitation, type type_Text_Valitations } from './textValitations';
	export let selected: any;
	export let conntrolls: conntroll;
	export const index: number | string = 0;
	// form question in db
	export let answers: { text: string };
	export let validations: type_Text_Valitations;
	//
	export function calcPercent(ans: any) {
		if (userOverried) return percent_override;
		return text_Valitation(validations.validatepattons, ans['textbox' + index], validations.type);
	}
	let percent = 0;
	let percent_override = 0;
	let userOverried: boolean = false;
	$: {
		if (userOverried) percent = percent_override;
		percent = text_Valitation(
			validations.validatepattons,
			selected['textbox' + index],
			validations.type
		);
	}
	let isOpen = false;
</script>

<div class="p-3">
	<div class="flex justify-between items-center">
		<h3>{answers.text}</h3>
		<Collapsible open={isOpen}>
			<CollapsibleTrigger>
				<Button variant="ghost" size="sm">
					<PercentBatch {percent} />
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent class="absolute right-3  w-1/3">
				{#if validations.userOverried}
					<div
						class="p-3 border rounded-md flex justify-center items-center w-full gap-4 bg-slate-100"
					>
						<input
							type="range"
							min="0"
							max="1"
							step="0.001"
							bind:value={percent_override}
							class="w-full slider"
							on:mouseup={() => {
								percent = percent_override;
								userOverried = true;
							}}
							on:touchend={() => {
								percent = percent_override;
								userOverried = true;
							}}
							on:touchcancel={() => {
								percent = percent_override;
								userOverried = true;
							}}
						/>
						<div class="percentwith flex justify-center">
							<PercentBatch percent={percent_override} />
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
				class="h-full print:hidden"
				bind:value={selected['textbox' + index]}
				disabled={conntrolls.lockInput}
			/>
		</div>
		{#if conntrolls.showAnswerser}
			<div class="w-full" style="white-space: pre-line;">
				{validations.text}
			</div>
		{/if}
	</div>
</div>

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
