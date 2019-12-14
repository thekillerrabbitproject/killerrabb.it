import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { pathOr } from 'ramda';

import ReactMarkdown from 'react-markdown';
import Link from '../components/Link';
import Layout from '../components/layout';
import SEO from '../components/seo';
import ShareButton from '../components/share-button';

// import '../styles/album.scss';

import HamburgerMenu from '../components/hamburger-menu';

import { getCardImage } from '../utils';

import * as ß from '../emotion/album';

const Album = ({ pageContext, data, location }) => {
  const prevPath = pathOr(false, ['state', 'prevPath'], location);
  const getGallery = () => {
    return data.api.album[0].photos.map(photo => (
      <Img
        className="photo"
        key={photo.id}
        fluid={photo.imageFile.childImageSharp.fluid}
        alt=""
      />
    ));
  };
  const getCoverPhoto = () => {
    return (
      <Img
        className="photo photo--cover"
        fluid={data.api.album[0].cover_photo.childImageSharp.fluid}
      />
    );
  };
  const getContent = () => {
    return (
      <article css={ß.article}>
        <ReactMarkdown source={data.api.album[0].content} />
      </article>
    );
  };

  const getBackButton = () => {
    if (prevPath) {
      return <Link to={prevPath}>Back</Link>;
    }
    return <Link to="/">Home</Link>;
  };

  const getTags = () => {
    const { tags } = data.api.album[0];
    const tagsList = tags.map(tag => (
      <li key={tag.keyname} css={ß.tagLi}>
        <Link direction="left" to={`/tag/${tag.keyname}`}>
          #{tag.name}
        </Link>
      </li>
    ));

    return (
      <div css={ß.article}>
        <p>Tags:</p>
        <ul css={ß.tagUl}>{tagsList}</ul>
      </div>
    );
  };

  return (
    <Layout>
      <SEO
        title={data.api.album[0].title}
        meta={getCardImage(data.api.album[0].cover_photo_base_url)}
      />
      <section css={ß.album}>
        <HamburgerMenu />
        <nav css={ß.nav}>
          {getBackButton()} /{' '}
          <span className="active">{data.api.album[0].title}</span>{' '}
          <ShareButton
            title={data.api.album[0].title}
            slugPath={pageContext.slugPath}
            css={ß.share}
          />
        </nav>
        <h1 css={ß.h1}>{data.api.album[0].title}</h1>
        {getCoverPhoto()}
        {getContent()}
        {getGallery()}
        {getTags()}
      </section>
    </Layout>
  );
};

Album.propTypes = {
  data: PropTypes.shape({
    api: PropTypes.shape({
      album: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
          content: PropTypes.string,
          cover_photo_base_url: PropTypes.string,
          order: PropTypes.number,
          cover_photo: PropTypes.shape({
            ext: PropTypes.string,
            absolutePath: PropTypes.string,
            childImageSharp: PropTypes.shape({
              fluid: PropTypes.object,
            }),
          }),
          photos: PropTypes.arrayOf(
            PropTypes.shape({
              imageFile: PropTypes.shape({
                childImageSharp: PropTypes.shape({
                  fluid: PropTypes.object,
                }),
              }),
            })
          ),
          tags: PropTypes.arrayOf(
            PropTypes.shape({
              keyname: PropTypes.string,
              name: PropTypes.string,
            })
          ),
        })
      ),
    }),
  }),
  pageContext: PropTypes.shape({
    slugPath: PropTypes.string,
  }),
  location: PropTypes.object,
};

export const query = graphql`
  query API_AlbumQuery($albumId: String!) {
    shareIcon: file(relativePath: { eq: "share-icon.png" }) {
      childImageSharp {
        fixed(quality: 100, width: 20) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    api {
      album(id: $albumId) {
        id
        title
        content
        tags {
          keyname
          name
        }
        cover_photo_base_url
        cover_photo {
          ext
          absolutePath
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        photos {
          id
          description
          base_url
          imageFile {
            ext
            absolutePath
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  }
`;

export default Album;
