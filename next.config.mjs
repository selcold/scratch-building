/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'uploads.scratch.mit.edu',
            },
            {
                protocol: 'https',
                hostname: 'cdn2.scratch.mit.edu',
            }
        ],
    },
};

export default nextConfig;
