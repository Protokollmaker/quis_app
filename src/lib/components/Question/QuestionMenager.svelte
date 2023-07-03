<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import {
		addBookmark,
		hasBookmark,
		questionBookmarks,
		rmBookmark
	} from '$lib/stores/bookmarksQuestion';
	import type { anyobject } from '$lib/types/types';
	import { BookmarkMinus, BookmarkPlus, Edit } from 'lucide-svelte';
	import { emptyObject, mergeObject } from '.';
	import Multiplechois from './Multiplechois.svelte';
	import TabelQuestion from './TabelQuestion.svelte';
	import NavButton from './navButton.svelte';

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

	let anwerringquestion = {};
	let showCorrectAnwer = !emptyObject(answered);
	$: showCorrectAnwer = flag.AutoSolutiononNextButton && !emptyObject(answered);
	let child: any;
</script>

<section>
	<slot>
		{#if question}
			{#if question.Type == 'Multiple choice'}
				<Multiplechois
					bind:selected={anwerringquestion}
					bind:json_question={question}
					bind:question_count={count}
					bind:showCorrectAnwer
					bind:answered
					bind:this={child}
					bind:question_count_max={max_question_count}
				>
					<div slot="fooder-right" class="p-2 pr-10 pl-10">
						<NavButton
							bind:count
							bind:answered
							bind:anwerringquestion
							bind:first_answer
							bind:child
							bind:question
							bind:showCorrectAnwer
						/>
					</div>
					<div slot="fooder-left" class="flex items-center h-full text-muted-foreground">
						Frage: <a class="ml-2" href="/question/{question.id}/">{question.id}</a>
						<a href="/question/{question.id}/edit"><Edit class="h-4 m-2" /></a>
						{#if hasBookmark($questionBookmarks, question.id, 'Gespeicherte Fragen')}
							<Button
								variant="ghost"
								on:click={() => {
									questionBookmarks.set(
										rmBookmark($questionBookmarks, question.id, 'Gespeicherte Fragen')
									);
								}}
								><BookmarkMinus class="h-4 m-2" />
							</Button>
						{:else}
							<Button
								variant="ghost"
								on:click={() => {
									questionBookmarks.set(
										addBookmark($questionBookmarks, question.id, 'Gespeicherte Fragen')
									);
								}}
								><BookmarkPlus class="h-4 m-2" />
							</Button>
						{/if}
					</div>
				</Multiplechois>
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
						<NavButton
							bind:count
							bind:answered
							bind:anwerringquestion
							bind:first_answer
							bind:child
							bind:question
							bind:showCorrectAnwer
						/>
					</div>
					<div slot="fooder-left" class="flex items-center h-full">
						Frage: <a class="ml-2" href="/question/{question.id}/">{question.id}</a>
						<a href="/question/{question.id}/edit"><Edit class="h-4 m-2" /></a>
					</div>
				</TabelQuestion>
			{:else}
				diese Frage ist unbekant und kann möglicherwerise nur in dev angezeigt werden <Button
					on:click={() => {
						count += 1;
					}}>nächste Frage</Button
				>
			{/if}
		{:else}
			Läde Fragen, wenn dies nicht verschwindet gehe zu Login und schaue ob du noch eingelogt bist
		{/if}
	</slot>
</section>

<style></style>
