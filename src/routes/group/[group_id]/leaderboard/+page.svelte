<script lang="ts">
	import { supabaseClient } from '$lib/supabase';
	export let data;
	async function leaderboard() {
		const res = await supabaseClient.from('groupAnswers').select().eq('group', data.data.group_id);
		if (res.error) console.log(res.error);
		console.log(res);
		return res.data;
	}
	async function getOwnser(uuid: any) {
		const res = await supabaseClient
			.from('User')
			.select('Name')
			.eq('user_id', uuid)
			.limit(1)
			.single();
		if (res.data) return res.data.Name;
		return '???';
	}
</script>

<section>
	Leaderboard<br />
	{#await leaderboard()}
		läde...
	{:then leaderboards}
		{#each leaderboards as leader}
			{#if leader}
				{#await getOwnser(leader.user)}
					läde
				{:then name}
					{name}
				{:catch error}
					"???"
				{/await}
				Falsch:{leader.answersWrong}
				Richtig: {leader.answersCorrect}<br />
			{/if}
		{/each}
	{/await}
</section>

<style></style>
