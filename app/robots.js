// Served at /robots.txt.
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: 'https://remevia.in/sitemap.xml',
  };
}
