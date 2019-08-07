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
          <li><Link to="/">Home</Link></li>
          <li><Link to="/presets">Lightroom Presets</Link></li>
          <li><a href="https://tkrp.net">Store</a></li>
          <li><a href="https://instagram.com/persocon">My Instagram</a></li>
          <li><a href="https://tkrp.net/contact">Contact</a></li>
          <li><a href="https://www.tkrp.net/i-want-to-shoot/">I Want to Shoot</a></li>
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
