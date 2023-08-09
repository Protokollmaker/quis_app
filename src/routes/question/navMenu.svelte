<script lang="ts">
	import { goto } from '$app/navigation';
	import PrintQuestion from '$components/Question/utils/printQuestion.svelte';
	import { Button } from '$components/ui/button';
	import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '$components/ui/collapsible';
	import { FileLineChart, MoreVertical, MoveDiagonal } from 'lucide-svelte';
	let openMenu = false;
	export let questionIDs: Array<string> = [];
</script>

<section class="flex justify-start">
	<Collapsible open={openMenu}>
		<CollapsibleTrigger>
			<Button variant="ghost">
				<MoreVertical />
			</Button>
		</CollapsibleTrigger>
		<CollapsibleContent class="absolute left-5 pr-20 mt-2 border rounded-md bg-slate-50 z-10">
			<PrintQuestion
				variant="link"
				bind:questionIDs
				className="text-primary hover:underline underline-offset-4"
				name="Diese Seite Drucken"
			/><br />
			<Button
				variant="link"
				on:click={() => {
					goto('/question/inarray?questionsID=' + JSON.stringify(questionIDs));
				}}
			>
				<MoveDiagonal class="h-4 my-2 mr-2" />
				Diese Seite Beantworten
			</Button><br />
			<Button
				class=""
				variant="link"
				on:click={() => {
					goto('/user');
				}}
			>
				<FileLineChart class="h-4 my-2 mr-2" />
				<div>Zur Stratseite</div>
			</Button>
		</CollapsibleContent>
	</Collapsible>
</section>

<style>
</style>
