import React from 'react';
import { sliders } from '@types/index';
import { isDuplicatedFromGallery } from '@utils';

import Image from './Image';
import Meta from './Meta';
import * as ß from './styles';

const SlidesPosts = ({ data, title }) => {
  const { nodes } = data;

  const hasContent = nodes?.length;

  return hasContent ? (
    <>
      <h2>{title}</h2>
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

SlidesPosts.propTypes = sliders;

SlidesPosts.defaultProps = {
  title: 'Recent Posts',
};

export default SlidesPosts;
