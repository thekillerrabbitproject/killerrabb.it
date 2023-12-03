import React from 'react';
import PostSlider from '@components/Slides/Posts';
import SlidesVideos from '@components/Slides/Videos';
import { dataAny } from '@types/index';

import * as ß from './styles';
import { clean } from './utils';

const RelatedPosts = ({ data }) => {
  const posts = clean(data?.posts || []);
  const videos = clean(data?.videos || []);

  const hasPosts = posts?.length > 0;
  const hasVideos = videos?.length > 0;
  const hasPostsOrVideos = hasPosts || hasVideos;

  const postsObj = { nodes: posts };
  const videosObj = { nodes: videos };

  return hasPostsOrVideos ? (
    <div css={ß.wrapper}>
      {hasVideos && <SlidesVideos data={videosObj} title="Related Videos" />}
      {hasPosts && <PostSlider data={postsObj} title="Related Posts" />}
    </div>
  ) : null;
};

RelatedPosts.propTypes = dataAny;

export default RelatedPosts;
