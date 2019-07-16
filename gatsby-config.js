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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        fieldName: `api`,
        url: TKRP_GRAPHQL_API,
        typeName: `persocon`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-offline`,
  ],
}
