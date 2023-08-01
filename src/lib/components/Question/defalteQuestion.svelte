<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import type { anyobject } from '$lib/types/types';
	export const json_question: any = {};
	export let question_count: number = 0;
	export let question_count_max: number = Infinity;
	export let selected: anyobject = {};
	////////////////////////////////////////////////////
	export let showCorrectAnwer: boolean = false;
	export let answered: anyobject = {};
	export let layout: any;
	////////////////////////////////////////////////////
	export function calcPercent(ans: any) {
		return 1;
	}
</script>

<section>
	diese Frage ist unbekant und kann möglicherwerise nur in dev angezeigt werden<br />
	<Button
		on:click={() => {
			question_count -= 1;
		}}>vorherige Frage</Button
	>
	<Button
		on:click={() => {
			question_count += 1;
		}}>nächste Frage</Button
	>
	<div class="hidden">
		<slot name="fooder-right" />
		<slot name="fooder-left" />
		<slot name="head-right" />
	</div>
</section>

<style></style>
