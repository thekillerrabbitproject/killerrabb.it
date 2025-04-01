import Content from '@/components/Content';
import Meta from '@/components/Meta';
import RelatedPosts from '@/components/RelatedPosts';
import Title from '@/components/Title';
import Video from '@/components/Video';
import { query as videoQuery } from '@/graphql/Video';
import { query } from '@/graphql/VideoStaticParams';
import { getMetadata } from '@/utils';
import client from '@/utils/apollo-client';

async function getData(slug) {
  try {
    const res = await client.query({
      query: videoQuery,
      variables: {
        slug,
      },
    });

    return res?.data?.video ?? [];
  } catch (error) {
    console.error(error);
  }
}

export async function generateMetadata(props, parent) {
  const params = await props.params;
  const { title, slug, __typename: postType } = await getData(params.slug);

  const { metadataBase } = await parent;

  return getMetadata({
    title,
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

    return res?.data?.videos?.nodes ?? [];
  } catch (error) {
    console.error(error);
  }
}

export default async function Page(props) {
  const params = await props.params;
  const data = await getData(params.slug);

  return (
    <>
      <Title title={data.title} isVideo hasShare />
      <Video data={data} />
      <Meta data={data} notSticky />
      <Content content={data.content} />
      <Title title="Credits" isVideo />
      <Content content={data.videoThingy.credits} />
      <RelatedPosts data={data.relatedPosts} />
    </>
  );
}
