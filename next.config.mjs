import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ensure prisma engine files are copied to the build output
      config.externals.push("@prisma/client");
    }
    return config;
  },
};

export default nextConfig;
