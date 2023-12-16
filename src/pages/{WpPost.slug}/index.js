import React from 'react';
import Content from '@components/Content';
import Layout from '@components/Layout';
import Meta from '@components/Meta';
import RelatedPosts from '@components/RelatedPosts';
import SEO from '@components/SEO';
import PostSlider from '@components/Slides/Post';
import Title from '@components/Title';
import { dataAny } from '@types';

import { graphql } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';

const PostPage = ({ data }) => {
  const post = data.wpPost;

  return (
    <Layout>
      <Title title={post.title} hasShare />
      <PostSlider data={post} />
      <Meta data={post} />
      <Content content={post.content} />
      <RelatedPosts data={post.relatedPosts} />
    </Layout>
  );
};

PostPage.propTypes = dataAny;

const HeadSEO = ({ data }) => (
  <SEO
    title={data.wpPost.title}
    pathname={data.wpPost.path}
    image={getSrc(data.wpPost.featuredImage.node.localFile.shareImage)}
    categories={data.wpPost.films.nodes}
  />
);

HeadSEO.propTypes = dataAny;

export const Head = HeadSEO;

export default PostPage;

export const data = graphql`
  query PostPage($slug: String) {
    wpPost(slug: { eq: $slug }) {
      ...PostFullWidth
      ...FeaturedImageFullWidth
      relatedPosts: related_posts {
        ...PostRelatedPosts
      }
      films {
        nodes {
          ...FilmTaxonomy
        }
      }
      models {
        nodes {
          ...ModelTaxonomy
        }
      }
    }
  }
`;
