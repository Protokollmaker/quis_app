<script lang="ts"></script>

<section class="rounded-lg border bg-card text-card-foreground shadow-sm bg p-2 h-full">
	<div class="text-primary">
		<slot name="icon" />
	</div>
	<div class="text-sm">
		<slot name="name" />
	</div>
	<div class="text-lg">
		<slot name="numbers" />
	</div>
</section>

<style>
	.bg {
		background-color: #fafafa;
	}
</style>
