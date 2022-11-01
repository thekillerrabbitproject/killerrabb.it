const path = require(`path`);

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
const getN = (limit, arr) => {
  if (arr.length >= limit) {
    return arr.slice(0, limit);
  }
  return arr;
};
const getShuffledPosts = (posts) => {
  const shuffledPosts = shuffle(posts);
  const postsWithShuffledGallery = shuffledPosts.map((post) =>
    getN(3, shuffle(post.media.gallery)).map((gallery) => ({
      title: post.title,
      id: gallery.id,
      slug: post.slug,
      gallery,
    }))
  );

  const galleries = [0, 1, 2]
    .map((index) => postsWithShuffledGallery.map((post) => post[index]))
    .flat();

  return galleries;
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const templateHome = path.resolve(`./src/templates/home/index.js`);
  const templatePosts = path.resolve(`./src/templates/posts/index.js`);
  const result = await graphql(`
    query allPosts {
      allWpPost {
        nodes {
          id
          slug
          title
          content
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    formats: [AUTO, WEBP]
                    layout: FULL_WIDTH
                    placeholder: BLURRED
                    quality: 100
                  )
                }
              }
            }
          }
          media: acf {
            gallery {
              id
              sourceUrl
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    formats: [AUTO, WEBP]
                    layout: FULL_WIDTH
                    placeholder: BLURRED
                    quality: 100
                  )
                }
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  reporter.info('Shuffling Homepage posts');
  const shuffledPosts = getShuffledPosts(result.data.allWpPost.nodes);

  // create homepage
  createPage({
    path: `/`,
    component: templateHome,
    context: {
      posts: shuffledPosts,
    },
  });

  // create posts
  const posts = result?.data?.allWpPost?.nodes;
  posts.forEach((post) => {
    createPage({
      path: `/${post.slug}`,
      component: templatePosts,
      context: {
        id: post.id,
      },
    });
  });
};
