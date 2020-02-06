const path = require(`path`);
const { pathOr } = require(`ramda`);

const { mainQuery } = require('./scripts/queries');
const { photoResolvers } = require('./scripts/resolvers');
const {
  paginationPathWithPrefix,
  createPaginatedContext,
  albumsContext,
  mapTagsToContext,
  createPages,
} = require('./scripts/context');

exports.createPages = async ({ actions, graphql }) => {
  try {
    const { data } = await graphql(`
      ${mainQuery}
    `);

    const albums = pathOr([], ['api', 'albums'], data);
    const tags = pathOr([], ['api', 'tags'], data);

    const postsPaginationPath = paginationPathWithPrefix(``);
    const gridPostsPaginationPath = paginationPathWithPrefix(`/grid/`);

    const paginatedPosts = createPaginatedContext(
      path.resolve('./src/templates/list.js'),
      3,
      albums,
      postsPaginationPath,
      ``,
      null
    );
    const paginatedGridPosts = createPaginatedContext(
      path.resolve('./src/templates/grid.js'),
      9,
      albums,
      gridPostsPaginationPath,
      ``,
      null
    );

    const paginatedTagPosts = createPaginatedContext(
      path.resolve('./src/templates/list.js'),
      3
    );
    const paginatedTagGridPosts = createPaginatedContext(
      path.resolve('./src/templates/grid.js'),
      9
    );

    const tagsList = mapTagsToContext(paginatedTagPosts, tags, ``);
    const tagsGrid = mapTagsToContext(paginatedTagGridPosts, tags, `/grid/`);
    const albumsMagic = albumsContext(
      path.resolve(`./src/templates/album.js`),
      albums
    );

    const mapCreatePage = createPages(actions.createPage);

    mapCreatePage([
      ...paginatedPosts,
      ...paginatedGridPosts,
      ...tagsList,
      ...tagsGrid,
      ...albumsMagic,
    ]);
  } catch (e) {
    console.log('ERROR', e);
  }
};

exports.createResolvers = photoResolvers;
