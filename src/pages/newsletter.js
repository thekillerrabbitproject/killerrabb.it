import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import '../styles/newsletter.scss';

const Newsletter = () => (
  <Layout>
    <SEO title="Newsletter" />
    <section className="newsletter">
      <h1>Subscribe to my newletter</h1>
      <p>
        Don't miss any new post <span role="img" aria-label="heart emoji">😍</span>
      </p>
      <div className="iframe-wrapper">
        <iframe width="480" height="320" title="newsletter" src="https://tkrp.substack.com/embed" frameborder="0" scrolling="no"></iframe>
      </div>
    </section>
  </Layout>
)

export default Newsletter
