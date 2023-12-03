import { graphql } from 'gatsby';

export const featuredImageFullWidthFragment = graphql`
  fragment FeaturedImageFullWidth on WpNodeWithFeaturedImage {
    featuredImageId
    featuredImage {
      node {
        localFile {
          ...ImageFullWidth
        }
      }
    }
  }
`;
