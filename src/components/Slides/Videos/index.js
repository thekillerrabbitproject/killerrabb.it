import SectionScroll from '@/components/Slides/Helpers/SectionScroll';
import styles from '@/css/Slides/Videos.module.css';
import { query } from '@/graphql/Videos';
import { sliders } from '@/types/index';
import client from '@/utils/apollo-client';

import VideoTile from './VideoTile';

async function getData(ids = []) {
  try {
    const res = await client.query({
      query,
      variables: {
        where: {
          in: ids,
        },
      },
    });

    return res?.data?.videos?.nodes ?? [];
  } catch (error) {
    console.error(error);
  }
}

const SlidesVideos = async ({
  disableSlider = false,
  title = 'Recent Videos',
  ids = [],
}) => {
  const data = await getData(ids);
  const hasContent = data?.length > 0;

  const cssSliderClassName = disableSlider
    ? styles.disabledVideoSlider
    : styles.videoSlider;

  return (
    hasContent && (
      <>
        <h2>{title}</h2>
        <SectionScroll className={cssSliderClassName}>
          {data.map((content) => (
            <VideoTile key={content.uri} data={content} />
          ))}
        </SectionScroll>
      </>
    )
  );
};

SlidesVideos.propTypes = sliders;

export default SlidesVideos;
