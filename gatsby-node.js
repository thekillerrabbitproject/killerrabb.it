const path = require(`path`);
const mangoSlugfy = require(`@mangocorporation/mango-slugfy`);
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

const paginationPath = (page, totalPages, prefix = `/`) => {
  if (page === 0) {
    return `${prefix}`;
  } else if (page < 0 || page >= totalPages) {
    return '';
  } else {
    return `${prefix}${page + 1}`;
  }
};

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

    const posts = albums;
    const postsPerPage = 3;
    const numPages = Math.ceil(posts.length / postsPerPage);
    const postsPerPageGrid = 9;
    const numPagesGrid = Math.ceil(posts.length / postsPerPageGrid);
    Array.from({ length: numPages }).forEach((_, i) => {
      actions.createPage({
        path: paginationPath(i, numPages),
        component: path.resolve('./src/templates/list.js'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          prevPath: paginationPath(i - 1, numPages),
          nextPath: paginationPath(i + 1, numPages),
          tag: null,
          prefix: ``,
        },
      });
    });

    Array.from({ length: numPagesGrid }).forEach((_, i) => {
      actions.createPage({
        path: paginationPath(i, numPagesGrid, `/grid/`),
        component: path.resolve('./src/templates/grid.js'),
        context: {
          limit: postsPerPageGrid,
          skip: i * postsPerPageGrid,
          numPages: numPagesGrid,
          currentPage: i + 1,
          prevPath: paginationPath(i - 1, numPagesGrid, `/grid/`),
          nextPath: paginationPath(i + 1, numPagesGrid, `/grid/`),
          tag: null,
          prefix: ``,
        },
      });
    });

    tags.map(tag => {
      const tagPostsPerPage = 3;
      const numTagPages = Math.ceil(tag.albums.length / tagPostsPerPage);
      Array.from({ length: numTagPages }).forEach((_, i) => {
        actions.createPage({
          path: paginationPath(i, numTagPages, `/tag/${tag.keyname}/`),
          component: path.resolve('./src/templates/list.js'),
          context: {
            limit: tagPostsPerPage,
            skip: i * tagPostsPerPage,
            numPages: numTagPages,
            currentPage: i + 1,
            prevPath: paginationPath(
              i - 1,
              numTagPages,
              `/tag/${tag.keyname}/`
            ),
            nextPath: paginationPath(
              i + 1,
              numTagPages,
              `/tag/${tag.keyname}/`
            ),
            tag: tag.keyname,
            prefix: `tag/${tag.keyname}/`,
          },
        });
      });
      const tagPostsPerPageGrid = 9;
      const numTagPagesGrid = Math.ceil(
        tag.albums.length / tagPostsPerPageGrid
      );
      Array.from({ length: numTagPagesGrid }).forEach((_, i) => {
        actions.createPage({
          path: paginationPath(i, numTagPagesGrid, `/tag/${tag.keyname}/grid/`),
          component: path.resolve('./src/templates/grid.js'),
          context: {
            limit: tagPostsPerPageGrid,
            skip: i * tagPostsPerPageGrid,
            numPages: numTagPagesGrid,
            currentPage: i + 1,
            prevPath: paginationPath(
              i - 1,
              numTagPagesGrid,
              `/tag/${tag.keyname}/grid/`
            ),
            nextPath: paginationPath(
              i + 1,
              numTagPagesGrid,
              `/tag/${tag.keyname}/grid/`
            ),
            tag: tag.keyname,
            prefix: `tag/${tag.keyname}/`,
          },
        });
      });
    });

    albums.forEach(({ id, title }) => {
      actions.createPage({
        path: mangoSlugfy(title),
        component: path.resolve(`./src/templates/album.js`),
        context: {
          albumId: id,
          slugPath: mangoSlugfy(title),
        },
      });
    });
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
