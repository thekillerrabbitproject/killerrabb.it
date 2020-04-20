import React from 'react';
import PropTypes from 'prop-types';
import { Link as GLink } from 'gatsby';
// import GLink from 'gatsby-plugin-transition-link/AniLink';
import { tertiary } from '../emotion/utils/color';

const Link = ({ to, direction, children, ...rest }) => (
  <GLink cover direction={direction} bg={tertiary} to={to} {...rest}>
    {children}
  </GLink>
);

Link.propTypes = {
  to: PropTypes.string,
  direction: PropTypes.string,
  children: PropTypes.node,
};

Link.defaultProps = {
  direction: 'right',
};

export default Link;
