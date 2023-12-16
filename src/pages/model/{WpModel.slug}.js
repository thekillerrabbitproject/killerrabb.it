import React from 'react';
import Layout from '@components/Layout';
import SEO from '@components/SEO';
import SlidesPosts from '@components/Slides/Posts';
import SlidesVideos from '@components/Slides/Videos';
import Title from '@components/Title';
import { dataAny } from '@types';

import { graphql } from 'gatsby';

const ModelPage = ({ data }) => {
  const {
    wpModel: { title, videos, posts },
  } = data;

  return (
    <Layout>
      <Title title={title} />
      <SlidesVideos data={videos} />
      <SlidesPosts data={posts} />
    </Layout>
  );
};

ModelPage.propTypes = dataAny;

const HeadSEO = ({ data }) => (
  <SEO
    title={`Model: ${data.wpModel.title}`}
    pathname={data.wpModel.path}
    image={data.site.siteMetadata.shareImageNoLogo}
  />
);

HeadSEO.propTypes = dataAny;

export const Head = HeadSEO;

export default ModelPage;

export const data = graphql`
  query ModelPage($slug: String) {
    site {
      siteMetadata {
        shareImageNoLogo
      }
    }
    wpModel(slug: { eq: $slug }) {
      title: name
      posts {
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
      videos {
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
  }
`;
