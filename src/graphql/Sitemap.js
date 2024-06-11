import { gql } from '@apollo/client';

const query = gql`
  query SitemapQuery {
    posts(first: 999) {
      nodes {
        slug
      }
    }
    videos(first: 999) {
      nodes {
        slug
      }
    }
    films(first: 999) {
      nodes {
        slug
      }
    }
    models(first: 999) {
      nodes {
        slug
      }
    }
  }
`;

export default query;
