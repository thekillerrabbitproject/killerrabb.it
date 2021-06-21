import React from 'react';
import { Link } from 'gatsby';

import { floatingTitle } from '@css/misc';

const Header = () => {
  return (
    <>
      <h1 css={floatingTitle}>
        <Link to="/" title="The Killer-Rabbit Photography">
          The Killer-Rabbit Photography
        </Link>
      </h1>
    </>
  );
};

export default Header;
