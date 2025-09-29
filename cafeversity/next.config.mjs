import createNextIntlPlugin from "next-intl/plugin";


const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/by',
                permanent: true,
            },
        ];
    },
    reactStrictMode: false,
    images: {
        // domains: ['cdn.weatherapi.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.weatherapi.com',
                pathname: '/weather/64x64/**',
            },
            {
                protocol: 'http',
                hostname: 'cdn.weatherapi.com',
                pathname: '/weather/64x64/**',
            },
        ],
    },
};

export default withNextIntl(nextConfig);
