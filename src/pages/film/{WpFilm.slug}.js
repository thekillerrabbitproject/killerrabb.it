import React from 'react';
import Layout from '@components/Layout';
import SlidesPosts from '@components/Slides/Posts';
import SlidesVideos from '@components/Slides/Videos';
import { dataAny } from '@types';

import { graphql } from 'gatsby';

const FilmPage = ({ data }) => {
  const {
    wpFilm: { videos, posts },
  } = data;

  return (
    <Layout>
      <SlidesVideos data={videos} />
      <SlidesPosts data={posts} />
    </Layout>
  );
};

FilmPage.propTypes = dataAny;

export default FilmPage;

export const data = graphql`
  query FilmPage($slug: String) {
    wpFilm(slug: { eq: $slug }) {
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
