<script lang="ts">
	import NewQuestionMenager from '$components/newQuestion/NewQuestionMenager.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<NewQuestionMenager {data} questionID={data.data.question_id} />

<style></style>
