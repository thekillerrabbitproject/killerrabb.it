import React from 'react';
import {useStateValue} from '../utils';
import '../styles/hamburger-menu.scss';

const HamburgerMenu = ({onClick}) => {
  const [{ menu }] = useStateValue();
  return (
    <button
        onClick={onClick}
        className={`menu-hamburger ${menu ? 'menu-open' : 'menu-closed'}`}
      >
        <span className="first"></span>
        <span className="middle"></span>
        <span className="last"></span>
      </button>
  )
};

export default HamburgerMenu;
