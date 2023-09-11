import * as React from 'react';

import PropTypes from 'prop-types';

import * as ß from '@css/video';
import { getWebp } from '../utils';

const VideoAside = ({ videoUrl, cover, title }) => {
  return (
    <>
      <video
        css={ß.video}
        controls
        src={videoUrl}
        poster={getWebp(cover)}
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        preload="metadata"
      >
        Sorry, your browser doesn't support embedded videos
      </video>
    </>
  );
};

VideoAside.propTypes = {
  title: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  cover: PropTypes.object.isRequired,
};

export default VideoAside;
