/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploads.scratch.mit.edu",
      },
      {
        protocol: "https",
        hostname: "cdn2.scratch.mit.edu",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://uptimerobot.com",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "HEAD",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
