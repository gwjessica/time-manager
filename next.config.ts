import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // <--- Tambahkan baris ini
  typescript: {
    ignoreBuildErrors: true,
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