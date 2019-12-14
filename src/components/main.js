import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useStateValue } from '../utils';

import * as ß from '../emotion/main';

const Main = ({ children, cssmod }) => {
  const [{ menu = false }] = useStateValue();
  return <main css={css(ß.main(menu), cssmod)}>{children}</main>;
};

Main.propTypes = {
  children: PropTypes.node,
  cssmod: PropTypes.object,
};

Main.defaultProps = {
  cssmod: {},
};

export default Main;
