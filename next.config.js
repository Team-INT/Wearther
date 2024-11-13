/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  async rewrites() {
    const isProd = process.env.NODE_ENV === "production";
    return [
      {
        source: "/auth/:path*",
        destination: isProd
          ? "https://api.yoursite.com/auth/:path*"
          : "http://localhost:8000/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
