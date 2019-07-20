const path = require(`path`)
const mangoSlugfy = require(`@mangocorporation/mango-slugfy`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql }) => {
  try {
    const { data } = await graphql(`
      query API_ListQuery {
        api {
          albums(order: "DESC") {
            id
            title
            cover_photo_base_url
            order
            cover_photo {
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
  
    data.api.albums.forEach(({ id, title }) => {
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