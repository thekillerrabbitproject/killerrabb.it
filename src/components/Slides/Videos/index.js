import React from 'react';
import { sliders } from '@types/index';

import * as ß from './styles';
import VideoTile from './VideoTile';

const SlidesVideos = ({ data, disableSlider, title }) => {
  const { nodes } = data;

  const disableSliderCSS = disableSlider && ß.disabledVideoSlider;

  const hasContent = nodes?.length;

  return hasContent ? (
    <>
      <h2>{title}</h2>
      <section css={[ß.videoSlider, disableSliderCSS]}>
        {nodes.map((content, index) => (
          <VideoTile key={content.path} data={content} isEager={index === 0} />
        ))}
      </section>
    </>
  ) : null;
};

SlidesVideos.propTypes = sliders;

SlidesVideos.defaultProps = {
  disableSlider: false,
  title: 'Recent Videos',
};

export default SlidesVideos;
