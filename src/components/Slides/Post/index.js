import Image from '@/components/Image';
import styles from '@/css/Slides/Post.module.css';
import { dataAny } from '@/types';
import { isDuplicatedFromGallery } from '@/utils';

const PostSlider = ({ data }) => (
  <div className={styles.slider}>
    {!isDuplicatedFromGallery(data) && (
      <Image
        alt={data.title}
        width={data.images.featuredImage.width}
        height={data.images.featuredImage.height}
        cssOverride={{
          width: `calc(var(--slider-default-height) / ${data.images.featuredImage.height}px)`,
          height: 'var(--slider-default-height)',
        }}
        isFeatured
        className={styles.image}
        {...data.images.featuredImage}
      />
    )}
    {data.images.gallery.map((image) => (
      <Image
        key={image.id}
        alt={data.title}
        width={image.width}
        height={image.height}
        cssOverride={{
          width: `calc(var(--slider-default-height) / ${image.width}px)`,
          height: 'var(--slider-default-height)',
        }}
        className={styles.image}
        {...image}
      />
    ))}
  </div>
);

PostSlider.propTypes = dataAny;

export default PostSlider;
