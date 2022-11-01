import React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { globalCss } from '@css/global';
import Header from '@components/Header';

import {
  normalContent,
  borderWrapper,
  borderTop,
  borderBottom,
  borderLeft,
  borderRight,
} from '@css/misc';

import Menu from './Menu';

const Layout = ({ children }) => {
  return (
    <>
      <Global styles={globalCss} />
      <div css={borderWrapper}>
        <div css={borderTop}>
          <Header />
        </div>
        <div css={borderLeft} />
        <div css={normalContent}>{children}</div>
        <div css={borderRight} />
        <div css={borderBottom} />
        <Menu />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
