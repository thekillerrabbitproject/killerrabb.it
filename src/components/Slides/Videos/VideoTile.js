import React from 'react';
import { dataAny } from '@types/index';

import * as ß from './styles';

import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const VideoTile = ({ data }) => {
  const image = data.featuredImage.node.localFile;

  return (
    <article css={ß.videoTile(image.childImageSharp.gatsbyImageData)}>
      <Link
        to={data.path}
        title={data.title}
        key={data.path}
        css={ß.removeDecoration}
      >
        <h2 css={ß.title}>{data.title}</h2>
        <GatsbyImage
          image={getImage(data.featuredImage.node.localFile)}
          alt={data.title}
        />
      </Link>
    </article>
  );
};

VideoTile.propTypes = dataAny;

export default VideoTile;
