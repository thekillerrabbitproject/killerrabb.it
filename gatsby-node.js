const path = require(`path`)
const mangoSlugfy = require(`@mangocorporation/mango-slugfy`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const paginationPath = (page, totalPages) => {
  if (page === 0) {
    return '/'; 
  } else if (page < 0 || page >= totalPages) {
    return ''
  } else {
    return `/${page + 1}`
  }
}

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
        }
      }
    `)

    const {albums} = data.api;

    const posts = albums;
    const postsPerPage = 3;
    const numPages = Math.ceil(posts.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      actions.createPage({
        path: paginationPath(i, numPages),
        component: path.resolve("./src/templates/list.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          prevPath: paginationPath(i - 1, numPages),
          nextPath: paginationPath(i + 1, numPages)
        },
      });
    });

    albums.forEach(({ id, title }) => {
      actions.createPage({
        path: mangoSlugfy(title),
        component: path.resolve(`./src/templates/album.js`),
        context: {
          albumId: id,
        },
      })
    })
  } catch (e) {
    console.log("ERROR", e)
  }
}



exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions
  createResolvers({
    API_Photo: {
      imageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.base_url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
    API_Album: {
      cover_photo: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.cover_photo_base_url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}