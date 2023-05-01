<script>
        import { onMount } from 'svelte';

    let jsonData;

    onMount(async () => {
    const response = await fetch('../template.json');
    jsonData = await response.json();
    console.log(jsonData);
    });
</script>

<h1>Welcome to SvelteKit</h1>
<img src="../image/hero.png" alt=""/>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
