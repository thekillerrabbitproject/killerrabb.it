import PropTypes from "prop-types"
import React from "react"
import Link from "gatsby-plugin-transition-link/AniLink"
import {useStaticQuery, graphql} from 'gatsby';
import Img from 'gatsby-image'

import '../styles/header.scss';

const Header = ({ siteTitle }) => {
  const data = useStaticQuery(
    graphql`
      query {
        me: file(relativePath: {eq: "me.jpeg"}) {
          childImageSharp {
            fixed(quality: 96, width: 96) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    `
  )
  return (
    <header>
        <h1 style={{ margin: 0 }}>
          <Link cover direction="right" bg="#1b1c1e" to="/">
          <Img fixed={data.me.childImageSharp.fixed} alt={siteTitle}/>
            {/* <img src="https://66.media.tumblr.com/avatar_92d293cd510e_96.pnj" alt={siteTitle} /> */}
          </Link>
        </h1>
        <nav>
          <ul>
            <li><Link cover direction="right" bg="#1b1c1e" to="/">Home</Link></li>
            {/* <li><Link cover direction="right" bg="#1b1c1e" to="/newsletter">Newsletter</Link></li> */}
            <li><Link cover direction="right" bg="#1b1c1e" to="/presets">Lightroom Presets</Link></li>
            <li><a href="https://tkrp.net">Store</a></li>
            <li><a href="https://instagram.com/persocon">My Instagram</a></li>
            <li><a href="https://tkrp.net/contact">Contact</a></li>
            <li><a href="https://www.tkrp.net/i-want-to-shoot/">I Want to Shoot</a></li>
          </ul>
        </nav>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
