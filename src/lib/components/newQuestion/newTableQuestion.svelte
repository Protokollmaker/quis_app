<script lang="ts">
	type TabelRowType = {
		text: string;
		filepath: string | undefined;
		alt: string | undefined;
	};
	type TabelColumnsType = {
		text: string;
	};
	let TabelRows: Array<TabelRowType> = [];
	let TabelColumns: Array<TabelColumnsType> = [];
	let TableType = 'checkbox';
	let TabelValiation: any = {};
	let TabelesRowsImages: Array<any> = [];
	let TabelesRowsImagesPath: Array<string> = [];
	$: console.log(TabelesRowsImagesPath);
</script>

<section />

<style></style>
