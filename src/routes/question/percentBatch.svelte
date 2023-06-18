<script lang="ts">
	import Badge from '$components/ui/badge/Badge.svelte';
	export let percent: number | null;
	type badges =
		| 'default'
		| 'secondary'
		| 'destructive'
		| 'outline'
		| 'tag'
		| 'green'
		| 'yellow'
		| 'red'
		| null
		| undefined;
	let badge: badges = 'tag';
	function bageColor(percent: number | null) {
		if (percent == null) {
			badge = 'tag';
		} else if (percent * 100 > 85) {
			badge = 'green';
		} else if (percent * 100 > 40) {
			badge = 'yellow';
		} else {
			badge = 'red';
		}
	}
	$: bageColor(percent);
</script>

<Badge variant={badge}>{percent ? (percent * 100).toFixed(1) : (0).toFixed(1)}%</Badge>

<style></style>
