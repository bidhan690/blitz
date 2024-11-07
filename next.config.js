/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bidhan.blob.core.windows.net",
        pathname: "/**",
        port: "",
      },
  {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/**",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
