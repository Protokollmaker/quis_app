<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import {
		ArrowDown01,
		Book,
		BookPlus,
		ExternalLink,
		FileQuestion,
		LayoutList,
		PlusCircle,
		Settings2,
		Shuffle
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	//import type { PageData } from './$types';
	export let data: any;
	let userid = undefined;
	let user: any = undefined;
	let userfecht = false;
	onMount(async () => {
		// todo Backend auth so the sidie don't get loaded on login
		if (!data.session) {
			goto('/');
		} else {
			userid = data.session?.user.id;
			user = await supabaseClient.from('User').select().eq('user_id', userid).limit(1).single();
			if (user.error) {
				goto('/user/new');
			}
			console.log(user);
			user = user.data;

			userfecht = true;
		}
	});
</script>

<section>
	{#if userfecht}
		<h1>Welcome, {user?.Name}</h1>
	{/if}
	<div>
		<div class="flex items-center underline p-1">
			<Settings2 class="p-1" /><a href="/user/settings" class="text-slate-800">Einstellungen</a>
		</div>
		<div class="flex items-center underline p-1">
			<FileQuestion class="p-1" /><a class="text-slate-800" href="/question">Fragen</a>
		</div>
		<div class="flex items-center underline p-1">
			<PlusCircle class="p-1" /><a class="text-slate-800" href="/question/new">Neue Fragen</a>
		</div>
		<div class="flex items-center underline p-1">
			<Shuffle class="p-1" /><a class="text-slate-800" href="/question/random">Zufällige Frage</a>
		</div>
		<div class="flex items-center underline p-1">
			<LayoutList class="p-1" /><a class="text-slate-800" href="/question/notdone"
				>noch nicht bearbeitete Fragen</a
			>
		</div>
		<div class="flex items-center underline p-1">
			<ArrowDown01 class="p-1" /><a class="text-slate-800" href="/question/ascpercent"
				>Frage nach Prozenten sotiert beginnend mit der niedrigsten</a
			>
		</div>
		<div class="flex items-center underline p-1">
			<Book class="p-1" /><a class="text-slate-800" href="/group">Gruppe</a>
		</div>
		<div class="flex items-center underline p-1">
			<BookPlus class="p-1" /><a class="text-slate-800" href="/group/new">Neue Gruppe</a>
		</div>
		<div class="flex items-center underline p-1">
			<ExternalLink class="p-1" /><a class="text-slate-800" href="/">Zur Statseite</a>
		</div>
	</div>
</section>

<style>
</style>
