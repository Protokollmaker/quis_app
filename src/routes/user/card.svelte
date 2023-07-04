<script lang="ts">
	import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$components/ui/tooltip';
	export let tooltip: string = 'Standrd tooltip';
</script>

<section class="rounded-lg border bg-card text-card-foreground shadow-sm bg p-2 h-full">
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger class="text-left w-full h-full">
				<div class="text-primary">
					<slot name="icon" />
				</div>
				<div class="text-sm">
					<slot name="name" />
				</div>
				<div class="text-lg align-baseline">
					<slot name="numbers" />
				</div>
			</TooltipTrigger>
			<TooltipContent>
				<p>{tooltip}</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
</section>

<style>
	.bg {
		background-color: #fafafa;
	}
</style>
