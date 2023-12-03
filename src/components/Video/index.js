import React from 'react';
import { video } from '@types/index';

import * as ß from './styles';

import { getSrc } from 'gatsby-plugin-image';

const Video = ({ title, videoUrl, cover }) => (
  <video
    css={ß.video}
    controls
    src={videoUrl}
    poster={getSrc(cover)}
    controlsList="nodownload noplaybackrate"
    disablePictureInPicture
    preload="metadata"
    title={title}
  >
    Sorry, your browser doesn&rsquo;t support embedded videos
  </video>
);

Video.propTypes = video;

export default Video;
