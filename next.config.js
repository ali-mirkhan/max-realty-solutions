/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "d2xsxph8kpxj0f.cloudfront.net" },
      { protocol: "https", hostname: "www.maxrealtysolutions.com" },
      { protocol: "https", hostname: "maxrealtysolutions.com" },
      { protocol: "https", hostname: "ddfapi.realtor.ca" },
      { protocol: "https", hostname: "cdn.realtor.ca" },
      { protocol: "https", hostname: "images.realtor.ca" },
      { protocol: "https", hostname: "ddfcdn.realtor.ca" },
      { protocol: "https", hostname: "*.realtor.ca" },
    ],
  },
};

module.exports = nextConfig;
