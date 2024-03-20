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
  async headers() {
    return [
      {
        // Routes this applies to
        source: "/api/(.*)",
        // Headers
        headers: [
          // Allow for specific domains to have access or * for all
          {
            source: "/api/(.*)",
            headers: [
              { key: "Access-Control-Allow-Credentials", value: "true" },
              { key: "Access-Control-Allow-Origin", value: "*" },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET,DELETE,PATCH,POST,PUT",
              },
              {
                key: "Access-Control-Allow-Headers",
                value:
                  "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
              },
            ],
          },
        ],
      },
    ];
  },
};

export default nextConfig;
