import React from 'react';
import Layout from '@components/Layout';
import SEO from '@components/SEO';
import SlidesVideos from '@components/Slides/Videos';
import { dataAny } from '@types';

import { graphql } from 'gatsby';

const VideosPage = ({ data }) => (
  <Layout>
    <SlidesVideos data={data.videos} disableSlider />
  </Layout>
);

VideosPage.propTypes = dataAny;

const HeadSEO = ({ data }) => (
  <SEO
    title="Recent Videos"
    pathname="/videos"
    postType="video"
    image={data.site.siteMetadata.shareImageNoLogo}
  />
);

HeadSEO.propTypes = dataAny;

export const Head = HeadSEO;

export default VideosPage;

export const query = graphql`
  query VideosPage {
    site {
      siteMetadata {
        shareImageNoLogo
      }
    }
    videos: allWpVideo {
      nodes {
        ...VideoPost
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
