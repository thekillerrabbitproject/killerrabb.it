const path = require(`path`)
const mangoSlugfy = require(`@mangocorporation/mango-slugfy`)

exports.createPages = async ({ actions, graphql }) => {
  try {
  const { data } = await graphql(`
    query ListQuery {
      api {
        albums(order: "DESC") {
          id
          title
          cover_photo_base_url
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