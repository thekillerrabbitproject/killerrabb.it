import React from 'react';
import Layout from '@components/Layout';
import { dataAny } from '@types';

import { graphql } from 'gatsby';

const VideoPage = ({ data }) => (
  <Layout>
    <pre>{JSON.stringify(data, null, 4)}</pre>
  </Layout>
);

VideoPage.propTypes = dataAny;

export default VideoPage;

export const data = graphql`
  query VideoPage($slug: String) {
    data: wpVideo(slug: { eq: $slug }) {
      ...VideoPost
      ...FeaturedImage
      relatedPosts: related_posts {
        ...VideoRelatedPosts
      }
      video: videoThingy {
        ...VideoThingy
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
