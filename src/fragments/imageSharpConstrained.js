import { graphql } from 'gatsby';

export const imageSharpConstrained = graphql`
  fragment ImageConstrained on File {
    childImageSharp {
      gatsbyImageData(
        formats: [AUTO, WEBP]
        layout: CONSTRAINED
        quality: 100
        placeholder: BLURRED
      )
    }
    shareImage: childImageSharp {
      gatsbyImageData(
        formats: [WEBP]
        quality: 100
        placeholder: NONE
        width: 1200
        height: 630
      )
      original {
        height
        width
      }
    }
  }
`;
