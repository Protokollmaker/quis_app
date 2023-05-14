<script lang="ts">
	import SupabaseImage from '$lib/components/image/imageSupabase.svelte';
	import { getContext } from 'svelte';
	export let question: any;
	let question_num: number = 1;
	let question_num_max: number = Infinity;
	let selected = -1;

	let anwserGiven: undefined | number = undefined;
	let awnserOnFirstCheck: boolean | undefined = undefined;
	function showAwnser() {
		if (awnserOnFirstCheck != undefined) return awnserOnFirstCheck;
		var div = document.getElementById('answer' + selected + 'label');
		if (div != undefined) {
			div.style.backgroundColor = '#CD6155';
		}
		div = document.getElementById('answer' + question.validation.validation + 'label');
		if (div != undefined) {
			div.style.backgroundColor = '#45B39D';
		}
		awnserOnFirstCheck = selected == question.validation.validation ? true : false;
		anwserGiven = selected;
		return awnserOnFirstCheck;
	}
	let buttoncontroll: any;
	buttoncontroll = getContext('buttoncontroll');

	function nexteQuestoin() {
		if (selected == -1) return;
		let is_true = showAwnser();
		question_num += 1;
		buttoncontroll.buttonNextQuestion(is_true, anwserGiven);
		awnserOnFirstCheck = undefined;
		selected = -1;
	}
</script>

<section>
	<div class="header">
		<slot name="header" />
	</div>
	<div class="fooder">
		<slot name="fooder" />
	</div>
	<div class="question">
		<div>
			<h3>Frage {question_num}/{question_num_max}</h3>
			{#if question.question.hasOwnProperty('text')}
				<h2>{question.question.text}</h2>
			{/if}
			{#if question.question.hasOwnProperty('filepath')}
				<SupabaseImage
					image_src={question.question.filepath}
					bucket={'Question images'}
					alt={question.question.alt}
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
						<SupabaseImage
							image_src={question.question.filepath}
							bucket={'Question images'}
							alt={question.question.alt}
						/>
					{/if}
				</label>
			{/each}
		</div>
	</div>

	<div class="footer">
		<button class="button-side-aktion    button-prev">vorherige Frage</button>
		<button class="button-side-aktion    button-show-awnser" on:click={showAwnser}
			>Frage abgeben</button
		>
		<button class="button-call-to-aktion button-next" on:click={nexteQuestoin}>nexte Frage</button>
	</div>
	<div class="empty" />
</section>

<style>
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
	.answer img {
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
	.number span {
		position: relative;
		top: 15%;
	}
	.button-show-awnser {
		margin-left: auto;
		margin-right: 1%;
	}
	section {
		--main-bg-color1: #ffffff;
		--main-bg-color2: #f6f6f6;
		--main-vl-color: #d7d7d7;
		--main-aktion: #154360;
		padding: 0px;
		margin: 0px;
		display: grid;
		grid-template-rows: 5vh auto 5vh;
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

	button {
		border: none;
		border-radius: 2px;
		padding: 1% 2% 1% 2%;
		min-height: fit-content;
	}

	.button-side-aktion {
		border: 1px solid var(--main-aktion);
		background-color: transparent;
	}

	.button-call-to-aktion {
		border: 1px solid var(--main-aktion);
		background-color: var(--main-aktion);
		color: #ffffff;
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
