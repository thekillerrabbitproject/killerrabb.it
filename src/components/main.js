import React from 'react';
import {
  useStateValue
} from '../utils';

const Main = ({children, className}) => {
  const [{ menu = false }] = useStateValue();
  return (<main className={`${className} ${menu ? 'menu-open' : 'menu-closed'}`}>{children}</main>)
}

export default Main;