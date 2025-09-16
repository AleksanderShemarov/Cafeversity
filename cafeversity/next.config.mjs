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
    reactStrictMode: false
};

export default withNextIntl(nextConfig);
