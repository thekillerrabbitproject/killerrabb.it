import Image from '@/components/Image';
import styles from '@/css/Slides/Post.module.css';
import { dataAny } from '@/types';
import { isDuplicatedFromGallery } from '@/utils';

import SectionScroll from '../Helpers/SectionScroll';

const PostSlider = ({ data }) => (
  <SectionScroll className={styles.slider} scrollBySingle>
    {!isDuplicatedFromGallery(data) && (
      <Image
        alt={data.title}
        cssOverride={{
          width: `calc(var(--slider-default-height) / ${data.featuredImage.node.mediaDetails.height}px)`,
          height: 'var(--slider-default-height)',
        }}
        className={styles.image}
        width={data.featuredImage.node.mediaDetails.width}
        height={data.featuredImage.node.mediaDetails.height}
        sourceUrl={data.featuredImage.node.sourceUrl}
        isFeatured
      />
    )}
    {data.acf.gallery.map((image, index) => (
      <Image
        key={`${image.id}-${index}`}
        alt={data.title}
        cssOverride={{
          width: `calc(var(--slider-default-height) / ${image.mediaDetails.width}px)`,
          height: 'var(--slider-default-height)',
        }}
        className={styles.image}
        width={image.mediaDetails.width}
        height={image.mediaDetails.height}
        sourceUrl={image.sourceUrl}
      />
    ))}
  </SectionScroll>
);

PostSlider.propTypes = dataAny;

export default PostSlider;
