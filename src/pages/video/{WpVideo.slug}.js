import React from 'react';
import Content from '@components/Content';
import Layout from '@components/Layout';
import Meta from '@components/Meta';
import RelatedPosts from '@components/RelatedPosts';
import SEO from '@components/SEO';
import Title from '@components/Title';
import Video from '@components/Video';
import { dataAny } from '@types';

import { graphql } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';

const VideoPage = ({ data }) => {
  const video = data.wpVideo;

  return (
    <Layout>
      <Title title={video.title} isVideo hasShare />
      <Video
        title={video.title}
        cover={video.featuredImage.node.localFile}
        videoUrl={
          video?.videoThingy?.featuredVideo?.localFile?.publicURL ||
          video.videoThingy.featuredVideo.publicUrl
        }
      />
      <Meta data={video} />
      <Content content={video.content} />
      <Title title="Credits" isVideo />
      <Content content={video.videoThingy.credits} />
      <RelatedPosts data={video.relatedPosts} />
    </Layout>
  );
};

VideoPage.propTypes = dataAny;

const HeadSEO = ({ data }) => (
  <SEO
    title={data.wpVideo.title}
    pathname={data.wpVideo.path}
    image={getSrc(data.wpVideo.featuredImage.node.localFile.shareImage)}
    postType="video"
    categories={data.wpVideo.films.nodes}
    video={
      data.wpVideo.videoThingy?.featuredVideo?.localFile?.publicURL ||
      data.wpVideo.videoThingy?.featuredVideo?.publicUrl
    }
  />
);

HeadSEO.propTypes = dataAny;

export const Head = HeadSEO;

export default VideoPage;

export const data = graphql`
  query VideoPage($slug: String) {
    wpVideo(slug: { eq: $slug }) {
      ...VideoPost
      ...FeaturedImageConstrained
      relatedPosts: related_posts {
        ...VideoRelatedPosts
      }
      video: videoThingy {
        ...VideoThingy
      }
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
`;
