import React from 'react';
import Link from 'gatsby-plugin-transition-link/AniLink';

import { floatingTitle } from '@css/misc';
import { tertiary } from '@css/utils/color';

const Header = () => {
  return (
    <h1 css={floatingTitle}>
      <Link to="/" title="The Killer-Rabbit Project" paintDrip hex={tertiary}>
        The Killer-Rabbit Project
      </Link>
    </h1>
  );
};

export default Header;
