import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useStateValue } from '../utils';

import * as ß from '../emotion/hamburger-menu';

const HamburgerMenu = ({ cssmod }) => {
  const [{ menu }, dispatch] = useStateValue();
  const toggleMenu = e => {
    e.preventDefault();
    dispatch({
      type: 'toggle-menu',
    });
  };
  return (
    <button onClick={toggleMenu} css={css(ß.hamburger, cssmod)}>
      <span className="first" css={ß.span(menu)}></span>
      <span className="middle" css={ß.span(menu)}></span>
      <span className="last" css={ß.span(menu)}></span>
    </button>
  );
};

HamburgerMenu.propTypes = {
  cssmod: PropTypes.object,
};

HamburgerMenu.defaultProps = {
  cssmod: {},
};

export default HamburgerMenu;
