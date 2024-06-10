import pkg from '@apollo/client';

const { gql } = pkg;

const query = gql`
  query StaticAssets {
    posts(first: 100) {
      nodes {
        __typename
        title
        slug
        featuredImage {
          node {
            sourceUrl(size: SHARE_THUMBNAIL)
            thumbnailSize: sourceUrl(size: NEXTJS_THUMBNAIL)
            fullSize: sourceUrl
          }
        }
        acf {
          gallery {
            id
            thumbnailSize: sourceUrl(size: NEXTJS_THUMBNAIL)
            fullSize: sourceUrl
          }
        }
        films {
          nodes {
            slug
          }
        }
      }
    }
    videos(first: 100) {
      nodes {
        __typename
        title
        slug
        featuredImage {
          node {
            sourceUrl(size: SHARE_THUMBNAIL)
            thumbnailSize: sourceUrl(size: NEXTJS_THUMBNAIL)
            fullSize: sourceUrl
          }
        }
        videoThingy {
          featuredVideo {
            mediaItemUrl
          }
        }
        films {
          nodes {
            slug
          }
        }
      }
    }
    films(first: 100) {
      nodes {
        __typename
        title: name
        slug
      }
    }
    models(first: 100) {
      nodes {
        __typename
        title: name
        slug
      }
    }
  }
`;

export default query;
