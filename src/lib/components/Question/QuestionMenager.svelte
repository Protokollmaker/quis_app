<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import type { anyobject } from '$lib/types/types';
	import { Edit } from 'lucide-svelte';
	import { emptyObject, mergeObject } from '.';
	import Multiplechois1 from './Multiplechois1.svelte';
	import TabelQuestion from './TabelQuestion.svelte';

	// this is hier to mange the display of questions

	// input json form database
	export let question: any = undefined;
	// output number of question alrady anwerde
	export let count: number = 0;
	export let max_question_count: number = Infinity;
	// input/output is not null if question was alrady answered
	export let answered: anyobject = {};
	$: answered == null ? {} : answered;
	// output changes when question anwerder fist time
	export let first_answer: any = undefined;
	////////////////////////////////////////////////////////////////////
	export const flags: {
		ShowNextButton?: boolean;
		ShowPrevButton?: boolean;
		AutoSolutiononNextButton?: boolean;
		numOfPrevAnwerser?: number;
	} = {};
	const flag = mergeObject(
		{
			ShowNextButton: true,
			ShowPrevButton: true,
			AutoSolutiononNextButton: true,
			numOfPrevAnwerser: 10
		},
		flags
	);

	let delay: number = 1000;

	let anwerringquestion = {};
	let showCorrectAnwer = !emptyObject(answered);
	$: showCorrectAnwer = flag.AutoSolutiononNextButton && !emptyObject(answered);
	let child: any;
</script>

<section>
	<slot>
		{#if question}
			{#if question.Type == 'Multiple choice'}
				<Multiplechois1
					bind:selected={anwerringquestion}
					bind:json_question={question}
					bind:question_count={count}
					bind:showCorrectAnwer
					bind:answered
					bind:this={child}
					bind:question_count_max={max_question_count}
				>
					<div slot="fooder-right" class="p-2 pr-10 pl-10">
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
											answered = anwerringquestion;
											first_answer = {
												count: count,
												percent: child.calcPercent(answered),
												id: question.id
											};
										}
									}}>Frage abgeben</Button
								>
								<Button
									on:click={() => {
										if (emptyObject(answered)) {
											answered = anwerringquestion;
											first_answer = {
												count: count,
												percent: child.calcPercent(answered),
												id: question.id
											};
											setTimeout(() => {
												count++;
											}, delay);
										} else {
											count++;
										}
									}}
									>nexte Frage
								</Button>
							</div>
						</div>
					</div>
					<div slot="fooder-left" class="flex items-center h-full">
						Frage: <a class="ml-2" href="/question/{question.id}/">{question.id}</a>
						<a href="/question/{question.id}/edit"><Edit class="h-4" /></a>
					</div>
				</Multiplechois1>
			{:else if question.Type == 'TableQuestion'}
				<TabelQuestion
					bind:json_question={question}
					bind:question_count={count}
					bind:anwerringquestion
					bind:anwerdeQuestion={answered}
					bind:showCorrectAnwer
					bind:this={child}
					bind:question_count_max={max_question_count}
				>
					<div slot="fooder-right" class="p-2 pr-10 pl-10">
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
											answered = anwerringquestion;
											first_answer = {
												count: count,
												percent: child.calcPercent(answered),
												id: question.id
											};
										}
									}}>Frage abgeben</Button
								>
								<Button
									on:click={() => {
										if (emptyObject(answered)) {
											answered = anwerringquestion;
											first_answer = {
												count: count,
												percent: child.calcPercent(answered),
												id: question.id
											};
											setTimeout(() => {
												count++;
											}, delay);
										} else {
											count++;
										}
									}}
									>nexte Frage
								</Button>
							</div>
						</div>
					</div>
					<div slot="fooder-left" class="flex items-center h-full">
						Frage: <a class="ml-2" href="/question/{question.id}/">{question.id}</a>
						<a href="/question/{question.id}/edit"><Edit class="h-4" /></a>
					</div>
				</TabelQuestion>
			{:else}
				diese Frage ist unbekant und kann möglicherwerise nur in dev angezeigt werden <Button
					on:click={() => {
						count += 1;
					}}>Nexte Frage</Button
				>
			{/if}
		{:else}
			Läde Fragen, wenn dies nicht verschwindet gehe zu Login und schaue ob du noch eingelogt bist
		{/if}
	</slot>
</section>

<style></style>
