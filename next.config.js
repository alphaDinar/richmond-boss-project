/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // Still allows any hostname, but consider specifying if possible.
      },
    ],
  },
};

module.exports = nextConfig;