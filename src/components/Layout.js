import React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { globalCss } from '@css/global';
import Header from '@components/Header';

import { fakeBorder, normalContent } from '@css/misc';

const Layout = ({ children }) => {
  return (
    <>
      <Global styles={globalCss} />
      <div css={fakeBorder}>
        <Header />
        <div css={normalContent}>{children}</div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
