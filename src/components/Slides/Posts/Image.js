import React from 'react';
import { dataAny, slidePostsImage } from '@types/index';

import * as ß from './styles';

import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Image = ({ data, image, isFeatured }) => {
  const className = isFeatured ? 'featured' : 'image';

  return (
    <div
      css={ß.imageWrapper(image.childImageSharp.gatsbyImageData)}
      className={className}
    >
      <Link to={data.path} title={data.title}>
        <GatsbyImage
          image={getImage(image)}
          objectFit="contain"
          alt={data.title}
        />
      </Link>
    </div>
  );
};

Image.propTypes = {
  ...dataAny,
  ...slidePostsImage,
};

Image.defaultProps = {
  isFeatured: false,
};

export default Image;
