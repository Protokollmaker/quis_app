<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let pageSize = 10;
	let offset: number = 0;
	let groups: any = [];
	async function load(offset: number) {
		console.log('res.data');
		if (offset < 0) {
			offset = 0;
		}
		const res = await supabaseClient
			.from('group')
			.select()
			.range(offset, offset + pageSize - 1);
		if (res.error) console.log(res.error);
		groups = res.data;
	}
	$: {
		load(offset);
	}

	onMount(async () => {
		// todo Backend auth so the sidie don't get loaded on login
		if (!data.session) {
			goto('/');
		}
	});
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
	<h1>Alle Gruppen</h1>
	<table>
		<tr class="header">
			<th class="uuid_header">uuid</th>
			<th>Title</th>
			<th class="owner">Ersteller</th>
		</tr>
		{#each groups as group}
			<tr class="row">
				<td class="questionID"> <span class="ID_span">{group.id.substring(0, 8)}</span></td>
				<td class="title"><a href="/group/{group.id}">{group.title}</a></td>
				<td class="owner">
					{#await getOwnser(group.created_by)}
						läde
					{:then name}
						{name}
					{:catch error}
						"???"
					{/await}
				</td>
			</tr>
		{/each}
	</table>
</section>

<style></style>
