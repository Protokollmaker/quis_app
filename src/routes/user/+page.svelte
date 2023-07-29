<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabaseClient } from '$lib/func/Clients/supabase';
	import { getBookmarkColection, questionBookmarks } from '$lib/stores/bookmarksQuestion';
	import {
		getAvarageQuestionPercente,
		getQuestionsDoneNum,
		questionData
	} from '$lib/stores/questionPercent';
	import {
		BarChart3,
		Book,
		BookPlus,
		Bookmark,
		CircleOff,
		Combine,
		ExternalLink,
		Eye,
		FileQuestion,
		PlusCircle,
		Settings2,
		Shuffle
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import Card from './card.svelte';
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
			user = user.data;

			userfecht = true;
		}
	});

	async function getQuestionCount() {
		const res = await supabaseClient.rpc('helper_questions_count');
		return res.data;
	}
</script>

<section>
	{#if userfecht}
		<h1 class="p-2">Welcome, {user?.Name}</h1>
	{/if}
	<div class="flex flex-wrap fcostom2">
		<a href="/question/notdone" class="min-h-fit fcostom">
			<div class="p-2 h-full">
				<Card tooltip={'Fragen die du noch nicht Absolviert hast'}>
					<Eye slot="icon" class="h-5" />
					<div slot="name">Gesehenen Fragen</div>
					<div slot="numbers">
						{get(questionData).length} /
						{#await getQuestionCount()}
							???
						{:then count}
							{count}
						{/await}
					</div>
				</Card>
			</div>
		</a>
		<a href="/question/random" class="min-h-fit fcostom">
			<div class="p-2 h-full">
				<Card tooltip={'Zuflällige fragen'}>
					<BarChart3 slot="icon" class="h-5" />
					<div slot="name">Fragen Beantwortet</div>
					<div slot="numbers">
						{getQuestionsDoneNum(get(questionData))}
					</div>
				</Card>
			</div>
		</a>
		<a href="question/bookmark/Gespeicherte Fragen" class="min-h-fit fcostom"
			><div class="p-2 h-full">
				<Card tooltip={'Fragen die du Gespeichert hast'}>
					<Bookmark slot="icon" class="h-5" />
					<div slot="name">Gespeicherte Fragen</div>
					<div slot="numbers">
						{getBookmarkColection(get(questionBookmarks), 'Gespeicherte Fragen').length}
					</div>
				</Card>
			</div></a
		>
		<a href="/question/ascpercent" class="min-h-fit fcostom">
			<div class="p-2 h-full">
				<Card tooltip={'Fragen sotiert nach Prozenten beginend mit der Niedrigsten'}>
					<CircleOff slot="icon" class="h-5 rotate-90" />
					<div slot="name">Durchschnitts</div>
					<div slot="numbers">
						⌀{(getAvarageQuestionPercente(get(questionData)) * 100).toFixed(1)}%
					</div>
				</Card>
			</div>
		</a>
	</div>
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
			<Combine class="p-1" /><a class="text-slate-800" href="/question/unic"
				>Zuflällige Fragen aber ausgeschlossen fragen die du auf der seite bearbeitet hast
			</a>
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
	:global(body) {
		width: 100%;
	}
	.fcostom {
		flex-basis: 0;
		flex-grow: 1;
	}
</style>
