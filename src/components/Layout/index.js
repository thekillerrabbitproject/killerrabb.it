import React from 'react';
import Footer from '@components/Footer';
import Header from '@components/Header';
import globalStyles from '@css/global';
import { Global } from '@emotion/react';
import { children } from '@types';

const Layout = ({ children }) => (
  <>
    <Global styles={globalStyles} />
    <Header />
    <main>
      {children}
      <Footer />
    </main>
    <div id="loader">
      <div className="lds-heart">
        <div></div>
      </div>
      <p>Loading...</p>
    </div>
  </>
);

Layout.propTypes = children;

export default Layout;
