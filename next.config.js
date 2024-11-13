/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.ytimg.com"],
  },
  async rewrites() {
    return [
      {
        source: "/auth/:path*",
        destination: "http://localhost:8000/:path*", // 백엔드 서버 주소로 리다이렉션
      },
    ];
  },
};

module.exports = nextConfig;
