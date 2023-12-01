import React from 'react';
import Layout from '@components/Layout';
import { dataAny } from '@types';

import { graphql } from 'gatsby';

const PostPage = ({ data }) => (
  <Layout>
    <pre>{JSON.stringify(data, null, 4)}</pre>
  </Layout>
);

PostPage.propTypes = dataAny;

export default PostPage;

export const data = graphql`
  query PostPage($slug: String) {
    data: wpPost(slug: { eq: $slug }) {
      ...Post
      ...FeaturedImage
      gallery: acf {
        ...Gallery
      }
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
