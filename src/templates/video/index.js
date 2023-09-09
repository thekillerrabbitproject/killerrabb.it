import * as React from 'react';

import PropTypes from 'prop-types';

import Layout from '@components/Layout';
import SEO from '@components/SEO';

import { getWebp } from '../../utils';

import { container } from '@css/misc';

import * as ß from '@css/video';
import VideoAside from '../../components/VideoAside';

const VideoPage = ({ pageContext }) => {
  const posts = pageContext?.posts ?? [];
  const cardImageUrl = `${getWebp(
    posts[0].featuredImage.node.localFile
  )}&text=The Killer-Rabbit Photography`;

  return posts.length > 0 ? (
    <>
      <SEO cardImage={cardImageUrl} />
      <Layout>
        <main css={ß.main}>
          <h1>Videos</h1>
          {posts.map((post) => (
            <article key={post.id} css={ß.article}>
              <aside css={ß.aside}>
                <VideoAside
                  videoUrl={post.videoThingy.featuredVideo.mediaItemUrl}
                  cover={post.featuredImage.node.localFile}
                  title={post.title}
                />
              </aside>
              <section css={ß.section}>
                <h2>{post.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <div
                  dangerouslySetInnerHTML={{ __html: post.videoThingy.credits }}
                />
              </section>
            </article>
          ))}
        </main>
      </Layout>
    </>
  ) : (
    <></>
  );
};

VideoPage.propTypes = {
  pageContext: PropTypes.shape({
    posts: PropTypes.array,
  }),
};

export default VideoPage;
