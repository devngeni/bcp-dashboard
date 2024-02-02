/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  transpilePackages: ["@mui/x-charts"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Wildcard to allow all domains
      },
    ],
  },
};

export default nextConfig;
