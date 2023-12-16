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

const HeadSEO = ({ data }) => (
  <SEO
    title="Recent Posts"
    pathname="/posts"
    image={data.site.siteMetadata.shareImageNoLogo}
  />
);

HeadSEO.propTypes = dataAny;

export const Head = HeadSEO;

export default PostsPage;

export const query = graphql`
  query PostsPage {
    site {
      siteMetadata {
        shareImageNoLogo
      }
    }
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
