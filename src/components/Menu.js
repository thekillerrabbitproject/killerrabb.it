import React, { useState } from 'react';

import * as ß from '@css/menu';
import Instagram from './Instagram';

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
            <Instagram />
          </li>
        </ul>
      </dialog>
    </>
  );
};

export default Menu;
