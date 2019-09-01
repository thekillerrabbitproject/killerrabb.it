import PropTypes from 'prop-types'
import React from "react"
import Link from "gatsby-plugin-transition-link/AniLink"
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image';

import '../styles/grid-list.scss';

import HamburgerMenu from './hamburger-menu';

const GridList = ({active}) => {
  const data = useStaticQuery(
    graphql`
      query {
        listIcon: file(relativePath: {eq: "list-icon.png"}) {
          childImageSharp {
            fixed(quality: 100, width: 30) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
        gridIcon: file(relativePath: {eq: "grid-icon.png"}) {
          childImageSharp {
            fixed(quality: 100, width: 30) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    `
  )
  return (
    <aside className="grid-list">
      <HamburgerMenu />
      <Link cover direction="right" bg="#1b1c1e" to="/" className={active === 'list' ? 'active list' : 'list'}>
        <Img fixed={data.listIcon.childImageSharp.fixed} />
      </Link>
      <Link cover direction="right" bg="#1b1c1e" to="/grid" className={active === 'grid' ? 'active grid' : 'grid'}>
      <Img fixed={data.gridIcon.childImageSharp.fixed} />
      </Link>
    </aside>
  );
}

GridList.propTypes = {
  active: PropTypes.string,
}

GridList.defaultProps = {
  active: 'list'
}

export default GridList
