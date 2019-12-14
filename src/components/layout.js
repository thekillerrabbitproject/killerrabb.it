/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Global } from '@emotion/core';
import { initialState, reducer, StateProvider } from '../utils';

import { globalCss } from '../emotion/global';

import Header from './header';
import Main from './main';

const Layout = ({ children, cssmod }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Global styles={globalCss} />
        <Header siteTitle={data.site.siteMetadata.title} />
        <Main cssmod={cssmod}>{children}</Main>
      </StateProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  cssmod: PropTypes.object,
};

Layout.defaultProps = {
  cssmod: {},
};

export default Layout;
