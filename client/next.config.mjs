/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "keprwktzfiaytawfeabe.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/bucket/img/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
