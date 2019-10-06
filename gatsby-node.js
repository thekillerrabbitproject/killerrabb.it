const path = require(`path`);
const mangoSlugfy = require(`@mangocorporation/mango-slugfy`);
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const { curry, __, pipe, map, isEmpty, prop, flatten } = require('ramda');

const paginationPath = (page, totalPages, pfx) => {
  const prefix = isEmpty(pfx) ? `/` : pfx;
  if (page === 0) {
    return `${prefix}`;
  } else if (page < 0 || page >= totalPages) {
    return '';
  } else {
    return `${prefix}${page + 1}`;
  }
};

const getAlbumWithTitleId = curry((title, id) => {
  return {
    path: mangoSlugfy(title),
    component: path.resolve(`./src/templates/album.js`),
    context: {
      albumId: id,
      slugPath: mangoSlugfy(title),
    },
  };
});

const getPaginatedPageWithContentComponentPathPrefix = curry(
  (content, component, pathPrefix, postsPerPage, tagKeyName, prefix) => {
  const posts = content;
     (!isEmpty(posts)) {
      const numPages = Math.ceil(posts.length / postsPerPage);
    return Array.from({ length: numPages }).map((_, i) => ({
      path: paginationPath(i, numPages, pathPrefix),
      component: component,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        prevPath: paginationPath(i - 1, numPages, pathPrefix),
        nextPath: paginationPath(i + 1, numPages, pathPrefix),
        tag: !isEmpty(tagKeyName) ? tagKeyName : null,
        prefix: !isEmpty(prefix) ? prefix : ``,
      },
    }));
  }
  return [];
}
);

const getPaginatedPageWithContentComponentEmptyPrefix = getPaginatedPageWithContentComponentPathPrefix(
__,
  __,
  ``,
  3,
  null,
  null
);
nst getPaginatedPageWithContentComponentGridPrefix = getPaginatedPageWithContentComponentPathPrefix(
  __, 
  __,
`/grid/`,
  
  ,
    
);
    getPaginatedTagWithContentComponentTagPrefix = keyname =>
  getPaginatedPageWithContentComponentPathPrefix(
    __,
    __,
    `/tag/${keyname}/`,
    3,
     k eyname,
    `tag/${keyname}/`
  );
const getPaginatedTagWithContentComponentTagGridPrefix = keyname =>
  getPaginatedPageWithContentComponentPathPrefix(
    __,
    __,
    `/tag/${keyname}/grid/`,
    9,
    keyname,
    `tag/${keyname}/`
  );

const getKeyname = prop('keyname');
const getPaginatedList = fn => fn(__, path.resolve('./src/templates/list.js'));
const getPaginatedGrid = fn => fn(__, path.resolve('./src/templates/grid.js'));

const makePage = curry((fn, createPage) =>
  pipe(
    fn,
    map(createPage)
  )
);

const makeTagsPages = curry((pageType, listTypeFn, tags, createPage) => {
  const mappedContent = tags
    .filter(i => !isEmpty(i))
    .map(tag => {
      const keyname = getKeyname(tag);
      const curryPageThing = listTypeFn(keyname);
      const makeWithContent = pageType(curryPageThing);
      return makeWithContent(tag.albums);
    });
  const flattenXpto = flatten(mappedContent);
  return flattenXpto.map(x => createPage(x));
});

const makeTagsPageList = makeTagsPages(
  getPaginatedList,
  getPaginatedTagWithContentComponentTagPrefix
);
const makeTagsPageGrid = makeTagsPages(
  getPaginatedGrid,
  getPaginatedTagWithContentComponentTagGridPrefix
);

const createAlbumListWithCreatePage = createPage =>
  makePage(
    getPaginatedList(getPaginatedPageWithContentComponentEmptyPrefix),
    createPage
  );
const createAlbumGridWithCreatePage = createPage =>
  makePage(
    getPaginatedGrid(getPaginatedPageWithContentComponentGridPrefix),
    createPage
  );
const createTagListWithCreatePage = curry((tags, createPage) =>
  makeTagsPageList(tags, createPage)
);
const createTagGridtWithCreatePage = curry((tags, createPage) =>
  makeTagsPageGrid(tags, createPage)
);

const createAlbumsWithCreatepage = curry((content, createPage) =>
  content.forEach(({ id, title }) => {
    const album = getAlbumWithTitleId(title, id);
    createPage(album);
  })
);

exports.createPages = async ({ actions, graphql }) => {
  try {
    const { data } = await graphql(`
      query API_ListQuery {
        api {
          albums(order: "ASC") {
            id
            title
            cover_photo_base_url
            order
            content
            tags {
              keyname
              name
            }
            cover_photo {
              ext
              absolutePath
              childImageSharp {
                fluid(quality: 100) {
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
              }
            }
          }
          tags {
            name
            keyname
            albums {
              id
            }
          }
        }
      }
    `);

    const { albums, tags } = data.api;
    const createAlbumList = createAlbumListWithCreatePage(actions.createPage);
    const createAlbumGrid = createAlbumGridWithCreatePage(actions.createPage);
    const createTagList = createTagListWithCreatePage(__, actions.createPage);
    const createTagGrid = createTagGridtWithCreatePage(__, actions.createPage);
    const createAlbum = createAlbumsWithCreatepage(__, actions.createPage);
    createAlbumList(albums);
    createAlbumGrid(albums);

    createTagList(tags);
    createTagGrid(tags);

    createAlbum(albums);
  } catch (e) {
    console.log('ERROR', e);
  }
};

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions;
  createResolvers({
    API_Photo: {
      imageFile: {
        type: `File`,
        resolve(source) {
          return createRemoteFileNode({
            url: source.base_url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          });
        },
      },
    },
    API_Album: {
      cover_photo: {
        type: `File`,
        resolve(source) {
          return createRemoteFileNode({
            url: source.cover_photo_base_url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          });
        },
      },
    },
  });
};
