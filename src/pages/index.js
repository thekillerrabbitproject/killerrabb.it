import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import mangoSlugfy from '@mangocorporation/mango-slugfy'
import Img from 'gatsby-image'


import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  return (<Layout>
    <SEO title="Home" />
    <p>This page will be deleted on `gatsby-node.js`</p>
  </Layout>)
}

export default IndexPage
