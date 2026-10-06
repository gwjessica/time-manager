import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: [
    '@fullcalendar/common',
    '@fullcalendar/core',
    '@fullcalendar/daygrid',
    '@fullcalendar/interaction',
    '@fullcalendar/react',
    '@fullcalendar/timegrid',
  ],
};

export default nextConfig;