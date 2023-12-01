import { graphql } from 'gatsby';

export const videoRelatedPosts = graphql`
  fragment VideoRelatedPosts on WpVideo_RelatedPosts {
    posts {
      ... on WpPost {
        ...Post
      }
    }
    videos: posts {
      ... on WpVideo {
        ...VideoPost
      }
    }
  }
`;
