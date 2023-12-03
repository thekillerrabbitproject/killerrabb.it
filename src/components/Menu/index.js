import React from 'react';
import useSiteMetadata from '@hooks/useSiteMetadata';

import * as ß from './styles';

import { Link } from 'gatsby';

const Menu = () => {
  const { menu } = useSiteMetadata();

  return (
    <nav css={ß.nav}>
      <ul css={ß.menu}>
        {menu.map((item) => (
          <li id={item.id} key={item.id}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
