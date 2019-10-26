import React from 'react';
import { useStateValue } from '../utils';
import '../styles/hamburger-menu.scss';

const HamburgerMenu = () => {
  const [{ menu }, dispatch] = useStateValue();
  const toggleMenu = e => {
    e.preventDefault();
    dispatch({
      type: 'toggle-menu',
    });
  };
  return (
    <button
      onClick={toggleMenu}
      className={`menu-hamburger ${menu ? 'menu-open' : 'menu-closed'}`}
    >
      <span className="first"></span>
      <span className="middle"></span>
      <span className="last"></span>
    </button>
  );
};

export default HamburgerMenu;
