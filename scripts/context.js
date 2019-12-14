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
  ifElse,
  identity,
  __,
  isEmpty,
  prop,
  flatten,
} = require('ramda');

const imap = addIndex(map);

const pageRoot = page => page < 0;
const pageEndWithTotal = curry((totalPages, page) => page >= totalPages);

const ifEmptyPrefixUseSlash = ifElse(
    isEmpty,
    always(`/`),
    identity,
);

/**
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

/**
 * @param  {String} template
 * @param  {Number} postsPerPage
 * @param  {Object} posts
 * @param  {String} paginationPath
 * @param  {String} prefix
 * @param  {String} tag
 */
const createPaginatedContext =
    curry((template, postsPerPage, posts, paginationPath, prefix, tag) => {
      const numPages = Math.ceil(divide(posts.length, postsPerPage));
      return pipe(range(0), imap((_, i) => {
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
                  }))(numPages);
    });

/**
 * @param  {Function} createPage
 * @param  {Object} posts
 */
const createPages = curry((createPage, posts) => map(createPage, posts));

const getKeyname = prop('keyname');
const getAlbums = prop('albums');

const getSuffix = ifElse(
    isEmpty,
    always(`/`),
    identity,
);

/**
 * @param  {Function} cPaginatedContext
 * @param  {Array} tags
 * @param  {String} sufix
 */
const mapTagsToContext = curry(
    (cPaginatedContext, tags, sufix) => pipe(
        map(
            (t) => cPaginatedContext(
                getAlbums(t),
                paginationPathWithPrefix(
                    `/tag/${getKeyname(t)}${getSuffix(sufix)}`),
                `tag/${getKeyname(t)}/`,
                getKeyname(t),
                ),
            ),
        flatten,
        )(tags));

const getId = prop('id');
const getTitleSlug = pipe(prop('title'), mangoSlugfy);

/**
 * @param  {String} template
 * @param  {Object} x
 */
const albumsContext = (template, x) =>
    map((y) => ({
          path: getTitleSlug(y),
          component: template,
          context: {
            albumId: getId(y),
            slugPath: getTitleSlug(y),
          },
        }),
        x);

module.exports = {
  paginationPathWithPrefix,
  createPaginatedContext,
  createPages,
  mapTagsToContext,
  albumsContext
}