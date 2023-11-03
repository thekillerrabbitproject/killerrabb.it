import * as React from 'react';

import PropTypes from 'prop-types';

import Layout from '@components/Layout';
import SEO from '@components/SEO';
import Link from 'gatsby-plugin-transition-link/AniLink';

import { getWebp } from '../../utils';
import { tertiary } from '@css/utils/color';

import * as ß from '@css/video';
import VideoAside from '../../components/VideoAside';

const VideosPage = ({ pageContext }) => {
  const posts = pageContext?.posts ?? [];
  const cardImageUrl = `${getWebp(
    posts[0].featuredImage.node.localFile
  )}&text=TKRP Videos`;

  return posts.length > 0 ? (
    <>
      <SEO cardImage={cardImageUrl} />
      <Layout>
        <main css={ß.main}>
          <h1>TKRP Videos</h1>
          {posts.map((post) => (
            <article key={post.id} css={ß.article}>
              <aside css={ß.aside}>
                <VideoAside
                  videoUrl={
                    post.videoThingy.featuredVideo?.localFile?.publicURL ||
                    post.videoThingy.featuredVideo.publicUrl
                  }
                  cover={post.featuredImage.node.localFile}
                  title={post.title}
                />
              </aside>
              <section css={ß.section}>
                <h2>
                  <Link to={`/video/${post.slug}`} paintDrip hex={tertiary}>
                    {post.title}
                  </Link>
                </h2>
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
            </article>
          ))}
        </main>
      </Layout>
    </>
  ) : (
    <></>
  );
};

VideosPage.propTypes = {
  pageContext: PropTypes.shape({
    posts: PropTypes.array,
  }),
};

export default VideosPage;
