import { graphql } from 'gatsby';

export const gallery = graphql`
  fragment Gallery on WpPost_Acf {
    gallery {
      id
      sourceUrl
      localFile {
        ...Image
      }
    }
  }
`;
