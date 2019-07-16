import React from "react"
import { graphql, Link } from "gatsby"
import mangoSlugfy from '@mangocorporation/mango-slugfy'
import Img from "gatsby-image"


import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/album.scss";

const Album = ({ pageContext, data, location }) => {
  const getGallery = () => {
    return data.api.album[0].photos.map((photo) => (<Img className="photo" key={photo.id} fluid={photo.imageFile.childImageSharp.fluid} alt="" />));
  }
  return (<Layout>
    <SEO
      title={data.api.album[0].title}
    />
    <article className="album">
      <nav>
        <Link to="/">Home</Link> / <Link className="active" to={`/${mangoSlugfy(data.api.album[0].title)}`}>{data.api.album[0].title}</Link>
      </nav>
      <h1>{data.api.album[0].title}</h1>
      {getGallery()}
    </article>
  </Layout>);
}

export const query = graphql`
query API_AlbumQuery($albumId: String!) {
  api {
    album(id: $albumId) {
      id
      title
      photos {
        id
        description
        base_url
        imageFile {
          absolutePath
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
}`

export default Album
