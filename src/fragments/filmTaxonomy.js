import { graphql } from 'gatsby';

export const filmFragment = graphql`
  fragment FilmTaxonomy on WpFilm {
    name
    slug
    path: gatsbyPath(filePath: "/film/{WpFilm.slug}")
  }
`;
