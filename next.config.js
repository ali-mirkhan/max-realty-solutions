/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "d2xsxph8kpxj0f.cloudfront.net" },
    ],
  },
};

module.exports = nextConfig;
