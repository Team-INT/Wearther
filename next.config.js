/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "shopping-phinf.pstatic.net",
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
          : `${process.env.API_BASE_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
