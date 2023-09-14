/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard/novel/',
        permanent: true,
      },
    ]
  },
  swcMinify: false,
  images: {
    domains: ['asset.cloudinary.com', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig
