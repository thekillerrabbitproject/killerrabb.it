import { graphql } from 'gatsby';

export const featuredImageFragment = graphql`
  fragment FeaturedImage on WpNodeWithFeaturedImage {
    featuredImageId
    featuredImage {
      node {
        localFile {
          ...Image
        }
      }
    }
  }
`;
