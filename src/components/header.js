import PropTypes from 'prop-types';
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { useStateValue } from '../utils';
import Link from './Link';

import * as ß from '../emotion/header';

import HamburgerMenu from './hamburger-menu';

const Header = ({ siteTitle }) => {
  const [{ menu }] = useStateValue();

  const data = useStaticQuery(
    graphql`
      query {
        me: file(relativePath: { eq: "me.jpeg" }) {
          childImageSharp {
            fixed(quality: 96, width: 96) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    `
  );
  return (
    <>
      <header css={ß.header(menu)}>
        <HamburgerMenu cssmod={ß.hamburgerMenu} />
        <h1 css={ß.h1}>
          <Link to="/">
            <Img
              fixed={data.me.childImageSharp.fixed}
              alt={siteTitle}
              css={ß.img}
            />
          </Link>
        </h1>
        <nav css={ß.nav}>
          <ul css={ß.navUl}>
            <li css={ß.navLi}>
              <Link to="/">Home</Link>
            </li>
            <li css={ß.navLi}>
              <Link to="/newsletter">Newsletter</Link>
            </li>
            <li css={ß.navLi}>
              <Link to="/presets">Lightroom Presets</Link>
            </li>
            <li css={ß.navLi}>
              <Link to="/products">Store</Link>
            </li>
            <li css={ß.navLi}>
              <a href="https://instagram.com/persocon">My Instagram</a>
            </li>
            <li css={ß.navLi}>
              <a href="https://tkrp.net/contact">Contact</a>
            </li>
            <li css={ß.navLi}>
              <a href="https://www.tkrp.net/i-want-to-shoot/">
                I Want to Shoot
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
