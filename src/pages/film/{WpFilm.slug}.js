import React from 'react';
import Layout from '@components/Layout';
import SEO from '@components/SEO';
import SlidesPosts from '@components/Slides/Posts';
import SlidesVideos from '@components/Slides/Videos';
import Title from '@components/Title';
import { dataAny } from '@types';

import { graphql } from 'gatsby';

const FilmPage = ({ data }) => {
  const {
    wpFilm: { title, videos, posts },
  } = data;

  return (
    <Layout>
      <Title title={title} />
      <SlidesVideos data={videos} />
      <SlidesPosts data={posts} />
    </Layout>
  );
};

FilmPage.propTypes = dataAny;

const HeadSEO = ({ data }) => (
  <SEO title={`Film: ${data.wpFilm.title}`} pathname={data.wpFilm.path} />
);

HeadSEO.propTypes = dataAny;

export const Head = HeadSEO;

export default FilmPage;

export const data = graphql`
  query FilmPage($slug: String) {
    wpFilm(slug: { eq: $slug }) {
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