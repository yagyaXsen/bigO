import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: './src/app',
	ssr: false,  // Disable SSR for simple static deployment
	prerender: ['/*'],  // Pre-render all routes as static HTML
} satisfies Config;
