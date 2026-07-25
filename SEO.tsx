import React from 'react';

interface SEOProps {
  title?: string;
  titleTemplate?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'service';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  price?: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  ratingValue?: number;
  ratingCount?: number;
}

const SEO: React.FC<SEOProps> = ({
  title = 'أفكار مهندس | Engineer Ideas',
  titleTemplate = '%s | أفكار مهندس',
  description = 'منصتك الهندسية المتكاملة للخدمات والاستشارات والحلول الذكية - خدمات هندسية، استشارات فنية، تدريب مهني، تصميم هندسي',
  keywords = 'هندسة, استشارات, خدمات هندسية, تصميم, تدريب, Engineer Ideas, engineering services, consulting',
  image = '/og-image.png',
  url = '',
  type = 'website',
  author = 'Engineer Ideas',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  price,
  currency = 'USD',
  availability,
  ratingValue,
  ratingCount,
}) => {
  const siteUrl = 'https://engineerideas.com';
  const fullUrl = `${siteUrl}${url}`;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : type === 'product' ? 'Product' : type === 'service' ? 'Service' : 'WebSite',
    name: title,
    description,
    url: fullUrl,
    image: fullImage,
    author: {
      '@type': type === 'article' ? 'Person' : 'Organization',
      name: author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Engineer Ideas',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    ...(type === 'article' && {
      headline: title,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      articleSection: section,
      keywords: tags.join(', '),
    }),
    ...(type === 'product' && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency: currency,
        availability: `https://schema.org/${availability || 'InStock'}`,
        url: fullUrl,
        seller: {
          '@type': 'Organization',
          name: 'Engineer Ideas',
        },
      },
      ...(ratingValue && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue,
          reviewCount: ratingCount,
          bestRating: 5,
          worstRating: 1,
        },
      }),
    }),
    ...(type === 'service' && {
      serviceType: 'Engineering Services',
      areaServed: {
        '@type': 'Country',
        name: 'Saudi Arabia',
      },
      provider: {
        '@type': 'Organization',
        name: 'Engineer Ideas',
      },
    }),
    ...(type === 'website' && {
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  };

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{titleTemplate && title !== 'أفكار مهندس | Engineer Ideas' ? titleTemplate.replace('%s', title) : title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="Arabic, English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="generator" content="Vite + React" />
      <link rel="canonical" href={fullUrl} />
      
      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="ar" href={`${siteUrl}/ar${url}`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en${url}`} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Engineer Ideas" />
      <meta property="og:locale" content="ar_SA" />
      <meta property="og:locale:alternate" content="en_US" />
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {tags.map((tag, i) => (
        <meta key={i} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@engineerideas" />
      <meta name="twitter:creator" content="@engineerideas" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Product Schema */}
      {type === 'product' && price && (
        <meta property="product:price:amount" content={price.toString()} />
      )}
      {type === 'product' && currency && (
        <meta property="product:price:currency" content={currency} />
      )}
      {type === 'product' && availability && (
        <meta property="product:availability" content={availability} />
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Preconnect to important origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
    </>
  );
};

export default SEO;