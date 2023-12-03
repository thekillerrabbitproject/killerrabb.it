import React from 'react';
import { dataAny } from '@types';
import { isDuplicatedFromGallery } from '@utils';

import Image from './Image';
import * as ß from './styles';

const PostSlider = ({ data }) => (
  <div css={ß.slider}>
    {!isDuplicatedFromGallery(data) && (
      <Image
        data={{ title: data.title, image: data.featuredImage.node.localFile }}
      />
    )}
    {data.acf.gallery.map((image) => (
      <Image
        key={image.id}
        data={{
          title: data.title,
          image: image.localFile,
        }}
      />
    ))}
  </div>
);

PostSlider.propTypes = dataAny;

export default PostSlider;
