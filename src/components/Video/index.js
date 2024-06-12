import styles from '@/css/VideoComponent.module.css';
import { video } from '@/types/index';
import { getVideoName } from '@/utils';

const Video = async ({ data }) => (
  <video
    className={styles.video}
    controls
    src={getVideoName(data.slug, data.videoThingy.featuredVideo.mediaItemUrl)}
    poster={data.featuredImage.node.sourceUrl}
    controlsList="nodownload noplaybackrate"
    disablePictureInPicture
    preload="metadata"
    title={data.title}
  >
    Sorry, your browser doesn&rsquo;t support embedded videos
  </video>
);

Video.propTypes = video;

export default Video;
