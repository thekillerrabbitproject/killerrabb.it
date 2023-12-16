import { graphql } from 'gatsby';

export const imageSharpFullWidth = graphql`
  fragment ImageFullWidth on File {
    childImageSharp {
      gatsbyImageData(
        formats: [AUTO, WEBP]
        layout: FULL_WIDTH
        quality: 100
        placeholder: BLURRED
      )
      original {
        height
        width
      }
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
