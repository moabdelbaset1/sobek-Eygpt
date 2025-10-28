export function organizationSchema(params: {
  name: string;
  url: string;
  logoUrl?: string;
  sameAs?: string[];
}) {
  const {name, url, logoUrl, sameAs} = params;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo: logoUrl,
    sameAs
  };
}

export function productSchema(params: {
  name: string;
  description: string;
  sku?: string;
  image?: string[];
  brand?: string;
}) {
  const {name, description, sku, image, brand} = params;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    sku,
    image,
    brand: brand ? { '@type': 'Brand', name: brand } : undefined
  };
}

export function articleSchema(params: {
  headline: string;
  description: string;
  author?: string;
  datePublished?: string;
  image?: string[];
  url?: string;
}) {
  const {headline, description, author, datePublished, image, url} = params;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: author ? { '@type': 'Person', name: author } : undefined,
    datePublished,
    image,
    url
  };
}


