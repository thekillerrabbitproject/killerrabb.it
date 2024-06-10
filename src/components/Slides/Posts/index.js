import Image from '@/components/Image';
import Meta from '@/components/Meta';
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
          <section key={content.uri}>
            <article className={styles.innerSlider}>
              <Meta data={content} showTitle />
              {!isDuplicatedFromGallery(content) && (
                <Image
                  alt={content.title}
                  uri={content.uri}
                  slug={content.slug}
                  width={content.thumbnails.featuredImage.width}
                  height={content.thumbnails.featuredImage.height}
                  isFeatured
                  {...content.thumbnails.featuredImage}
                />
              )}
              {content.thumbnails.gallery.map((image) => (
                <Image
                  key={image.jpg}
                  alt={content.title}
                  uri={content.uri}
                  width={image.width}
                  height={image.height}
                  isThumbnail
                  {...image}
                />
              ))}
            </article>
          </section>
        ))}
      </>
    )
  );
};

SlidesPosts.propTypes = sliders;

export default SlidesPosts;
