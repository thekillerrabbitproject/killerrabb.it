import * as React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '@components/Layout';
import SEO from '@components/SEO';

import { getWebp } from '../../utils';

import * as ß from '@css/video';
import VideoAside from '@components/VideoAside';
import RelatedPosts from '@components/RelatedPosts';

const VideosPage = ({ data }) => {
  const post = data?.wpVideo ?? [];
  const cardImageUrl = `${getWebp(post.featuredImage.node.localFile)}&text=${
    post.title
  }`;

  return (
    <>
      <SEO cardImage={cardImageUrl} title={post.title} />
      <Layout>
        <main css={ß.main}>
          <h1>{post.title}</h1>
          <article key={post.id} css={ß.article}>
            <aside css={ß.aside}>
              <VideoAside
                videoUrl={
                  post.videoThingy.featuredVideo.localFile.publicURL ||
                  post.videoThingy.featuredVideo.publicUrl
                }
                cover={post.featuredImage.node.localFile}
                title={post.title}
              />
            </aside>
            <section css={ß.section}>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              {post.videoThingy.credits && (
                <>
                  <h3>Credits:</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.videoThingy.credits,
                    }}
                  />
                </>
              )}
            </section>
            <RelatedPosts relatedPosts={post?.related_posts} />
          </article>
        </main>
      </Layout>
    </>
  );
};

VideosPage.propTypes = {
  data: PropTypes.shape({
    wpVideo: PropTypes.object,
  }),
};

export const data = graphql`
  query Video($id: String) {
    wpVideo(id: { eq: $id }) {
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
      videoThingy {
        credits
        featuredVideo {
          mediaItemUrl
          sourceUrl
          publicUrl
          localFile {
            publicURL
          }
        }
      }
      related_posts {
        posts {
          ... on WpPost {
            id
            title
            slug
          }
          ... on WpVideo {
            id
            title
            link
          }
        }
      }
    }
  }
`;

export default VideosPage;
