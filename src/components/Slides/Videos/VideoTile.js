import Image from '@/components/Image';
import styles from '@/css/Slides/Videos.module.css';
import { dataAny } from '@/types/index';

import Link from 'next/link';

const VideoTile = ({ data }) =>
  data.thumbnails.featuredImage && (
    <article
      className={styles.videoTile}
      key={data.uri}
      style={{
        '--width': `${data.thumbnails.featuredImage.width}px`,
        '--height': `${data.thumbnails.featuredImage.height}px`,
      }}
    >
      <Link
        href={data.uri}
        title={data.title}
        className={styles.removeDecoration}
      >
        <h2 className={styles.videoTileTitle}>{data.title}</h2>
        <Image
          alt={data.title}
          className={styles.videoTileImage}
          width={data.thumbnails.featuredImage.width}
          height={data.thumbnails.featuredImage.height}
          {...data.thumbnails.featuredImage}
        />
      </Link>
    </article>
  );

VideoTile.propTypes = dataAny;

export default VideoTile;
