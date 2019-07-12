import React from "react"
import { graphql, Link } from "gatsby"
import mangoSlugfy from '@mangocorporation/mango-slugfy'

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/album.scss";

const Album = ({ pageContext, data, location }) => {
  const getGallery = () => {
    return data.api.album[0].photos.map((photo) => (<img className="photo" key={photo.id} src={photo.base_url} alt="" />));
  }
  const getMetaLinks = () => {
    return data.api.album[0].photos.slice(0, 3).map((photo) => (
      {
        rel: "preload",
        href: photo.base_url,
        as: "image",
      }
    )).filter(i =>i);
  }
  return (<Layout>
    <SEO
      title={data.api.album[0].title}
      metaLinks={getMetaLinks()}
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
query AlbumQuery($albumId: String!) {
  api {
    album(id: $albumId) {
      id
      title
      cover_photo_base_url
      photos {
        id
        description
        base_url
      }
    }
  }
}`

export default Album
