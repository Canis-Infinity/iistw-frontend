export default async function sitemap() {
  const baseUrl = 'https:/iistw.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
    },
    {
      url: `${baseUrl}/works`,
      lastModified: new Date(),
      changeFrequency: 'always',
    },
  ];
}
