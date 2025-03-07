/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars
import path from 'path';
const nextConfig = {
    webpack: (config) => {
        // Add custom rules for binary files and .node files
        config.module.rules.push(
            {
                test: /\.bin$/, // Adjust this regex if necessary for your binary files
                use: 'binary-base64-loader',
            },
            {
                test: /\.node$/,
                loader: 'node-loader',
            }
        );

        return config;
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: `frame-ancestors 'self' dcampuzano-241210-56-demo.my.site.com *.dcampuzano-241210-56-demo.my.site.com dcampuzano-241210-56-demo--c.vf.force.com;`
                    }
                ],
            },
        ];
    },
};

export default nextConfig;