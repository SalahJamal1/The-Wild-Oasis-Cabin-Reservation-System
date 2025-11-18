import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "keprwktzfiaytawfeabe.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/bucket/img/**",
      },
    ],
  },
};
export default nextConfig;
