import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import SEO from '@components/SEO';
import Layout from '@components/Layout';

import * as ß from '@css/post';

const PostPage = ({ data }) => {
  const post = data?.wpPost ?? {};
  const featuredImage = getImage(post.featuredImage.node.localFile);
  const galleryImages = post.media.gallery.map((image) => ({
    id: image.id,
    url: getImage(image.localFile),
  }));
  return (
    <Layout>
      <SEO title={post.title} />
      <article>
        <div css={ß.headline}>
          <h1>{post.title}</h1>
          <GatsbyImage image={featuredImage} alt={post.title} />
        </div>
        <article
          css={ß.article}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {galleryImages.map((image) => (
          <GatsbyImage key={image.id} alt={post.title} image={image.url} />
        ))}
      </article>
    </Layout>
  );
};

PostPage.propTypes = {
  data: PropTypes.shape({
    wpPost: PropTypes.object,
  }),
};

export const data = graphql`
  query Post($id: String) {
    wpPost(id: { eq: $id }) {
      title
      content
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(
                formats: [AUTO, WEBP]
                layout: FULL_WIDTH
                quality: 100
              )
            }
          }
        }
      }
      media: acf {
        gallery {
          id
          sourceUrl
          localFile {
            childImageSharp {
              gatsbyImageData(
                formats: [AUTO, WEBP]
                layout: FULL_WIDTH
                quality: 100
              )
            }
          }
        }
      }
    }
  }
`;

export default PostPage;
