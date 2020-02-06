import React from 'react';
import { graphql } from 'gatsby';
import mangoSlugfy from '@mangocorporation/mango-slugfy';
import Img from 'gatsby-image';
import Link from '../components/Link';

import Layout from '../components/layout';
import SEO from '../components/seo';
import GridList from '../components/grid-list';
import Pagination from '../components/pagination';

import { getCardImage, defaultPropTypes } from '../utils';

import * as ßµ from '../emotion/misc';

const List = ({ data, pageContext, location }) => {
  const getAlbums = () => {
    return data.api.albums.map(album => (
      <article key={album.id}>
        <Link
          direction="left"
          to={`/${mangoSlugfy(album.title)}`}
          state={{
            prevPath: location.pathname,
          }}
        >
          <Img
            className="photo"
            fluid={album.cover_photo.childImageSharp.fluid}
            alt=""
          />
        </Link>
        <section css={ßµ.block}>
          <p>
            <Link to={`/${mangoSlugfy(album.title)}`}>{album.title}</Link>
          </p>
        </section>
      </article>
    ));
  };

  return (
    <Layout>
      <SEO
        title="Home"
        meta={getCardImage(
          data.api.albums[0].cover_photo.childImageSharp.fluid.src
        )}
      />
      <GridList active="list" prefix={pageContext.prefix} />
      <Pagination {...pageContext} />
      {getAlbums()}
      <Pagination {...pageContext} />
    </Layout>
  );
};

List.propTypes = defaultPropTypes;

export const query = graphql`
  query API_ListQueryTMP($skip: Int!, $limit: Int!, $tag: String) {
    api {
      albums(order: "ASC", skip: $skip, limit: $limit, tag: $tag) {
        id
        title
        cover_photo_base_url
        order
        cover_photo {
          ext
          absolutePath
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

export default List;
