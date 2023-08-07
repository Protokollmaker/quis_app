<script lang="ts">
	import Textarea from '$components/ui/textarea/Textarea.svelte';
	import { text_Valitation, type type_Text_Valitations } from './textValitations';
	export let selected: any = {};
	export let answered: any = {};
	export let index: number | string = 0;
	// answer text
	export let validationtext: string = '';
	export let showCorrectAnwer: boolean = false;
	export let percent = 0;
	export let validatepatton: type_Text_Valitations;
	$: percent = text_Valitation(
		validatepatton.validatepattons,
		selected['textbox' + index],
		validatepatton.type
	);
</script>

<section class="flex gap-2">
	<div class="h-5/6 w-full print:hidden">
		{#if !showCorrectAnwer}
			<Textarea
				placeholder="Schreibe hier diene Antwort herein"
				class="h-full"
				bind:value={selected['textbox' + index]}
			/>
		{:else}
			<Textarea
				placeholder="Schreibe hier diene Antwort herein"
				class="h-full"
				bind:value={answered['textbox' + index]}
				disabled
			/>
		{/if}
	</div>
	{#if showCorrectAnwer}
		<div class="w-full" style="white-space: pre-line;">
			{validationtext}
		</div>
	{/if}
</section>
