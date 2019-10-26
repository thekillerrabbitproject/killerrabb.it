import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

import '../styles/newsletter.scss';

import HamburgerMenu from '../components/hamburger-menu';

const Newsletter = () => (
  <Layout>
    <SEO title="Newsletter" />
    <div className="navigation">
      <HamburgerMenu />
    </div>
    <section className="newsletter">
      <h1>Subscribe to my newletter</h1>
      <p>
        Don&apos;t miss any new post{' '}
        <span role="img" aria-label="heart emoji">
          😍
        </span>
      </p>
      <div className="iframe-wrapper">
        <iframe
          width="480"
          height="320"
          title="newsletter"
          src="https://tkrp.substack.com/embed"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    </section>
  </Layout>
);

export default Newsletter;
