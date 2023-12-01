/**
 * @type {import('gatsby').GatsbyConfig}
 */

module.exports = {
  siteMetadata: {
    title: 'The Killer-Rabbit Project',
    siteUrl: 'https://killerrabb.it',
    description: '',
    twitterUsername: '@persocon',
    image: '/icon-tkrp.png',
    menu: [
      {
        id: 'home',
        path: '/',
        name: 'Home',
      },
      {
        id: 'posts',
        path: '/posts',
        name: 'Posts',
      },
      {
        id: 'videos',
        path: '/videos',
        name: 'Videos',
      },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        url: 'https://www.tkrp.net/graphql',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'The Killer-Rabbit Project',
        short_name: 'TKRP',
        start_url: '/',
        description: 'Pedro Costa Neves Photo and Video Portfolio',
        lang: 'en',
        background_color: '#000000',
        theme_color: '#000000',
        display: 'fullscreen',
        icon: 'static/icon-tkrp.png',
        crossOrigin: 'use-credentials',
        cache_busting_mode: 'none',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@components': 'src/components',
          '@graphql': 'src/graphql',
          '@types': 'src/types',
          '@css': 'src/css',
          '@hooks': 'src/hooks',
        },
        extensions: ['js'],
      },
    },
  ],
};
