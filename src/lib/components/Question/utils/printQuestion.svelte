<script lang="ts">
    import { Button, buttonVariants } from '$components/ui/button';
    import {
    	Dialog,
    	DialogContent,
    	DialogFooter,
    	DialogHeader,
    	DialogTitle,
    	DialogTrigger
    } from '$components/ui/dialog';
    import Label from '$components/ui/label/Label.svelte';
    import { Printer } from 'lucide-svelte';
    import PrintSite from './printSite.svelte';
    export const variant: "link" | "default" | "destructive" | "outline" | "boarder" | "secondary" | "ghost" = "ghost";
    export let questionIDs: Array<string> = [];
    export let className: string = "";
    export let name: string = "Drucken";

    let printUrl = '/';
	let print_solution = 'false';
	let print_Layout = 'Layout3';
	function printurl(print_Layout: string, print_solution: string, questionIDs: any) {
		let stringQuestionID = JSON.stringify(questionIDs);
		printUrl = `/question/print/${print_Layout}/${print_solution}?questionsID=${stringQuestionID}`;
	}
	$: printurl(print_Layout, print_solution, questionIDs);
	let print_ready: boolean;
    let printsite: any;
</script>

<Dialog modal={true}>
    <DialogTrigger class="{buttonVariants({ variant: variant })} {className}">
        <Printer class="h-4 my-2 mr-2" />
        <div>{name}</div>
    </DialogTrigger>
    <DialogContent class="w-max" style="max-width: 80%;">
        <DialogHeader>
            <DialogTitle class="flex gap-2 items-center justify-start">
                <Printer class="h-4 my-2" />
                <div>{name}</div>
            </DialogTitle>
            <!--<DialogDescription></DialogDescription>-->
        </DialogHeader>
        <div class="px-2">
            <PrintSite bind:ready={print_ready} bind:url={printUrl} bind:child={printsite}/>
            <div class="flex gap-2 items-center py-1">
                <Label>Ansicht:</Label>
                <select name="Layout" id="Layout" bind:value={print_Layout}>
                    <option value="Layout3">Kleines Grid &#40;empfohlen&#41;</option>
                    <option value="Layout2">Horizontale Ansicht</option>
                    <option value="Layout1">Web Ansicht &#40;nicht empfohlen&#41;</option>
                </select>
            </div>
            <div class="flex gap-2 items-center py-1">
                <Label>Lösung:</Label>
                <select name="solution" id="solution" bind:value={print_solution}>
                    <option value="false"> Nein</option>
                    <option value="true">Ja</option>
                </select>
            </div>
        </div>
        <DialogFooter>
            {#if print_ready}
                <Button
                    on:click={() => {
                        console.log(printsite)
                        printsite.focus();
                        printsite.contentWindow.print();
                    }}>Drucken</Button
                >
            {/if}
        </DialogFooter>
    </DialogContent>
</Dialog>

<style></style>