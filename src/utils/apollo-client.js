import { ApolloClient, InMemoryCache } from '@apollo/client';

import { getImageLocalSrc } from '@/utils';

const postImagesFields = {
  fields: {
    thumbnails: {
      read(_, { readField }) {
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
          featuredImage: featuredImageThumbnailLocalSrc,
          gallery: galleryLocalThumbnailSrc,
        };

        return thumbnails;
      },
    },
    images: {
      read(_, { readField }) {
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
        const galleryFullSizeLocalSrc = gallery.map((gal) => ({
          ...getImageLocalSrc({
            sourceUrl: readField('sourceUrl', gal),
            pathPrefix: 'post/',
            slug,
          }),
          ...readField('mediaDetails', gal),
        }));

        return {
          featuredImage: featuredImageFullSizeLocalSrc,
          gallery: galleryFullSizeLocalSrc,
        };
      },
    },
  },
};

const videoImagesFields = {
  fields: {
    thumbnails: {
      read(_, { readField }) {
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
          featuredImage: featuredImageThumbnailLocalSrc,
        };

        return thumbnails;
      },
    },
    images: {
      read(_, { readField }) {
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

        return { featuredImage: featuredImageFullSizeLocalSrc };
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
          mediaDetails: {
            merge: true,
          },
        },
      },
    },
  }),
});

export default client;
