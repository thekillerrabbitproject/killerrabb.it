import PropTypes from "prop-types"
import React from "react"
import Link from "gatsby-plugin-transition-link/AniLink"

import '../styles/header.scss';

const Header = ({ siteTitle }) => (
  <header>
      <h1 style={{ margin: 0 }}>
        <Link cover direction="right" bg="#1b1c1e" to="/">
          <img src="https://66.media.tumblr.com/avatar_92d293cd510e_96.pnj" alt={siteTitle} />
        </Link>
      </h1>
      <nav>
        <ul>
          <li><Link cover direction="right" bg="#1b1c1e" to="/">Home</Link></li>
          <li><Link cover direction="right" bg="#1b1c1e" to="/presets">Lightroom Presets</Link></li>
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
