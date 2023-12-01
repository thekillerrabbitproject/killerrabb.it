import { graphql } from 'gatsby';

export const videoFragment = graphql`
  fragment VideoThingy on WpVideo_Videothingy {
    credits
    featuredVideo {
      mediaItemUrl
      sourceUrl
      publicUrl
      localFile {
        publicURL
      }
    }
  }
`;
