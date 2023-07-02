<script lang="ts">
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$components/ui/table';
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
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead class="text-right">Falsch</TableHead>
					<TableHead class="text-right">Richtig</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each leaderboards as leader}
					<TableRow>
						{#if leader}
							{#await getOwnser(leader.user)}
								<TableCell>läde</TableCell>
							{:then name}
								<TableCell>{name}</TableCell>
							{:catch error}
								<TableCell>???</TableCell>
							{/await}
							<TableCell class="text-right">{leader.answersWrong}</TableCell>
							<TableCell class="text-right">{leader.answersCorrect}</TableCell>
						{/if}
					</TableRow>
				{/each}
			</TableBody>
		</Table>
	{/await}
</section>

<style></style>
