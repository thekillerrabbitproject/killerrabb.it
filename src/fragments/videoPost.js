import { graphql } from 'gatsby';

export const videoFragment = graphql`
  fragment VideoPost on WpVideo {
    title
    content
    slug
    path: gatsbyPath(filePath: "/video/{WpVideo.slug}")
    videoThingy {
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
  }
`;