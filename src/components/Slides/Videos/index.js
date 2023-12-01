import React from 'react';
import PropTypes from 'prop-types';
import { dataAny } from '@types/index';

import * as ß from './styles';
import VideoTile from './VideoTile';

const SlidesVideos = ({ data, disableSlider }) => {
  const { nodes } = data;

  const disableSliderCSS = disableSlider && ß.disabledVideoSlider;

  const hasContent = nodes?.length;

  return hasContent ? (
    <>
      <h2>Recent Videos</h2>
      <section css={[ß.videoSlider, disableSliderCSS]}>
        {nodes.map((content) => (
          <VideoTile key={content.path} data={content} />
        ))}
      </section>
    </>
  ) : null;
};

SlidesVideos.propTypes = { ...dataAny, disableSlider: PropTypes.bool };

SlidesVideos.defaultProps = {
  disableSlider: false,
};

export default SlidesVideos;
