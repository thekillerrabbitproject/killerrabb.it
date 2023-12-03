import { graphql } from 'gatsby';

export const postConstrainedFragment = graphql`
  fragment PostConstrained on WpPost {
    title
    content
    slug
    path: gatsbyPath(filePath: "/{WpPost.slug}")
    acf {
      ...GalleryConstrained
    }
  }
`;
