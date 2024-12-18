import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Adicione aqui o domínio

    remotePatterns: [
      
      {
        protocol: 'http', // Para imagens de Cloudinary
        hostname: 'res.cloudinary.com', // Domínio de Cloudinary
      },
    ],
  },
};

export default nextConfig;
