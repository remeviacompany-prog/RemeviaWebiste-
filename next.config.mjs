/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/products.html', destination: '/products', permanent: true },
      { source: '/tltreat.html', destination: '/products/tltreat', permanent: true },
      { source: '/curtect-crd.html', destination: '/products/curtect-crd', permanent: true },
      { source: '/tlegg.html', destination: '/products/tlegg', permanent: true },
      { source: '/tlrepeal.html', destination: '/products/tlrepeal', permanent: true },
      { source: '/tl-healer.html', destination: '/products/tl-healer', permanent: true },
      { source: '/science.html', destination: '/science', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
    ];
  },
};

export default nextConfig;
