import query from '@/graphql/Sitemap';
import { SITE_METADATA } from '@/hooks/useSiteMetadata/constants';
import client from '@/utils/apollo-client';

async function getData(slug) {
  try {
    const res = await client.query({
      query,
      variables: {
        slug,
      },
    });

    const {
      posts: { nodes: posts = [] } = {},
      videos: { nodes: videos = [] } = {},
      films: { nodes: films = [] } = {},
      models: { nodes: models = [] } = {},
    } = res?.data ?? {};

    return {
      posts,
      videos,
      films,
      models,
    };
  } catch (error) {
    console.error(error);
  }
}

export default async function sitemap() {
  const { posts, videos, films, models } = await getData();

  return [
    {
      url: `${SITE_METADATA.siteUrl}/`,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${SITE_METADATA.siteUrl}/posts/`,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${SITE_METADATA.siteUrl}/videos/`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...posts?.map((post) => ({
      url: `${SITE_METADATA.siteUrl}/${post.slug}`,
      changeFrequency: 'daily',
      priority: 0.7,
    })),
    ...videos?.map((video) => ({
      url: `${SITE_METADATA.siteUrl}/video/${video.slug}`,
      changeFrequency: 'daily',
      priority: 0.7,
    })),
    ...films?.map((film) => ({
      url: `${SITE_METADATA.siteUrl}/film/${film.slug}`,
      changeFrequency: 'daily',
      priority: 0.7,
    })),
    ...models?.map((model) => ({
      url: `${SITE_METADATA.siteUrl}/model/${model.slug}`,
      changeFrequency: 'daily',
      priority: 0.7,
    })),
  ];
}
