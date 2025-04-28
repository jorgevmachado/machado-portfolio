import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    ENV: process.env.NEXT_PUBLIC_ENV,
    API: process.env.NEXT_PUBLIC_API,
  },
};

export default nextConfig;
