import React from 'react';
import Layout from '@components/Layout';
import SlidesPosts from '@components/Slides/Posts';
import SlidesVideos from '@components/Slides/Videos';
import { dataAny } from '@types';

import { graphql } from 'gatsby';

const ModelPage = ({ data }) => {
  const {
    wpModel: { videos, posts },
  } = data;

  return (
    <Layout>
      <SlidesVideos data={videos} />
      <SlidesPosts data={posts} />
    </Layout>
  );
};

ModelPage.propTypes = dataAny;

export default ModelPage;

export const data = graphql`
  query ModelPage($slug: String) {
    wpModel(slug: { eq: $slug }) {
      posts {
        nodes {
          ...Post
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
      videos {
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
  }
`;
