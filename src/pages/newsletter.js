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
      <form action="https://tinyletter.com/persocon" method="post" target="popupwindow" onsubmit="window.open('https://tinyletter.com/persocon', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true">
        <p>
          <label for="tlemail">Enter your email address</label>
        </p>
        <p>
          <input type="email" name="email" id="tlemail" placeholder="email@host.com" />
        </p>
        <input type="hidden" value="1" name="embed"/>
        <input type="submit" value="Subscribe" />
      </form>
    </section>
  </Layout>
)

export default Newsletter
