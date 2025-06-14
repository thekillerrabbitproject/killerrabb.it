import Image from '@/components/Image';
import Meta from '@/components/Meta';
import SectionScroll from '@/components/Slides/Helpers/SectionScroll';
import styles from '@/css/Slides/Posts.module.css';
import { query } from '@/graphql/Posts';
import { sliders } from '@/types/index';
import { isDuplicatedFromGallery } from '@/utils';
import client from '@/utils/apollo-client';

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

    return res?.data?.posts?.nodes ?? [];
  } catch (error) {
    console.error(error);
  }
}

const SlidesPosts = async ({ title = 'Recent Posts', ids = [] }) => {
  const data = await getData(ids);
  const hasContent = data?.length > 0;

  return (
    hasContent && (
      <>
        <h2>{title}</h2>
        {data.map((content) => (
          <SectionScroll key={content.uri} className={styles.innerSlider}>
            <Meta data={content} showTitle />
            {!isDuplicatedFromGallery(content) && (
              <Image
                alt={content.title}
                uri={content.uri}
                width={
                  content.featuredImage.node.mediaDetails.sizes.at(0).width
                }
                height={
                  content.featuredImage.node.mediaDetails.sizes.at(0).height
                }
                sourceUrl={
                  content.featuredImage.node.mediaDetails.sizes.at(0).sourceUrl
                }
                isFeatured
              />
            )}
            {content.acf.gallery.map((image) => (
              <Image
                key={image.id}
                alt={content.title}
                uri={content.uri}
                width={image.mediaDetails.sizes.at(0).width}
                height={image.mediaDetails.sizes.at(0).height}
                sourceUrl={image.mediaDetails.sizes.at(0).sourceUrl}
              />
            ))}
          </SectionScroll>
        ))}
      </>
    )
  );
};

SlidesPosts.propTypes = sliders;

export default SlidesPosts;
