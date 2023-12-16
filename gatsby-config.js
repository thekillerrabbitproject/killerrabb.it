/**
 * @type {import('gatsby').GatsbyConfig}
 */

const title = 'The Killer-Rabbit Project';
const description = 'Analog Photography and Videomaking by Pedro Costa Neves';

module.exports = {
  siteMetadata: {
    title,
    siteUrl: 'https://killerrabb.it',
    description,
    twitterUsername: '@persocon',
    image: '/icons/icon-tkrp.png',
    shareImage: '/icons/icon-tkrp.webp',
    shareImageNoLogo: '/icons/icon-tkrp-no-logo.webp',
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
        schema: {
          timeout: 3_600_000,
        },
        production: {
          hardCacheMediaFiles: true,
        },
        develop: {
          hardCacheMediaFiles: true,
        },
        type: {
          MediaItem: {
            localFile: {
              requestConcurrency: 10,
              maxFileSizeBytes: 3e8, // 300Mb
            },
          },
        },
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
        name: title,
        short_name: 'TKRP',
        start_url: '/',
        description,
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
          '@utils': 'src/utils',
        },
        extensions: ['js'],
      },
    },
  ],
};
