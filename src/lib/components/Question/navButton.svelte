<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import type { conntroll } from '$lib/stores/questionStore';
	export let count: number;
	export let answered: any;
	export let first_answer: any;
	export let child: any;
	export let question: any;
	export let question_conntroll: conntroll;
	export let flag: any;
	function allowSetShowCorrectAnwer(bool: boolean) {
		return (flag.AutoSolutiononNextButton && !bool) || flag.alwaysShowAnwerser;
	}
	// to disabel for 1 seconte
	let disabelNextButton: boolean = false;
	let delay: number = 1000;
</script>

<section>
	<div class="footer flex justify-between">
		<div>
			{#if flag.ShowPrevButton}
				<Button
					variant="boarder"
					on:click={() => {
						count--;
					}}>vorherige Frage</Button
				>
			{/if}
		</div>
		<div>
			<Button
				variant={flag.ShowNextButton ? 'boarder' : 'default'}
				on:click={() => {
					if (!question_conntroll.delivered) {
						//
						question_conntroll.delivered = true && flag.AutoSolutiononNextButton;
						question_conntroll.lockInput = true && flag.AutoSolutiononNextButton;
						question_conntroll.showAnswerser = true && flag.AutoSolutiononNextButton;
						question_conntroll.percent = child.calcPercent(answered);
						//
						first_answer = {
							count: count,
							percent: child.calcPercent(answered),
							id: question.id
						};
					}
				}}>Frage abgeben</Button
			>
			{#if flag.ShowNextButton}
				<Button
					bind:disabled={disabelNextButton}
					on:click={() => {
						console.log();
						if (disabelNextButton) return;
						if (!question_conntroll.delivered) {
							//
							question_conntroll.delivered = true && flag.AutoSolutiononNextButton;
							question_conntroll.lockInput = true && flag.AutoSolutiononNextButton;
							question_conntroll.showAnswerser = true && flag.AutoSolutiononNextButton;
							question_conntroll.percent = child.calcPercent(answered);
							//
							disabelNextButton = true;
							first_answer = {
								count: count,
								percent: child.calcPercent(answered),
								id: question.id
							};
							setTimeout(() => {
								count++;
								disabelNextButton = false;
							}, delay);
						} else {
							count++;
						}
					}}
					>nächste Frage
				</Button>
			{/if}
		</div>
	</div>
</section>

<style></style>
