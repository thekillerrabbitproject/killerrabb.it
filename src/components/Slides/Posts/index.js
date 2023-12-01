import React from 'react';
import { dataAny } from '@types/index';

import Image from './Image';
import Meta from './Meta';
import * as ß from './styles';
import { isDuplicatedFromGallery } from './utils';

const SlidesPosts = ({ data }) => {
  const { nodes } = data;

  const hasContent = nodes?.length;

  return hasContent ? (
    <>
      <h2>Recent Posts</h2>
      {nodes.map((content) => (
        <section key={content.path}>
          <article css={ß.innerSlider}>
            <Meta data={content} />
            {!isDuplicatedFromGallery(content) && (
              <Image
                data={content}
                image={content.featuredImage.node.localFile}
                isFeatured
              />
            )}
            {content.acf.gallery.map((image) => (
              <Image key={image.id} data={content} image={image.localFile} />
            ))}
          </article>
        </section>
      ))}
    </>
  ) : null;
};

SlidesPosts.propTypes = dataAny;

export default SlidesPosts;
