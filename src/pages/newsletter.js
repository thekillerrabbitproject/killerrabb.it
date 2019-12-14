import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

import HamburgerMenu from '../components/hamburger-menu';

import * as ß from '../emotion/misc';

const Newsletter = () => (
  <Layout>
    <SEO title="Newsletter" />
    <HamburgerMenu cssmod={ß.padBurger} />
    <section css={ß.contentBlock}>
      <h1 css={ß.h1}>Subscribe to my newletter</h1>
      <p css={ß.subtitle}>
        Don&apos;t miss any new post{' '}
        <span role="img" aria-label="heart emoji">
          😍
        </span>
      </p>
      <div css={ß.iframeWrapper}>
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
