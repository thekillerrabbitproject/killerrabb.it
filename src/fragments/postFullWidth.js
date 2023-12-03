import { graphql } from 'gatsby';

export const postFullWidthFragment = graphql`
  fragment PostFullWidth on WpPost {
    title
    content
    slug
    path: gatsbyPath(filePath: "/{WpPost.slug}")
    acf {
      ...GalleryFullWidth
    }
  }
`;
