import pkg from '@apollo/client';

import query from './src/graphql/Downloader/StaticAssets.mjs';
// import imageConverter from './src/utils/image-converter.mjs';
// import externalImagesDownloader from './src/utils/image-downloader.mjs';
// import imageResizeAndBlur from './src/utils/image-resize-blur.mjs';
import shareService from './src/utils/shareimage.mjs';

import fs from 'fs-extra';
// import externalVideosDownloader from './src/utils/video-downloader.mjs';

const { ApolloClient, InMemoryCache } = pkg;

const client = new ApolloClient({
  uri: 'https://www.tkrp.net/graphql',
  cache: new InMemoryCache({}),
});

async function getData() {
  try {
    const res = await client.query({
      query,
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
    src: content.featuredImage.node.thumbnailSize,
  },
  {
    slug: `${content.__typename.toLowerCase()}/${content.slug}/featured`,
    src: content.featuredImage.node.fullSize,
    fullsize: true,
  },
]);

const postsGalleryImagesThumbnails = postsNodes.flatMap((content) =>
  content.acf.gallery.flatMap((gallery) => [
    {
      slug: `${content.__typename.toLowerCase()}/${content.slug}/thumbnails`,
      src: gallery.thumbnailSize,
    },
    {
      slug: `${content.__typename.toLowerCase()}/${content.slug}`,
      src: gallery.fullSize,
      fullsize: true,
    },
  ]),
);

const contentFeaturedImagesShare = contents.map((content) => ({
  slug: `${content.__typename.toLowerCase()}/${content.slug}`,
  src: shareService({
    title: content.title,
    image: content.featuredImage.node.sourceUrl,
    postType: content.__typename.toLowerCase(),
    categories: content.films.nodes,
  }),
  overrideName: 'share.png',
}));

const categoriesFeaturedImagesShare = categories.map((content) => ({
  slug: `${content.__typename.toLowerCase()}/${content.slug}`,
  src: shareService({
    title: `${content.__typename}: ${content.title}`,
    image: logoImages.get('no-logo'),
    postType: content.__typename.toLowerCase(),
    categories: [{ slug: content.slug }],
  }),
  overrideName: 'share.png',
}));

const staticPagesShare = [
  {
    slug: 'posts',
    src: shareService({
      title: 'Recent Posts',
      image: logoImages.get('no-logo'),
      postType: 'post',
    }),
    overrideName: 'share.png',
  },
  {
    slug: 'videos',
    src: shareService({
      title: 'Recent Videos',
      image: logoImages.get('no-logo'),
      postType: 'video',
    }),
    overrideName: 'share.png',
  },
];

const videos = videosNodes.map((content) => ({
  slug: content.slug,
  src: content.videoThingy.featuredVideo.mediaItemUrl,
}));

// await externalImagesDownloader({
//   manifest: [...postsGalleryImagesThumbnails, ...contentFeaturedImages],
//   destDir: './public/static-assets/images',
//   pattern: 'public/static-assets/images/{post,video}/**/*.*',
//   remoteImagesDownloadsDelay: 500,
// });

// await externalImagesDownloader({
//   manifest: [
//     ...contentFeaturedImagesShare,
//     ...categoriesFeaturedImagesShare,
//     ...staticPagesShare,
//   ],
//   pattern: 'public/static-assets/shareimages/**/*.*',
//   destDir: './public/static-assets/shareimages',
//   remoteImagesDownloadsDelay: 500,
// });

// await externalVideosDownloader({
//   manifest: videos,
//   destDir: './public/static-assets/videos',
//   remoteVideosDownloadsDelay: 500,
// });

// await imageConverter();

// await imageResizeAndBlur();

const getFileName = ({ src, fullsize = false }) => {
  const { length, [length - 1]: fileName, ...rest } = src.split('/');

  const realname = fullsize ? fileName.replace('-scaled', '') : fileName;

  return `${Object.values(rest).join('/')}/${realname}`;
};

const remoteFiles = [
  ...postsGalleryImagesThumbnails,
  ...contentFeaturedImages,
  ...videos,
].map((obj) => ({ ...obj, src: getFileName(obj) }));

const remoteFilesJson = 'src/json/remoteFiles.json';

fs.writeFileSync(remoteFilesJson, JSON.stringify(remoteFiles, null, 2));

const rsyncString = remoteFiles
  .map((obj) => obj.src.replace('https://www.tkrp.net/', 'tkrp.net/'))
  .join('\n');

const rsyncTxt = 'src/json/rsyncRemoteFiles.txt';

fs.writeFileSync(rsyncTxt, rsyncString);

const remoteShareFiles = [
  ...contentFeaturedImagesShare,
  ...categoriesFeaturedImagesShare,
  ...staticPagesShare,
].map((obj) => ({ ...obj, src: getFileName(obj) }));

const remoteShareFilesJson = 'src/json/remoteShareFiles.json';

fs.writeFileSync(
  remoteShareFilesJson,
  JSON.stringify(remoteShareFiles, null, 2),
);
