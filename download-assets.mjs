import pkg from '@apollo/client';
import { onError } from '@apollo/client/link/error/index.js';
import { RetryLink } from '@apollo/client/link/retry/index.js';

import query from './src/graphql/Downloader/StaticAssets.mjs';
import shareService from './src/utils/shareimage.mjs';

import fs from 'fs-extra';

const { ApolloClient, from, HttpLink, InMemoryCache } = pkg;

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  const queryAndVariables = {
    query: print(operation.query),
    variables: operation?.variables,
  };

  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      console.error(
        {
          error,
          ...queryAndVariables,
        },
        'errorLink GraphQL error',
      );
    }
  }

  if (networkError) {
    console.error(
      {
        error: networkError,
        ...queryAndVariables,
      },
      'errorLink Network error',
    );
  }
});

const retryLink = new RetryLink({
  attempts: {
    max: 2,
  },
  delay: {
    initial: 20_000, // 20s secconds in milliseconds, it multiplies exponentialy
    max: 60_000, // 1 minute in milliseconds
  },
});

const httpLink = new HttpLink({
  uri: 'https://www.tkrp.net/graphql',
});

const client = new ApolloClient({
  link: from([errorLink, retryLink, httpLink]),
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
