import Content from '@/components/Content';
import Meta from '@/components/Meta';
import RelatedPosts from '@/components/RelatedPosts';
import PostSlider from '@/components/Slides/Post';
import Title from '@/components/Title';
import { query as postQuery } from '@/graphql/Post';
import { query } from '@/graphql/PostStaticParams';
import { getMetadata } from '@/utils';
import client from '@/utils/apollo-client';

async function getData(slug) {
  try {
    const res = await client.query({
      query: postQuery,
      variables: {
        slug,
      },
    });

    return res?.data?.post ?? [];
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

    return res?.data?.posts?.nodes ?? [];
  } catch (error) {
    console.error('error', error);
  }
}

export default async function Page(props) {
  const params = await props.params;
  const data = await getData(params.slug);

  return (
    <>
      <Title title={data.title} hasShare />
      <PostSlider data={data} />
      <Meta data={data} notSticky />
      <Content content={data.content} />
      <RelatedPosts data={data.relatedPosts} />
    </>
  );
}
