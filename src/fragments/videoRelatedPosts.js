import { graphql } from 'gatsby';

export const videoRelatedPosts = graphql`
  fragment VideoRelatedPosts on WpVideo_RelatedPosts {
    posts {
      ... on WpPost {
        ...PostConstrained
        ...FeaturedImageConstrained
        films {
          nodes {
            ...FilmTaxonomy
          }
        }
        models {
          nodes {
            ...ModelTaxonomy
          }
        }
      }
    }
    videos: posts {
      ... on WpVideo {
        ...VideoPost
        ...FeaturedImageConstrained
        films {
          nodes {
            ...FilmTaxonomy
          }
        }
        models {
          nodes {
            ...ModelTaxonomy
          }
        }
      }
    }
  }
`;
