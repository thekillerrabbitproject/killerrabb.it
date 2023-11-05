module.exports = {
  siteMetadata: {
    title: 'Pedro Costa Neves - Photography Portfolio',
    siteUrl: 'https://killerrabb.it',
  },
  plugins: [
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        url: 'https://www.tkrp.net/graphql',
        type: {
          MediaItem: {
            localFile: {
              maxFileSizeBytes: 2e8, // 100Mb
            },
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@components': 'src/components',
          '@css': 'src/emotion',
          '@root': '.',
        },
        extensions: ['js'],
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-zopfli`,
      options: {
        extensions: ['css', 'js', 'svg', 'jpg', 'jpeg', 'webp'],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'The Killer-Rabbit Project',
        short_name: 'TKRP',
        start_url: '/',
        description: `Pedro Costa Neves Photo and Video Portfolio`,
        lang: `en`,
        background_color: '#1b1c1e',
        theme_color: '#1b1c1e',
        display: 'fullscreen',
        icon: 'src/images/icon.png',
        crossOrigin: `use-credentials`,
        cache_busting_mode: `none`,
      },
    },
    'gatsby-plugin-transition-link',
    {
      resolve: 'gatsby-plugin-sharp',
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    'gatsby-plugin-remove-serviceworker',
  ],
};
