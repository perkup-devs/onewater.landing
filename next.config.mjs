/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true, // better for static hosts
  images: { unoptimized: true }, // disable Next image optimization
};

export default nextConfig
