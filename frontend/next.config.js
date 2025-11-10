/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'via.placeholder.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
}

module.exports = nextConfig
