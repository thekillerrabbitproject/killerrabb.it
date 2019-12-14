const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

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
  });
};

module.exports = {
  photoResolvers,
};
