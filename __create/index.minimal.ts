// Minimal server entry for SPA mode - no Hono, no auth, no database
// This file is used only during build for React Router's SPA mode
// The actual deployed site will be pure static files served by Vercel

export default {
  fetch: () => new Response('SPA mode - this should not be called', { status: 404 })
};
