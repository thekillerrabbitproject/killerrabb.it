/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import {
  initialState,
  reducer,
  StateProvider,
} from '../utils';

import "../styles/main.scss"

import Header from "./header"
import Main from "./main";

const Layout = ({ children, className }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Main className={className}>{children}</Main>
      </StateProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Layout.defaultProps = {
  className: '',
}

export default Layout
