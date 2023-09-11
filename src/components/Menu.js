import React, { useState } from 'react';

import * as ß from '@css/menu';
import Instagram from './Instagram';
import Link from 'gatsby-plugin-transition-link/AniLink';
import { tertiary } from '@css/utils/color';

const Menu = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav css={ß.nav} onClick={() => setOpen(true)}>
        <span></span>
        <span></span>
        <span></span>
      </nav>
      <dialog css={ß.dialog} open={open}>
        <div css={ß.close} onClick={() => setOpen(false)}>
          &times;
        </div>
        <ul>
          <li>
            <h3>MENU</h3>
          </li>
          <li>
            <Link to="/" title="Home" paintDrip hex={tertiary}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/videos" title="Videos" paintDrip hex={tertiary}>
              Videos
            </Link>
          </li>
          <li>
            <Instagram />
          </li>
        </ul>
      </dialog>
    </>
  );
};

export default Menu;
