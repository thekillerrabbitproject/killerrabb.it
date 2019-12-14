import PropTypes from 'prop-types';
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { css } from '@emotion/core';
import Link from './Link';

import * as ß from '../emotion/grid-list';

import HamburgerMenu from './hamburger-menu';

const GridList = ({ active, prefix }) => {
  const data = useStaticQuery(
    graphql`
      query {
        listIcon: file(relativePath: { eq: "list-icon.png" }) {
          childImageSharp {
            fixed(quality: 100, width: 30) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
        gridIcon: file(relativePath: { eq: "grid-icon.png" }) {
          childImageSharp {
            fixed(quality: 100, width: 30) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    `
  );
  return (
    <aside css={ß.wrapper}>
      <HamburgerMenu cssmod={ß.padBurger} />
      <Link to={`/${prefix}`} css={css(ß.anchor(active === 'list'), ß.list)}>
        <Img fixed={data.listIcon.childImageSharp.fixed} />
      </Link>
      <Link
        to={`/${prefix}grid`}
        css={css(ß.anchor(active === 'grid'), ß.grid)}
      >
        <Img fixed={data.gridIcon.childImageSharp.fixed} />
      </Link>
    </aside>
  );
};

GridList.propTypes = {
  active: PropTypes.string,
  prefix: PropTypes.string,
};

GridList.defaultProps = {
  active: 'list',
  prefix: '',
};

export default GridList;
