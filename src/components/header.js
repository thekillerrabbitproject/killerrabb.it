import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import '../styles/header.scss';

const Header = ({ siteTitle }) => (
  <header>
      <h1 style={{ margin: 0 }}>
        <Link to="/">
          <img src="https://66.media.tumblr.com/avatar_92d293cd510e_96.pnj" alt={siteTitle} />
        </Link>
      </h1>
      <nav>
        <ul>
          <li><a href="https://instagram.com/persocon">My Instagram</a></li>
          {/* <li><Link to="/contact">Contact</Link></li> */}
        </ul>
      </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
