import * as React from 'react';

import PropTypes from 'prop-types';
import Link from 'gatsby-plugin-transition-link/AniLink';
import { tertiary } from '@css/utils/color';
import { relatedPosts as relatepostsCSS } from '@css/misc';

const noEmptyBS = (arr) =>
  arr?.filter((value) => Object.keys(value).length !== 0) ?? [];

const RelatedPosts = ({ relatedPosts }) => {
  const posts = noEmptyBS(relatedPosts?.posts || []);
  const videos = noEmptyBS(relatedPosts?.videos || []);

  const hasPosts = posts?.length > 0;
  const hasVideos = videos?.length > 0;
  const hasPostsOrVideos = hasPosts || hasVideos;

  return (
    hasPostsOrVideos && (
      <section css={relatepostsCSS} className="related-posts">
        {hasPosts && (
          <>
            <h3>Related Posts:</h3>
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <Link to={`/${post.slug}`} paintDrip hex={tertiary}>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
        {hasVideos && (
          <>
            <h3>Related Videos:</h3>
            <ul>
              {videos.map((post) => (
                <li key={post.id}>
                  <Link to={post.link} paintDrip hex={tertiary}>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    )
  );
};

RelatedPosts.propTypes = {
  relatedPosts: PropTypes.object,
};

export default RelatedPosts;
