import SlidesPosts from '@/components/Slides/Posts';
import SlidesVideos from '@/components/Slides/Videos';
import Title from '@/components/Title';
import { query as filmQuery } from '@/graphql/Film';
import { query } from '@/graphql/FilmStaticParams';
import { getMetadata } from '@/utils';
import client from '@/utils/apollo-client';

async function getData(slug) {
  try {
    const res = await client.query({
      query: filmQuery,
      variables: {
        slug,
      },
    });

    const {
      posts: { nodes: postsArray },
      videos: { nodes: videosArray },
      ...rest
    } = res?.data?.film ?? {};

    return {
      ids: [...postsArray, ...videosArray].map(({ id }) => id).filter(Boolean),
      ...rest,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function generateMetadata(props, parent) {
  const params = await props.params;
  const { title, slug, __typename: postType } = await getData(params.slug);

  const { metadataBase } = await parent;

  return getMetadata({
    title: `Film: ${title}`,
    slug,
    postType,
    metadataBase,
  });
}

export async function generateStaticParams() {
  try {
    const res = await client.query({
      query,
    });

    return res?.data?.films?.nodes ?? [];
  } catch (error) {
    console.error(error);
  }
}

export default async function Page(props) {
  const params = await props.params;
  const data = await getData(params.slug);

  return (
    <>
      <Title title={data.title} hasShare />
      <SlidesVideos ids={data?.ids} title={`Recent ${data.title} Videos`} />
      <SlidesPosts ids={data?.ids} title={`Recent ${data.title} Posts`} />
    </>
  );
}
