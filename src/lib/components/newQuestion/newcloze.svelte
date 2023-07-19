<script lang="ts">
	import ImageSupabase from '$components/image/imageSupabase.svelte';
	import Checkbox from '$components/ui/checkbox/Checkbox.svelte';
	import FileInput from '$components/ui/input/FileInput.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import Textarea from '$components/ui/textarea/Textarea.svelte';

	export function serialize() {}
	export function deserialize() {}
	export function clear() {}

	export let userid: string | null | undefined;
	let question = { text: undefined, alt: undefined, path: undefined };
	let questionImg: Array<File> = [];
	// TODO questionImg -> question.path
	let anwerer = { text: undefined };
	let anwereroptions: Array<any> = [];
	$: anwereroptions = xTemplateGetVars(anwerer.text);
	function xTemplateGetVars(text: string | undefined) {
		if (text == undefined) return [];
		let regex = /^.*?([{]{2}(.+?)[}]{2}).*?$/gm;
		let match: RegExpExecArray | null;
		let Names: Array<string> = [];
		while ((match = regex.exec(text))) {
			const placeholder = match[1];
			Names.push(placeholder);
		}

		if (Names == null) return [];
		return Names;
	}
</script>

<section>
	<h1>Unfertig</h1>
	<h2 class="mb-2">Frage</h2>
	<Textarea placeholder="Schreibe hier diene Frage herein" bind:value={question.text} />
	<div class="flex mt-2 mb-5 gap-2">
		<Input type="text" placeholder="alternertiver text" bind:value={question.alt} />
		<FileInput
			accept="image/png, image/jpeg"
			bind:files={questionImg}
			id="avatar"
			name="avatar"
			type="file"
		/>
	</div>
	<div class="imageSize">
		<ImageSupabase image_src={question.path} bucket={'Question images'} alt={''} />
	</div>
	<h2 class="mb-2">Lückentext</h2>
	<Textarea
		placeholder="Schreibe hier den Lückentext herein &#123;&#123; Lücke hier &#125;&#125; Achtung es ist nur eines per linie erlaubt"
		bind:value={anwerer.text}
	/>
	{#each anwereroptions as anwereroption}
		<div>
			<Label>{anwereroption.name}</Label><br />

			<div class="flex content-center my-2">
				<Checkbox />
				<Label class="mx-2">Nutzer darf validation überschreiben</Label>
			</div>
			<div class="flex gap-2">
				<div class="w-full">
					<Label class="my-2">Gebe ein was der Nutzer als Lösung angezeigt bekommen soll:</Label>
					<Textarea />
				</div>
				<div class="w-full">
					<Label class="my-2">Gebe deine Validation ein:</Label>
					<div class="flex gap-2">
						<Input />
						<select name="valedation">
							<option value={'redex'}>redex</option>
							<option value={'istext'}>ist text</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	{/each}
</section>

<style></style>
