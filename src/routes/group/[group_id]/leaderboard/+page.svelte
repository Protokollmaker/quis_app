<script lang="ts">
	import { supabaseClient } from '$lib/func/Clients/supabase';
	export let data;
	async function leaderboard() {
		const res = await supabaseClient
			.from('groupAnswers')
			.select()
			.eq('group', data.data.group_id)
			.order('answersCorrect', { ascending: false })
			.limit(50);
		if (res.error) console.log(res.error);
		console.log(res);
		if (res.data == null) return [];
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
	<h1>Bestenliste</h1>
	{#await leaderboard()}
		läde...
	{:then leaderboards}
		<table>
			<tr class="header">
				<th class="uuid_header">Name</th>
				<th>Falsch</th>
				<th class="owner">Richtig</th>
			</tr>
			{#each leaderboards as leader}
				<tr class="row">
					{#if leader}
						{#await getOwnser(leader.user)}
							<td class="name">läde</td>
						{:then name}
							<td class="name">{name}</td>
						{:catch error}
							<td class="name">???</td>
						{/await}
						<td>{leader.answersWrong}</td>
						<td>{leader.answersCorrect}</td>
					{/if}
				</tr>
			{/each}
		</table>
	{/await}
</section>

<style></style>
