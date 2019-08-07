import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GatsbyLink from "gatsby-link";
import { graphql } from "gatsby";

import "../styles/presets.scss";

const Presets = ({ data }) => (
  <Layout>
    <SEO title="Lightroom Presets" />
    <article className="presets">
    <h1>Lightroom Presets</h1>
    {data.allFile.edges.length > 0 && 
      (<ul>{data.allFile.edges.map(item => <li key={item.node.base}><GatsbyLink to={item.node.publicURL}>{item.node.base} ({item.node.prettySize})</GatsbyLink></li>)}</ul>)
    }
    <aside>
      <p>FAQ:</p>
      <ul><li><a href="https://helpx.adobe.com/lightroom-cc/kb/faq-install-presets-profiles.html">How to install presets in Lightroom</a></li></ul>
    </aside>
    </article>
  </Layout>
)

export const data = graphql`
{
  allFile(filter: {extension: {eq: "zip"}}) {
    edges {
      node {
        publicURL
        base
        prettySize
      }
    }
  }
}
`

export default Presets
