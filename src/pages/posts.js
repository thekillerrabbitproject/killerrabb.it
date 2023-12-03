import React from 'react';
import Layout from '@components/Layout';
import SEO from '@components/SEO';
import SlidesPosts from '@components/Slides/Posts';
import { dataAny } from '@types';

import { graphql } from 'gatsby';

const PostsPage = ({ data }) => (
  <Layout>
    <SlidesPosts data={data.posts} />
  </Layout>
);

PostsPage.propTypes = dataAny;

export default PostsPage;

export const Head = () => <SEO title="Recent Posts" pathname="/posts" />;

export const query = graphql`
  query PostsPage {
    posts: allWpPost {
      nodes {
        ...PostConstrained
        ...FeaturedImageConstrained
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
  }
`;
