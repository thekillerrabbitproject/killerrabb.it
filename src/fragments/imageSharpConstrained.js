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
    webp: childImageSharp {
      gatsbyImageData(
        formats: [WEBP]
        layout: FULL_WIDTH
        quality: 100
        placeholder: NONE
      )
      original {
        height
        width
      }
    }
  }
`;
