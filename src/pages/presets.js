import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import SEO from '../components/seo';
import GatsbyLink from 'gatsby-link';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import HamburgerMenu from '../components/hamburger-menu';

import * as ß from '../emotion/misc';

const Presets = ({ data }) => (
  <Layout>
    <SEO title="Lightroom Presets" />
    <HamburgerMenu cssmod={ß.padBurger} />
    <section css={ß.contentBlock}>
      <h1 css={ß.h1}>Lightroom Presets</h1>
      <p css={ß.subtitle}>Download:</p>
      {data.allFile.edges.length > 0 && (
        <ul css={ß.discUl}>
          {data.allFile.edges.map(item => (
            <li key={item.node.base}>
              <GatsbyLink to={item.node.publicURL}>
                {item.node.base} ({item.node.prettySize})
              </GatsbyLink>
            </li>
          ))}
        </ul>
      )}
      <p css={ß.subtitle}>BW - High Contrast</p>
      <Img fluid={data.bwHighContrast.childImageSharp.fluid} />
      <p css={ß.subtitle}>BW - High Contrast + -70 Black</p>
      <Img fluid={data.bw70Black.childImageSharp.fluid} />
      <aside css={ß.aside}>
        <p>FAQ:</p>
        <ul>
          <li>
            <a href="https://helpx.adobe.com/lightroom-cc/kb/faq-install-presets-profiles.html">
              How to install presets in Lightroom
            </a>
          </li>
        </ul>
      </aside>
    </section>
  </Layout>
);

Presets.propTypes = {
  data: PropTypes.shape({
    allFile: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            base: PropTypes.string,
            publicURL: PropTypes.string,
            prettySize: PropTypes.string,
          }),
        })
      ),
    }),
    bwHighContrast: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.object,
      }),
    }),
    bw70Black: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.object,
      }),
    }),
  }),
};

export const data = graphql`
  {
    allFile(
      filter: { extension: { eq: "zip" } }
      sort: { order: DESC, fields: name }
    ) {
      edges {
        node {
          publicURL
          base
          prettySize
        }
      }
    }
    bwHighContrast: file(
      relativePath: { eq: "presets/before-after-bw-high-contrast.png" }
    ) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    bw70Black: file(relativePath: { eq: "presets/before-after-70-black.png" }) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`;

export default Presets;
