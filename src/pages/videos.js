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

export default VideosPage;

export const Head = () => <SEO title="Recent Videos" pathname="/videos" />;

export const query = graphql`
  query VideosPage {
    videos: allWpVideo {
      nodes {
        ...VideoPost
        ...FeaturedImage
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
