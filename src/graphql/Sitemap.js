import { gql } from '@apollo/client';

const query = gql`
  query SitemapQuery {
    posts(first: 100) {
      nodes {
        slug
      }
    }
    videos(first: 100) {
      nodes {
        slug
      }
    }
    films(first: 100) {
      nodes {
        slug
      }
    }
    models(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

export default query;
