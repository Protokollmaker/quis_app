<script lang="ts">
	import Separator from '$components/ui/separator/Separator.svelte';
</script>

<section class="w-full h-full no-bracke">
	<div class="head-left bg-white">
		<slot name="head-left" />
	</div>
	<div class="head-right">
		<slot name="head-right" />
	</div>
	<div class="question bg-white">
		<slot name="question">question</slot>
	</div>
	<div class="anwerser">
		<slot name="anwerser">anwerser</slot>
	</div>
	<div class="centerelement">
		<Separator orientation="vertical" />
	</div>
	<div class="fooder-left bg-white">
		<slot name="fooder-left">fooder-left</slot>
	</div>
	<div class="fooder-right">
		<slot name="fooder-right">fooder-right</slot>
	</div>
	<div class="horizontal-bar">
		<Separator orientation="horizontal" />
	</div>
</section>

<style>
	section {
		display: grid;
		grid-template-rows: auto auto auto auto;
		grid-template-columns: 40% auto 60% auto;
		grid-template-areas:
			'head-left center head-right'
			'question center anwerser'
			'fooder-left center fooder-right'
			'horizontal-bar horizontal-bar horizontal-bar';
	}

	.centerelement {
		grid-area: center;
	}
	.horizontal-bar {
		grid-area: horizontal-bar;
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

	.no-bracke {
		break-inside: avoid;
		print-color-adjust: exact;
	}
</style>
