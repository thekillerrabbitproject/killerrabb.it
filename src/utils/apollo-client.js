import { ApolloClient, InMemoryCache } from '@apollo/client';

import blurImageCache from '@/json/blur.json';
import { getImageLocalSrc, removeScaled } from '@/utils';

try {
  JSON.parse(JSON.stringify(blurImageCache));
} catch (error) {
  throw new Error('blurImageCache failed', error);
}

const getBlurImage = (image) => {
  try {
    return blurImageCache[`public${image.jpg}`];
  } catch (error) {
    throw new Error(`getBlurImage failed for ${image}`, error);
  }
};

const postImagesFields = {
  fields: {
    thumbnails: {
      read(_, { readField }) {
        try {
          const slug = readField('slug');

          const featuredImageThumbnail = readField(
            'mediaDetails',
            readField('node', readField('featuredImage')),
          )?.['sizes({"include":"NEXTJS_THUMBNAIL"})']?.at(0);

          const gallery = readField('gallery', readField('acf'));

          const galleryLocalThumbnailSrc = gallery
            .map((gal) =>
              readField('mediaDetails', gal)?.[
                'sizes({"include":"NEXTJS_THUMBNAIL"})'
              ]?.at(0),
            )
            .filter(Boolean)
            .map((thumb) => ({
              ...getImageLocalSrc({
                sourceUrl: thumb.sourceUrl,
                isThumbnail: true,
                pathPrefix: 'post/',
                slug,
              }),
              width: thumb.width,
              height: thumb.height,
            }))
            .map((thumb) => ({
              ...thumb,
              blur: getBlurImage(thumb),
            }));

          const featuredImageThumbnailLocalSrc = {
            ...getImageLocalSrc({
              sourceUrl: featuredImageThumbnail.sourceUrl,
              isThumbnail: true,
              isFeatured: true,
              pathPrefix: 'post/',
              slug,
            }),
            width: featuredImageThumbnail.width,
            height: featuredImageThumbnail.height,
          };

          const thumbnails = {
            featuredImage: {
              ...featuredImageThumbnailLocalSrc,
              blur: getBlurImage(featuredImageThumbnailLocalSrc),
            },
            gallery: galleryLocalThumbnailSrc,
          };

          return thumbnails;
        } catch (error) {
          throw new Error('postImagesFields thumbnails error', error);
        }
      },
    },
    images: {
      read(_, { readField }) {
        try {
          const slug = readField('slug');

          const featuredImage = readField('node', readField('featuredImage'));
          const sourceUrl = readField('sourceUrl', featuredImage);
          const mediaDetails = readField('mediaDetails', featuredImage);

          const featuredImageFullSizeLocalSrc = {
            ...getImageLocalSrc({
              sourceUrl,
              slug,
              isFeatured: true,
              pathPrefix: 'post/',
            }),
            width: mediaDetails.width,
            height: mediaDetails.height,
          };

          const gallery = readField('gallery', readField('acf'));
          const galleryFullSizeLocalSrc = gallery
            .map((gal) => ({
              ...getImageLocalSrc({
                sourceUrl: readField('sourceUrl', gal),
                pathPrefix: 'post/',
                slug,
              }),
              ...readField('mediaDetails', gal),
            }))
            .map((img) => ({
              ...img,
              blur: getBlurImage(img),
            }));

          return {
            featuredImage: {
              ...featuredImageFullSizeLocalSrc,
              blur: getBlurImage(featuredImageFullSizeLocalSrc),
            },
            gallery: galleryFullSizeLocalSrc,
          };
        } catch (error) {
          throw new Error('postImagesFields images error', error);
        }
      },
    },
  },
};

const videoImagesFields = {
  fields: {
    thumbnails: {
      read(_, { readField }) {
        try {
          const slug = readField('slug');

          const featuredImageThumbnail = readField(
            'mediaDetails',
            readField('node', readField('featuredImage')),
          )?.['sizes({"include":"NEXTJS_THUMBNAIL"})']?.at(0);

          const featuredImageThumbnailLocalSrc = {
            ...getImageLocalSrc({
              sourceUrl: featuredImageThumbnail.sourceUrl,
              isThumbnail: true,
              isFeatured: true,
              pathPrefix: 'video/',
              slug,
            }),
            width: featuredImageThumbnail.width,
            height: featuredImageThumbnail.height,
          };

          const thumbnails = {
            featuredImage: {
              ...featuredImageThumbnailLocalSrc,
              blur: blurImageCache[
                `public${featuredImageThumbnailLocalSrc.jpg}`
              ],
            },
          };

          return thumbnails;
        } catch (error) {
          throw new Error('videoImagesFields thumbnails error', error);
        }
      },
    },
    images: {
      read(_, { readField }) {
        try {
          const slug = readField('slug');

          const featuredImage = readField('node', readField('featuredImage'));
          const sourceUrl = readField('sourceUrl', featuredImage);
          const mediaDetails = readField('mediaDetails', featuredImage);

          const featuredImageFullSizeLocalSrc = {
            ...getImageLocalSrc({
              sourceUrl,
              slug,
              isFeatured: true,
              pathPrefix: 'video/',
            }),
            width: mediaDetails.width,
            height: mediaDetails.height,
          };

          return {
            featuredImage: {
              ...featuredImageFullSizeLocalSrc,
              blur: blurImageCache[
                `public${featuredImageFullSizeLocalSrc.jpg}`
              ],
            },
          };
        } catch (error) {
          throw new Error('videoImagesFields images error', error);
        }
      },
    },
  },
};

const client = new ApolloClient({
  uri: 'https://www.tkrp.net/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Post: postImagesFields,
      Video: videoImagesFields,
      MediaItem: {
        fields: {
          sourceUrl: {
            read(sourceUrl) {
              return removeScaled(sourceUrl);
            },
          },
          mediaDetails: {
            merge: true,
          },
        },
      },
    },
  }),
});

export default client;
