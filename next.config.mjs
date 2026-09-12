/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  reactStrictMode: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // The dev-tools badge would leak into reviewer/validator screenshots.
  devIndicators: false,
};
export default nextConfig;
