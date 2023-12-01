import React from 'react';
import { dataAny } from '@types/index';

import * as ß from './styles';

import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const VideoTile = ({ data }) => (
  <Link
    to={data.path}
    title={data.title}
    key={data.path}
    css={ß.removeDecoration}
  >
    <article css={ß.videoTile}>
      <header>
        <h2>{data.title}</h2>
      </header>
      <aside>
        <GatsbyImage
          image={getImage(data.featuredImage.node.localFile)}
          alt={data.title}
        />
      </aside>
    </article>
  </Link>
);

VideoTile.propTypes = dataAny;

export default VideoTile;
