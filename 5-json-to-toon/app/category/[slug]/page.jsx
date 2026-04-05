export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  // Example data fetching based on slug
  const title = `${slug.charAt(0).toUpperCase() + slug.slice(1)} Category - MyPlatform`;
  const description = `Explore the latest updates and posts in the ${slug} category.`;
  
  // Absolute screenshot URL (1200x630)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yourdomain.com';
  const imageUrl = `${baseUrl}/images/categories/${slug}-screenshot-1200x630.webp`;
  const currentUrl = `${baseUrl}/category/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: currentUrl,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} Screenshot`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{slug.charAt(0).toUpperCase() + slug.slice(1)} Category</h1>
      <p>Explore the latest updates and posts in the {slug} category.</p>
    </main>
  );
}
