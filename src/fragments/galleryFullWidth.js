import { graphql } from 'gatsby';

export const galleryFullWidth = graphql`
  fragment GalleryFullWidth on WpPost_Acf {
    gallery {
      id
      sourceUrl
      localFile {
        ...ImageFullWidth
      }
    }
  }
`;
