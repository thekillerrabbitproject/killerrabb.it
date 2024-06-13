import styles from '@/css/VideoComponent.module.css';
import { video } from '@/types/index';
import { getImageLocalSrc, getVideoName } from '@/utils';

const Video = async ({ data }) => {
  const { jpg: poster } = getImageLocalSrc({
    sourceUrl: data.featuredImage.node.sourceUrl,
  });

  return (
    <video
      className={styles.video}
      controls
      src={getVideoName(data.slug, data.videoThingy.featuredVideo.mediaItemUrl)}
      poster={poster}
      controlsList="nodownload noplaybackrate"
      disablePictureInPicture
      preload="metadata"
      title={data.title}
    >
      Sorry, your browser doesn&rsquo;t support embedded videos
    </video>
  );
};

Video.propTypes = video;

export default Video;
