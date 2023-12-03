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
