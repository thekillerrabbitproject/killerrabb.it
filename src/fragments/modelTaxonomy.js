import { graphql } from 'gatsby';

export const modelFragment = graphql`
  fragment ModelTaxonomy on WpModel {
    name
    slug
    path: gatsbyPath(filePath: "/model/{WpModel.slug}")
  }
`;
