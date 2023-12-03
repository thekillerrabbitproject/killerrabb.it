import React from 'react';
import Layout from '@components/Layout';
import SEO from '@components/SEO';
import SlidesPosts from '@components/Slides/Posts';
import SlidesVideos from '@components/Slides/Videos';
import { dataAny } from '@types';

import { graphql } from 'gatsby';

const IndexPage = ({ data }) => {
  const { videos, posts } = data;

  return (
    <Layout>
      <SlidesVideos data={videos} />
      <SlidesPosts data={posts} />
    </Layout>
  );
};

IndexPage.propTypes = dataAny;

export default IndexPage;

export const Head = () => <SEO />;

export const query = graphql`
  query HomePage {
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
