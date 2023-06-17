<script lang="ts">
	import SupabaseImage from '$lib/components/image/imageSupabase.svelte';
	import { Edit } from 'lucide-svelte';
	import Button from './ui/button/Button.svelte';
	export let question: any;
	export let question_num: number = 0;
	export let question_num_max: number = Infinity;
	let selected = -1;
	let endet = false;
	export let anwerser: any;
	export let first_anwnser_correct: null | any;
</script>

<section class="w-screen">
	<div class="header">
		<slot name="header" />
	</div>
	<div class="fooder">
		<slot name="fooder">
			Frage: <a href="/question/{question.id}/">{question.id}</a>
			<a href="/question/{question.id}/edit"><Edit class="h-4" /></a>
		</slot>
	</div>
	<div class="question">
		<div>
			<h3>Frage {question_num + 1}/{question_num_max}</h3>
			{#if question.question.hasOwnProperty('text')}
				<h2>{question.question.text}</h2>
			{/if}
			{#if question.question.hasOwnProperty('filepath')}
				<SupabaseImage
					bind:image_src={question.question.filepath}
					bucket={'Question images'}
					bind:alt={question.question.alt}
				/>
			{/if}
		</div>
	</div>
	<div class="center">
		<div class="vl" />
	</div>
	<div class="answers">
		<div class="center">
			{#each question.answers.answers as answer, i}
				<div
					class="
					{i == question.validation.validation && anwerser?.anwnsered != null ? 'correctAnwerser' : ''}
					{anwerser?.anwnsered == i && i != question.validation.validation ? 'anwnsered' : ''}
				"
				>
					<input
						type="radio"
						id={'answer' + i}
						class="answer-radio"
						name="answer"
						value={i}
						bind:group={selected}
					/>
					<label class="answer" for={'answer' + i} id={'answer' + i + 'label'}>
						<div class="number"><span>{i + 1}</span></div>
						{#if answer.hasOwnProperty('text')}
							<div class="text">{answer.text}</div>
						{/if}
						{#if answer.hasOwnProperty('filepath')}
							<diV class="img">
								<SupabaseImage
									bind:image_src={answer.filepath}
									bucket={'Question images'}
									bind:alt={answer.alt}
								/>
							</diV>
						{/if}
					</label>
				</div>
			{/each}
		</div>
	</div>

	<div class="footer flex justify-between">
		<div>
			<Button
				variant="boarder"
				on:click={() => {
					question_num--;
				}}>vorherige Frage</Button
			>
		</div>
		<div>
			<Button
				variant="boarder"
				on:click={() => {
					if (anwerser != null) return 0;
					anwerser = { anwnsered: selected };
					first_anwnser_correct = {
						correct: selected == question.validation.validation,
						id: question.id
					};
				}}>Frage abgeben</Button
			>
			<Button
				style={endet ? 'background-color: #1d5d86;' : ''}
				on:click={() => {
					if (endet == true) return;
					endet = true;
					if (anwerser == null) {
						anwerser = { anwnsered: selected };
						first_anwnser_correct = {
							correct: selected == question.validation.validation,
							id: question.id
						};
						setTimeout(() => {
							question_num++;
							selected = -1;
							endet = false;
						}, 1000);
					} else {
						question_num++;
						selected = -1;
						endet = false;
					}
				}}>nexte Frage</Button
			>
		</div>
	</div>
	<div class="empty" />
</section>

<style>
	:global(body) {
		margin: 0px;
	}
	.anwnsered {
		background-color: #cd6155;
	}
	.correctAnwerser {
		background-color: #45b39d;
	}
	* {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
	#answer0:checked ~ #answer0label .number {
		background-color: var(--main-aktion);
		color: #ffffff;
	}
	#answer1:checked ~ #answer1label .number {
		background-color: var(--main-aktion);
		color: #ffffff;
	}
	#answer2:checked ~ #answer2label .number {
		background-color: var(--main-aktion);
		color: #ffffff;
	}
	#answer3:checked ~ #answer3label .number {
		background-color: var(--main-aktion);
		color: #ffffff;
	}
	#answer4:checked ~ #answer4label .number {
		background-color: var(--main-aktion);
		color: #ffffff;
	}
	.answer-radio {
		position: absolute;
		display: none;
	}
	h3 {
		position: absolute;
		transform: translate(0px, -25px);
		color: #5f6a6a;
	}
	.answers {
		height: 100%;
		display: flex;
		align-items: center;
	}
	.answer .img {
		height: 12vh;
		margin-left: 10px;
	}
	.answer {
		display: flex;
		padding: 2%;
		width: 70%;
	}
	.center {
		width: 100%;
	}
	.answer .text {
		width: fit-content;
		margin-left: 10px;
		margin-top: 5px;
		width: 100%;
	}
	.answer .number {
		min-width: 25px;
		text-align: center;
		height: 25px;
		width: 25px;
		border-radius: 20px;

		color: #000000;

		border: 1px solid var(--main-aktion);
	}
	section {
		--main-bg-color1: #ffffff;
		--main-bg-color2: #f6f6f6;
		--main-vl-color: #d7d7d7;
		--main-aktion: #154360;
		padding: 0px;
		margin: 0px;
		display: grid;
		grid-template-rows: 5vh 1fr auto;
		grid-template-columns: 10fr 2fr 20fr;
		grid-template-areas:
			'header center empty'
			'question center answers'
			'fooder center footer';
		height: 100vh;
	}
	.fooder {
		grid-area: fooder;
	}
	.header {
		grid-area: header;
		background-color: var(--main-bg-color1);
	}
	.empty {
		grid-area: empty;
		background-color: var(--main-bg-color2);
	}
	.question {
		grid-area: question;
		background-color: var(--main-bg-color1);
	}
	.center {
		grid-area: center;
		background-color: var(--main-bg-color2);
	}
	.answers {
		grid-area: answers;
		background-color: var(--main-bg-color2);
	}
	.footer {
		grid-area: footer;
		background-color: var(--main-bg-color2);
	}
	:global(body) {
		padding: 0px;
		margin: 0px;
		height: 100vh;
	}
	.vl {
		border-right: 1px solid var(--main-vl-color);
		width: 50%;
		background-color: var(--main-bg-color1);
		height: 100vh;
	}

	.footer {
		display: flex;
		padding-left: 0px;
		padding-right: 5%;
		padding-bottom: 1%;
		min-height: min-content;
	}

	.question {
		padding-left: 5%;
		padding-right: 5%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: Arial, Helvetica, sans-serif;
	}
</style>
