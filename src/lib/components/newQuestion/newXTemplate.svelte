<script lang="ts">
	type XTempalteArrayType = {
		[key: string]: {
			wert:
				| Array<{
						pattern: string;
						filepath: string | undefined;
						sampleSolution: string | undefined;
						anwser: string | undefined;
						anwser_filepath: string | undefined;
				  }>
				| [];
			befor: string | undefined;
			after: string | undefined;
		};
	};
	let XTemplateNames: Array<string> = [];
	let XTemplateArray: any = [];
	let XTemplateImage: Array<any> = [];
</script>

<section />

<style></style>
