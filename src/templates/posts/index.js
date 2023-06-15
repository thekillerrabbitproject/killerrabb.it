import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import SEO from '@components/SEO';
import Layout from '@components/Layout';
import Share from '@components/Share';
import { getWebp } from '../../utils';

import * as ß from '@css/post';

// https://tkrp.net/share/index.php?image=&text=duas%20palavra

const PostPage = ({ data }) => {
  const post = data?.wpPost ?? {};
  const featuredImage = getImage(post.featuredImage.node.localFile);
  const cardImage = getWebp(post.featuredImage.node.localFile);
  const cardImageUrl = `${cardImage}&text=${post.title}`;
  const galleryImages = post.media.gallery.map((image) => ({
    id: image.id,
    url: getImage(image.localFile),
  }));

  return (
    <>
      <SEO title={post.title} cardImage={cardImageUrl} />
      <Layout>
        <article>
          <div css={ß.headline}>
            <h1>{post.title}</h1>
            <GatsbyImage image={featuredImage} alt={post.title} />
          </div>
          <section css={ß.section}>
            <aside>
              <Share />
            </aside>
            <article
              css={ß.article}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </section>
          {galleryImages.map((image) => (
            <GatsbyImage
              css={ß.image}
              key={image.id}
              alt={post.title}
              image={image.url}
            />
          ))}
        </article>
      </Layout>
    </>
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
                placeholder: BLURRED
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
                placeholder: BLURRED
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
