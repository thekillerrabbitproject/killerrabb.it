import { graphql } from 'gatsby';

export const galleryConstrained = graphql`
  fragment GalleryConstrained on WpPost_Acf {
    gallery {
      id
      sourceUrl
      localFile {
        ...ImageConstrained
      }
    }
  }
`;
