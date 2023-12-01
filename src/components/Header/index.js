import React from 'react';
import Menu from '@components/Menu';

import * as ß from './styles';

import { graphql, useStaticQuery } from 'gatsby';

const query = graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const Header = () => {
  const data = useStaticQuery(query);
  const {
    site: {
      siteMetadata: { title },
    },
  } = data;

  return (
    <header css={ß.header}>
      <h1 css={ß.title}>{title}</h1>
      <Menu />
    </header>
  );
};

export default Header;
