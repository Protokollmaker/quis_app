import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';
import delegateEvents from 'svelte-preprocess-delegate-events/preprocess';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		}),
		preprocess(),
		delegateEvents(),
	],
	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			'$components/*': 'src/lib/components/*'
		}
	},
	shadcn: {
		componentPath: './src/lib/components/ui'
	},
};
export default config;
