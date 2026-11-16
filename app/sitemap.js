// Lists the site's pages for search engines at /sitemap.xml.
const SITE = 'https://remevia.in';
const PAGES = [
  ['', 1, 'weekly'],
  ['/products', 0.9, 'weekly'],
  ['/products/tltreat', 0.8, 'monthly'],
  ['/products/curtect-crd', 0.8, 'monthly'],
  ['/products/eksit-crd', 0.8, 'monthly'],
  ['/products/tlegg', 0.8, 'monthly'],
  ['/products/tlrepeal', 0.8, 'monthly'],
  ['/products/tl-healer', 0.8, 'monthly'],
  ['/science', 0.7, 'monthly'],
  ['/about', 0.6, 'monthly'],
  ['/contact', 0.6, 'yearly'],
];

export default function sitemap() {
  return PAGES.map(([path, priority, changeFrequency]) => ({
    url: `${SITE}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
