import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import mangoSlugfy from '@mangocorporation/mango-slugfy'
import Img from 'gatsby-image'


import Layout from "../components/layout"
import SEO from "../components/seo"

import '../styles/nav.scss';

const IndexPage = ({ data, pageContext }) => {
  const getAlbums = () => {
    return data.api.albums.map(album => (
      <article key={album.id}>
        <Link to={`/${mangoSlugfy(album.title)}`}>
          <Img className="photo" fluid={album.cover_photo.childImageSharp.fluid} alt="" />
        </Link>
        <section>
          <p><Link to={`/${mangoSlugfy(album.title)}`}>{album.title}</Link></p>
        </section>
      </article>
    ));
  };

  const getPagination = () => {
    const { prevPath, nextPath, currentPage, numPages } = pageContext;
    return (
        <nav className="nav">
          {prevPath ? (
            <Link to={prevPath} className="nav--item__prev">
              Previous
            </Link>
          ) : null}
          <span>{currentPage} / {numPages}</span>
          {nextPath ? (
            <Link to={nextPath} className="nav--item__next">
              Next
            </Link>
          ) : null}
        </nav>
    );
  };

  return (<Layout>
    <SEO title="Home" />
    {getPagination()}
    {getAlbums()}
    {getPagination()}
  </Layout>)
}

export const query = graphql`
query API_ListQueryTMP($skip: Int!, $limit: Int!) {
  api {
    albums(order: "ASC", skip: $skip, limit: $limit) {
      id
      title
      cover_photo_base_url
      order
      cover_photo {
        ext
        absolutePath
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  }
}`


export default IndexPage
