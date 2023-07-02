<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import { depeCopy, emptyObject } from '.';
	export let count: number;
	export let answered: any;
	export let anwerringquestion: any;
	export let first_answer: any;
	export let child: any;
	export let question: any;
	export const showCorrectAnwer: boolean = false;
	let disabelNextButton: boolean = false;
	let delay: number = 1000;
</script>

<section>
	<div class="footer flex justify-between">
		<div>
			<Button
				variant="boarder"
				on:click={() => {
					count--;
				}}>vorherige Frage</Button
			>
		</div>
		<div>
			<Button
				variant="boarder"
				on:click={() => {
					if (emptyObject(answered)) {
						answered = depeCopy(anwerringquestion);
						//showCorrectAnwer = true;
						if (emptyObject(answered)) {
							answered = { fill: 'none' };
						}
						first_answer = {
							count: count,
							percent: child.calcPercent(answered),
							id: question.id
						};
					}
				}}>Frage abgeben</Button
			>
			<Button
				bind:disabled={disabelNextButton}
				on:click={() => {
					if (disabelNextButton) return;
					if (emptyObject(answered)) {
						//showCorrectAnwer = true;
						disabelNextButton = true;
						answered = depeCopy(anwerringquestion);
						if (emptyObject(answered)) {
							answered = { fill: 'none' };
						}
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
		</div>
	</div>
</section>

<style></style>
