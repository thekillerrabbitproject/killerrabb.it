import { graphql } from 'gatsby';

export const postRelatedPosts = graphql`
  fragment PostRelatedPosts on WpPost_RelatedPosts {
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
