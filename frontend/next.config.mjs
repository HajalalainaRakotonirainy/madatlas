/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/map/:path*",
                headers :[
                    {
                        key: 'Access-Control-Allow-Credentials',
                        value: 'true',
                    },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, PATCH',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Origin, X-Requested-With, Content-Type, Authorization, Accept, Accept-Version, Content-Length',
                    }
                ]
            }
        ]
    }
};

export default nextConfig;
