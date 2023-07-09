<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import type { anyobject } from '$lib/types/types';
	export const json_question: any = {};
	export let question_count: number = 0;
	export const question_count_max: number = Infinity;
	export const selected: anyobject = {};
	////////////////////////////////////////////////////
	export const showCorrectAnwer: boolean = false;
	export const answered: anyobject = {};
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
	</div>
</section>

<style></style>
