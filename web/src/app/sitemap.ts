import {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://sobek.com.eg';
  const routes = ['', '/products', '/about', '/rd', '/manufacturing', '/media', '/careers', '/news', '/contact', '/distributors', '/legal'];

  return [
    ...routes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7
    }))
  ];
}


