import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: './src/app',
	ssr: false,
	async prerender() {
		return [
			'/',
			'/services',
			'/work',
			'/about',
			'/privacy',
			'/terms',
		];
	},
} satisfies Config;
