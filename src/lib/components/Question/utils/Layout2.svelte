<script lang="ts">
</script>

<section class="no-bracke">
	<div class="flex">
		<div class="w-full">
			<slot name="head-left" />
		</div>
		<div class="w-full">
			<slot name="head-right" />
		</div>
	</div>
	<div class="question bg-white">
		<slot name="question">question</slot>
	</div>
	<div class="anwerser">
		<slot name="anwerser">anwerser</slot>
	</div>
	<div class="flex">
		<div class="w-full">
			<slot name="fooder-left">fooder-left</slot>
		</div>
		<div class="w-full">
			<slot name="fooder-right">fooder-right</slot>
		</div>
	</div>
</section>

<style>
	.no-bracke {
		break-inside: avoid;
		print-color-adjust: exact;
	}
</style>
