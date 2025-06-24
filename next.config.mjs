/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      outputFileTracingIncludes: {
        '/api/**/*': ['./node_modules/**/*.wasm', './node_modules/**/*.node'],
      },
    },
    // Atau gunakan ini untuk versi Next.js yang lebih lama
    outputFileTracing: true,
  }
  
  module.exports = nextConfig