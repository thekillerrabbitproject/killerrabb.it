import pkg from '@apollo/client';

import query from './src/graphql/Downloader/StaticAssets.mjs';
import imageConverter from './src/utils/image-converter.mjs';
import externalImagesDownloader from './src/utils/image-downloader.mjs';
import shareService from './src/utils/shareimage.mjs';
import externalVideosDownloader from './src/utils/video-downloader.mjs';

const { ApolloClient, InMemoryCache } = pkg;

const client = new ApolloClient({
  uri: 'https://www.tkrp.net/graphql',
  cache: new InMemoryCache({}),
});

async function getData(slug) {
  try {
    const res = await client.query({
      query,
      variables: {
        slug,
      },
    });

    return res?.data ?? [];
  } catch (error) {
    console.error(error);
  }
}

const data = await getData();

const {
  posts: { nodes: postsNodes = [] } = {},
  videos: { nodes: videosNodes = [] } = {},
  films: { nodes: filmsNodes = [] } = {},
  models: { nodes: modelsNodes = [] } = {},
} = data;

const contents = [...postsNodes, ...videosNodes];
const categories = [...filmsNodes, ...modelsNodes];

const logoImages = new Map([
  [
    'no-logo',
    'https://www.tkrp.net/wp-content/uploads/2024/06/share-tkrp-no-logo.png',
  ],
  ['logo', 'https://www.tkrp.net/wp-content/uploads/2024/06/share-tkrp.png'],
]);

const contentFeaturedImages = contents.flatMap((content) => [
  {
    slug: `${content.__typename.toLowerCase()}/${
      content.slug
    }/thumbnails/featured`,
    imageSrc: content.featuredImage.node.thumbnailSize,
  },
  {
    slug: `${content.__typename.toLowerCase()}/${content.slug}/featured`,
    imageSrc: content.featuredImage.node.fullSize,
  },
]);

const postsGalleryImagesThumbnails = postsNodes.flatMap((content) =>
  content.acf.gallery.flatMap((gallery) => [
    {
      slug: `${content.__typename.toLowerCase()}/${content.slug}/thumbnails`,
      imageSrc: gallery.thumbnailSize,
    },
    {
      slug: `${content.__typename.toLowerCase()}/${content.slug}`,
      imageSrc: gallery.fullSize,
    },
  ]),
);

const contentFeaturedImagesShare = contents.map((content) => ({
  slug: `${content.__typename.toLowerCase()}/${content.slug}`,
  imageSrc: shareService({
    title: content.title,
    image: content.featuredImage.node.sourceUrl,
    postType: content.__typename.toLowerCase(),
    categories: content.films.nodes,
  }),
  overrideName: 'share.png',
}));

const categoriesFeaturedImagesShare = categories.map((content) => ({
  slug: `${content.__typename.toLowerCase()}/${content.slug}`,
  imageSrc: shareService({
    title: `${content.__typename}: ${content.title}`,
    image: logoImages.get('no-logo'),
    postType: content.__typename.toLowerCase(),
    categories: [{ slug: content.slug }],
  }),
  overrideName: 'share.png',
}));

const staticPages = [
  {
    slug: 'posts',
    imageSrc: shareService({
      title: 'Recent Posts',
      image: logoImages.get('no-logo'),
      postType: 'post',
    }),
    overrideName: 'share.png',
  },
  {
    slug: 'videos',
    imageSrc: shareService({
      title: 'Recent Videos',
      image: logoImages.get('no-logo'),
      postType: 'video',
    }),
    overrideName: 'share.png',
  },
];

const videos = videosNodes.map((content) => ({
  slug: content.slug,
  videoSrc: content.videoThingy.featuredVideo.mediaItemUrl,
}));

await externalImagesDownloader({
  manifest: [...postsGalleryImagesThumbnails, ...contentFeaturedImages],
  destDir: './public/static-assets/images',
  remoteImagesDownloadsDelay: 200,
});

await externalImagesDownloader({
  manifest: [
    ...contentFeaturedImagesShare,
    ...categoriesFeaturedImagesShare,
    ...staticPages,
  ],
  destDir: './public/static-assets/shareimages',
  remoteImagesDownloadsDelay: 200,
});

await externalVideosDownloader({
  manifest: videos,
  destDir: './public/static-assets/videos',
  remoteVideosDownloadsDelay: 200,
});

await imageConverter();
