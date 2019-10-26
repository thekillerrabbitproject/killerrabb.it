import React from 'react';
import PropTypes from 'prop-types';
import { useStateValue } from '../utils';

const Main = ({ children, className }) => {
  const [{ menu = false }] = useStateValue();
  return (
    <main className={`${className} ${menu ? 'menu-open' : 'menu-closed'}`}>
      {children}
    </main>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Main;
