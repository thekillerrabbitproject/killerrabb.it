import React from 'react';
import useSiteMetadata from '@hooks/useSiteMetadata';

import * as ß from './styles';

import { graphql, Link, useStaticQuery } from 'gatsby';

const Footer = () => {
  const { menu } = useSiteMetadata();
  const data = useStaticQuery(graphql`
    query FooterQuery {
      films: allWpFilm(sort: { count: DESC }) {
        nodes {
          ...FilmTaxonomy
          count
        }
      }
      models: allWpModel(sort: { count: DESC }) {
        nodes {
          ...ModelTaxonomy
          count
        }
      }
    }
  `);

  const {
    films: { nodes: filmNodes },
    models: { nodes: modelsNodes },
  } = data;

  return (
    <footer css={ß.footer}>
      <ul>
        <li>menu</li>
        {menu.map((item) => (
          <li key={item.id}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <ul>
        <li>films</li>
        {filmNodes.map(
          (film) =>
            film?.count && (
              <li key={film.slug}>
                <Link to={film.path} title={film.name}>
                  {film.name}
                </Link>
              </li>
            ),
        )}
      </ul>
      <ul>
        <li>models</li>
        {modelsNodes.map(
          (model) =>
            model?.count && (
              <li key={model.slug}>
                <Link to={model.path} title={model.name}>
                  {model.name}
                </Link>
              </li>
            ),
        )}
      </ul>
    </footer>
  );
};

export default Footer;
