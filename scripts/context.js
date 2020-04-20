const mangoSlugfy = require(`@mangocorporation/mango-slugfy`);
const {
  curry,
  cond,
  equals,
  either,
  always,
  T,
  inc,
  dec,
  multiply,
  divide,
  range,
  map,
  addIndex,
  pipe,
  when,
  isEmpty,
  prop,
  flatten,
  filter,
  complement,
} = require('ramda');

const imap = addIndex(map);
const notEmpty = complement(isEmpty);

const pageRoot = page => page < 0;
const pageEndWithTotal = curry((totalPages, page) => page >= totalPages);

const ifEmptyPrefixUseSlash = when(isEmpty, always(`/`));

/**
 * @description generates path prefix for paginated bullshit
 * @param  {String} pfx
 * @param  {Number} page
 * @param  {Number} totalPages
 */
const paginationPathWithPrefix = curry((pfx, page, totalPages) => {
  const prefix = ifEmptyPrefixUseSlash(pfx);
  const pageEnd = pageEndWithTotal(totalPages);
  return cond([
    [equals(0), always(`${prefix}`)],
    [either(pageRoot, pageEnd), always(``)],
    [T, always(`${prefix}${inc(page)}`)],
  ])(page);
});

const getNumPages = curry((postsLength, postsPerPage) => {
  const numberPages =
    postsLength > 1 ? Math.ceil(divide(postsLength, postsPerPage)) : 1;
  return Math.max(numberPages, 1);
});

/**
 * @description generates paginated page context
 * @param  {String} template
 * @param  {Number} postsPerPage
 * @param  {Object} posts
 * @param  {String} paginationPath
 * @param  {String} prefix
 * @param  {String} tag
 */
const createPaginatedContext = curry(
  (template, postsPerPage, posts, paginationPath, prefix, tag) => {
    const { length: postsLength } = posts;
    if (postsLength > 0) {
      const numPages = getNumPages(postsLength, postsPerPage);
      return pipe(
        range(0),
        imap((_, i) => {
          return {
            path: paginationPath(i, numPages),
            component: template,
            context: {
              limit: postsPerPage,
              skip: multiply(i, postsPerPage),
              numPages,
              currentPage: inc(i),
              prevPath: paginationPath(dec(i), numPages),
              nextPath: paginationPath(inc(i), numPages),
              tag,
              prefix: prefix,
            },
          };
        })
      )(numPages);
    }
  }
);

/**
 * @description map over page contexts and create pages with gatsby
 * actions.createPage
 * @param  {Function} createPage
 * @param  {Object} posts
 */
const createPages = curry((createPage, posts) => map(createPage, posts));

const getKeyname = prop('keyname');
const getAlbums = prop('albums');

/**
 * @description map over all tags and generate page context
 * @param  {Function} cPaginatedContext
 * @param  {Array} tags
 * @param  {String} sufix
 */

const mapTagsToContext = curry((cPaginatedContext, tags, sufix) =>
  pipe(
    filter(pipe(getAlbums, notEmpty)),
    map(t =>
      cPaginatedContext(
        getAlbums(t),
        paginationPathWithPrefix(
          `/tag/${getKeyname(t)}${ifEmptyPrefixUseSlash(sufix)}`
        ),
        `tag/${getKeyname(t)}/`,
        getKeyname(t)
      )
    ),
    flatten
  )(tags)
);

const getId = prop('id');
const getTitleSlug = pipe(prop('title'), mangoSlugfy);

/**
 * generate album context
 *
 * @param {String} template - Path for the template
 * @param {Object} x - list of albums
 * @example albumsContext(path.resolve(`./src/templates/album.js`), albums);
 * @returns {Object} with albums page context
 */
const albumsContext = (template, x) =>
  map(
    y => ({
      path: getTitleSlug(y),
      component: template,
      context: {
        albumId: getId(y),
        slugPath: getTitleSlug(y),
      },
    }),
    x
  );

module.exports = {
  paginationPathWithPrefix,
  createPaginatedContext,
  createPages,
  mapTagsToContext,
  albumsContext,
};
