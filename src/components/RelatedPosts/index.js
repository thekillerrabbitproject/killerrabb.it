import React from 'react';

import PostSlider from '@/components/Slides/Posts';
import SlidesVideos from '@/components/Slides/Videos';
import styles from '@/css/RelatedPostsComponent.module.css';
import { dataAny } from '@/types/index';

const RelatedPosts = ({ data }) => {
  if (data?.posts) {
    const ids = data?.posts?.map((post) => post?.id);

    return (
      <div css={styles.wrapper}>
        <SlidesVideos ids={ids} title="Related Videos" />
        <PostSlider ids={ids} title="Related Posts" />
      </div>
    );
  }
};

RelatedPosts.propTypes = dataAny;

export default RelatedPosts;
