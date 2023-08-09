<script lang="ts">
	import Separator from '$components/ui/separator/Separator.svelte';
</script>

<section class="w-screen h-screen">
	<div class="head-left bg-white">
		<slot name="head-left" />
	</div>
	<div class="head-right bg-slate-100">
		<slot name="head-right" />
	</div>
	<div class="question bg-white">
		<slot name="question">question</slot>
	</div>
	<div class="anwerser bg-slate-100">
		<slot name="anwerser">anwerser</slot>
	</div>
	<div class="centerelement">
		<Separator orientation="vertical" />
	</div>
	<div class="fooder-left bg-white">
		<slot name="fooder-left">fooder-left</slot>
	</div>
	<div class="fooder-right bg-slate-100">
		<slot name="fooder-right">fooder-right</slot>
	</div>
</section>

<style>
	section {
		display: grid;
		grid-template-rows: auto 1fr auto;
		grid-template-columns: 1fr auto 2fr;
		grid-template-areas:
			'head-left center head-right'
			'question center anwerser'
			'fooder-left center fooder-right';
	}

	.centerelement {
		grid-area: center;
	}
	.head-left {
		grid-area: head-left;
	}
	.head-right {
		grid-area: head-right;
	}
	.question {
		grid-area: question;
	}
	.anwerser {
		grid-area: anwerser;
	}
	.fooder-left {
		grid-area: fooder-left;
	}
	.fooder-right {
		grid-area: fooder-right;
	}
	@media print {
		.head-right,
		.anwerser,
		.fooder-right {
			background-color: #fff;
		}
	}
</style>
