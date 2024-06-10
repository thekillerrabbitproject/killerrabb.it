import SlidesPosts from '@/components/Slides/Posts';
import SlidesVideos from '@/components/Slides/Videos';
import Title from '@/components/Title';
import { query as modelQuery } from '@/graphql/Model';
import { query } from '@/graphql/ModelStaticParams';
import { getMetadata } from '@/utils';
import client from '@/utils/apollo-client';

async function getData(slug) {
  try {
    const res = await client.query({
      query: modelQuery,
      variables: {
        slug,
      },
    });

    const {
      name: title,
      posts: { nodes: postsArray },
      videos: { nodes: videosArray },
      ...rest
    } = res?.data?.model ?? {};

    return {
      title,
      ids: [...postsArray, ...videosArray].map(({ id }) => id).filter(Boolean),
      ...rest,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function generateMetadata({ params }, parent) {
  const { title, slug, __typename: postType } = await getData(params.slug);

  const { metadataBase } = await parent;

  return getMetadata({
    title: `Model: ${title}`,
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

    return res?.data?.models?.nodes ?? [];
  } catch (error) {
    console.error(error);
  }
}

export default async function Page({ params }) {
  const data = await getData(params.slug);

  return (
    <>
      <Title title={data.title} hasShare />
      <SlidesVideos ids={data?.ids} title={`Recent ${data.title} Videos`} />
      <SlidesPosts ids={data?.ids} title={`Recent ${data.title} Posts`} />
    </>
  );
}
