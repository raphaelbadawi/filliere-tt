/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.STRAPI_DOCKER_HOSTNAME,
        port: process.env.STRAPI_PORT,
        pathname: "/uploads/*",
      },
    ],
  },
};

module.exports = nextConfig;
