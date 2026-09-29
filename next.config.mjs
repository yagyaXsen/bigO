/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Old "Start project" URL — one canonical contact page instead of a duplicate
      { source: "/start-project", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
