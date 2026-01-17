/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'avatars.mds.yandex.net',
      },
    ],
  },
}

module.exports = nextConfig
