<script lang="ts">
	export let label: string;
	export let value: string;
</script>

<label>
  {label} : 
  <input on:*  bind:value />
</label>

<style>
</style>