const fs = require("fs")
const { buildSchema, buildClientSchema } = require("graphql")

module.exports = {
  siteMetadata: {
    title: `The Killer-Rabbit Photography`,
    description: ``,
    author: `@persocon`,
    siteUrl: 'https://killerrabb.it',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `API`,
        fieldName: `api`,
        url: process.env.TKRP_GRAPHQL_API,
        createSchema: async () => {
          const sdl = fs.readFileSync(`${__dirname}/schema.sdl`).toString()
          return buildSchema(sdl)
        },
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        sitemapSize: 5000
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://killerrabb.it`,
        stripQueryString: true,
      },
    },
    `gatsby-plugin-webpack-size`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'listQuery',
        imagePath: 'api.albums.photos.base_url',
        name: 'banana'
      },
    }
  ],
}
