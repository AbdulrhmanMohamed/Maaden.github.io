import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: { 
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: false
		}),
		paths: {
			base: '/maaden-constructions'
		},
		alias:{
		$lib: 'src/lib',
		$assets: 'src/lib/assets',
		$components: 'src/lib/components',
		$data: 'src/lib/data',
		$hooks: 'src/lib/hooks',
		$utils: 'src/lib/utils',
		$styles: 'src/lib/styles',
		$routes: 'src/routes',
	}}
};

export default config;
