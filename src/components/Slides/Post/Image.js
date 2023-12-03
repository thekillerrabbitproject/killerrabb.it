import React from 'react';
import { dataAny } from '@types';

import * as ß from './styles';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Image = ({ data }) => (
  <div css={ß.imageWrapper(data.image.childImageSharp.gatsbyImageData)}>
    <GatsbyImage
      image={getImage(data.image)}
      objectFit="contain"
      alt={data.title}
    />
  </div>
);

Image.propTypes = dataAny;

export default Image;
