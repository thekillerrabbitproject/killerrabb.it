import { graphql } from 'gatsby';

export const postFragment = graphql`
  fragment Post on WpPost {
    title
    content
    slug
    path: gatsbyPath(filePath: "/{WpPost.slug}")
    acf {
      ...Gallery
    }
  }
`;
