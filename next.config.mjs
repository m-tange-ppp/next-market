/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://next-market-5yrxqxme4-m-tange-ppps-projects.vercel.app",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "Content-Type"
          },
        ],
      },
    ];
  }
};

export default nextConfig;
