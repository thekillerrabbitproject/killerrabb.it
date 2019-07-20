import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import mangoSlugfy from '@mangocorporation/mango-slugfy'
import Img from 'gatsby-image'


import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
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

  return (<Layout>
    <SEO title="Home" />
    {getAlbums()}
  </Layout>)
}

export const query = graphql`
query API_ListQuery {
  api {
    albums(order: "DESC") {
      id
      title
      cover_photo_base_url
      order
      cover_photo {
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
