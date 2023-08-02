<script lang="ts">
	    export let ready: boolean = false;
    export let url: string ="/";
    export let child: any;
    function printReady() {
		ready = true;
	}
    function resetReady(url:string){
        ready = false;
    }
    $: resetReady(url)
</script>

<iframe
    bind:this={child}
    class="hidden"
    src={url}
    title="print"
    name="printf"
    id="printf"
    on:load={printReady}
/>

<style></style>