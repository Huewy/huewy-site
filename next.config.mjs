/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/tt',
        destination: '/guide?utm_source=tiktok&utm_medium=social',
        permanent: false,
      },
      {
        source: '/ig',
        destination: '/guide?utm_source=instagram&utm_medium=social',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
