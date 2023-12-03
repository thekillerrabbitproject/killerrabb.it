import { graphql } from 'gatsby';

export const featuredImageConstrainedFragment = graphql`
  fragment FeaturedImageConstrained on WpNodeWithFeaturedImage {
    featuredImageId
    featuredImage {
      node {
        localFile {
          ...ImageConstrained
        }
      }
    }
  }
`;
