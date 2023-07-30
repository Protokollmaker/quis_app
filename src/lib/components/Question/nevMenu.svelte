<script lang="ts">
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import Katexfix from '$components/smartText/Katexfix.svelte';
	import SmartText from '$components/smartText/smartText.svelte';
	import { Button, buttonVariants } from '$components/ui/button';
	import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '$components/ui/collapsible';
	// @ts-ignore
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$components/ui/dialog';
	import type { anyobject } from '$lib/types/types';
	import { BrainCircuit, FileLineChart, MoreVertical, SkipForward } from 'lucide-svelte';
	export let openMenu: boolean = false;
	export let question: any;
	export let count: number;
	export let flag: anyobject;
	$: console.log(flag);

	const smartText: Array<AdvanstText> = [
		{ redex: /(.*?)[$]{2}(.+?)[$]{2}(.*?)/gm, component: Katexfix }
	];
</script>

<section class="flex justify-end">
	<Collapsible open={openMenu}>
		<CollapsibleTrigger>
			<Button variant="ghost">
				<MoreVertical />
			</Button>
		</CollapsibleTrigger>
		<CollapsibleContent class="absolute right-5 pr-20 mt-2 border rounded-md bg-slate-100">
			<!--2d534efe-67ac-405c-8311-8bad0f89a86b  do it for b1ad5575-b7c4-49b0-9c58-0100f6b72ccb , f95db1b6-5d57-48a3-81f9-bc0530169658-->
			{#if question.explanation && flag.ShowExplenation}
				<Dialog modal={true}>
					<DialogTrigger class={buttonVariants({ variant: 'link' })}>
						<BrainCircuit class="h-4 my-2 mr-2" />
						<div>Lösungsweg anzeigen</div>
					</DialogTrigger>
					<DialogContent class="w-max" style="max-width: 80%;">
						<DialogHeader>
							<DialogTitle>Erklärung der Frage</DialogTitle>
							<!--<DialogDescription></DialogDescription>-->
						</DialogHeader>
						<div class="px-2">
							<SmartText bind:text={question.explanation.text} option={smartText} class="pr-1" />
						</div>
						<!--<DialogFooter><Button type="submit">Schlißen</Button></DialogFooter>-->
					</DialogContent>
				</Dialog><br />
			{/if}
			<Button
				variant="link"
				on:click={() => {
					count += 1;
				}}
			>
				<SkipForward class="h-4 my-2 mr-2" />
				<div>Frage überspringen</div>
			</Button><br />
			<Button
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

<style></style>
