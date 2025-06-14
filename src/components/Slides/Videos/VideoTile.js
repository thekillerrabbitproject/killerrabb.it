import Image from '@/components/Image';
import styles from '@/css/Slides/Videos.module.css';
import { dataAny } from '@/types/index';

import { Link } from 'next-view-transitions';

const VideoTile = ({ data }) =>
  data.featuredImage && (
    <article
      className={styles.videoTile}
      key={data.uri}
      style={{
        '--width': `${
          data.featuredImage.node.mediaDetails.sizes.at(0).width
        }px`,
        '--height': `${
          data.featuredImage.node.mediaDetails.sizes.at(0).height
        }px`,
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
          width={data.featuredImage.node.mediaDetails.sizes.at(0).width}
          height={data.featuredImage.node.mediaDetails.sizes.at(0).height}
          sourceUrl={data.featuredImage.node.mediaDetails.sizes.at(0).sourceUrl}
          isFeatured
        />
      </Link>
    </article>
  );

VideoTile.propTypes = dataAny;

export default VideoTile;
