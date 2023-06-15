import React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { globalCss } from '@css/global';
import Header from '@components/Header';

import { borderWrapper } from '@css/misc';

import Menu from './Menu';

const Layout = ({ children }) => {
  return (
    <>
      <Global styles={globalCss} />
      <div css={borderWrapper}>
        <Header />
        {children}
        <Menu />
      </div>
      <div id="loader">
        <div className="lds-heart">
          <div></div>
        </div>
        <p>Loading...</p>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
