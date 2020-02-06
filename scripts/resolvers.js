const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const { pathOr } = require('ramda');

const photoResolvers = ({
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
    WPGraphQL_MediaItem: {
      imageFile: {
        type: `File`,
        resolve(source) {
          const url = pathOr(
            pathOr(false, ['sourceUrl'], source),
            ['mediaItemUrl'],
            source
          );
          return createRemoteFileNode({
            url,
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

module.exports = {
  photoResolvers,
};
