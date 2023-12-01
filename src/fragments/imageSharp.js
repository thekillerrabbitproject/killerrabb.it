import { graphql } from 'gatsby';

export const imageSharp = graphql`
  fragment Image on File {
    childImageSharp {
      gatsbyImageData(
        formats: [AUTO, WEBP]
        layout: CONSTRAINED
        quality: 100
        placeholder: BLURRED
      )
    }
  }
`;
