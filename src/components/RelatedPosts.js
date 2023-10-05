import * as React from 'react';

import PropTypes from 'prop-types';
import Link from 'gatsby-plugin-transition-link/AniLink';
import { tertiary } from '@css/utils/color';
import { relatedPosts as relatepostsCSS } from '@css/misc';

const getlink = (post) => {
  if (post?.slug) {
    return `/${post.slug}`;
  }
  return post.link;
};

const RelatedPosts = ({ relatedPosts }) => {
  const posts = relatedPosts?.posts || [];
  const hasPosts = posts?.length > 0;
  return (
    hasPosts && (
      <section css={relatepostsCSS} className="related-posts">
        <h3>Related Posts:</h3>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link to={getlink(post)} paintDrip hex={tertiary}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    )
  );
};

RelatedPosts.propTypes = {
  relatedPosts: PropTypes.object,
};

export default RelatedPosts;
