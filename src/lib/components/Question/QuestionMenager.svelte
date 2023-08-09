<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import {
		addBookmark,
		hasBookmark,
		questionBookmarks,
		rmBookmark
	} from '$lib/stores/bookmarksQuestion';
	import type { conntroll } from '$lib/stores/questionStore';
	import type { anyobject } from '$lib/types/types';
	import { BookmarkMinus, BookmarkPlus, Edit } from 'lucide-svelte';
	import { mergeObject } from '.';
	import Multiplechois from './Multiplechois.svelte';
	import TabelQuestion from './TabelQuestion.svelte';
	import TextareaQuestion from './TextareaQuestion.svelte';
	import ClozeArrayQuestion from './clozeArrayQuestion.svelte';
	import DefalteQuestion from './defalteQuestion.svelte';
	import NavButton from './navButton.svelte';
	import NavMenu from './nevMenu.svelte';
	import Layout1 from './utils/Layout1.svelte';
	// this is hier to mange the display of questions

	// input json form database
	export let question: any = undefined;
	// output number of question alrady anwerde
	export let count: number = 0;
	export let max_question_count: number = Infinity;

	export let layout = {
		layout: Layout1,
		questiontext: '',
		anwersertext: '',
		questionimg: 'max-height: 400px;',
		anwerserimg: 'max-height: 10vh; height: 10vh;',
		anwerserdistens: 'padding: 2%;'
	};
	$: answered == null ? {} : answered;
	// output changes when question anwerder fist time
	export let first_answer: any = undefined;
	/////////////////////////////////////////////////////////////////

	export let flags: {
		ShowNextButton?: boolean;
		ShowPrevButton?: boolean;
		AutoSolutiononNextButton?: boolean;
		ShowExplenation?: boolean;
		alwaysShowAnwerser?: boolean;
	} = {};
	let flag = mergeObject(
		{
			ShowNextButton: true,
			ShowPrevButton: true,
			AutoSolutiononNextButton: true,
			ShowExplenation: true,
			alwaysShowAnwerser: false
		},
		flags
	);
	// input/output is not null if question was alrady answered
	export let answered: anyobject = {};
	export let conntrolls: conntroll = {
		showAnswerser: false,
		delivered: false,
		lockInput: false,
		percent: 0
	};
	const questions = [
		{ type: 'default', component: DefalteQuestion },
		{ type: 'Multiple choice', component: Multiplechois },
		{ type: 'TableQuestion', component: TabelQuestion },
		{ type: 'Textarea', component: TextareaQuestion },
		{ type: 'clozeArray', component: ClozeArrayQuestion }
	];

	function getComponent(options: typeof questions, type: string) {
		const result = options.findIndex((item) => item.type === type);
		if (result == -1) return options[0].component;
		return options[result].component;
	}

	$: conntrolls.showAnswerser = flag.alwaysShowAnwerser || conntrolls.delivered;
	let child: any;
</script>

<section>
	<slot>
		{#if question}
			<svelte:component
				this={getComponent(questions, question.Type)}
				bind:layout
				bind:selected={answered}
				bind:json_question={question}
				bind:question_count={count}
				bind:conntrolls
				bind:this={child}
				bind:question_count_max={max_question_count}
			>
				<div slot="head-right" class="head-right-nav py-2 px-8">
					<NavMenu bind:question bind:count bind:flag />
				</div>
				<div slot="fooder-right" class="fooder-right-nav p-2 pr-10 pl-10">
					<NavButton
						bind:flag
						bind:count
						bind:answered
						bind:first_answer
						bind:child
						bind:question
						bind:question_conntroll={conntrolls}
					/>
				</div>
				<div slot="fooder-left" class="flex items-center h-full text-muted-foreground">
					Frage: <a class="ml-2" href="/question/{question.id}/">{question.id}</a>
					<a href="/question/{question.id}/edit" class="edit"><Edit class="h-4 m-2" /></a>
					<div class="bookmark">
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
				</div>
			</svelte:component>
		{:else}
			Läde Fragen, wenn dies nicht verschwindet gehe zu Login und schaue ob du noch eingelogt bist
		{/if}
	</slot>
</section>

<style>
	@media print {
		.fooder-right-nav,
		.head-right-nav,
		.edit,
		.bookmark {
			display: none;
		}
	}
</style>
