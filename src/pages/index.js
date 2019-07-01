import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"


import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const getAlbums = () => {
    return data.api.albums.map(album => (
      <article key={album.id}>
        <Link to={`/${album.id}`}>
          <img className="photo" src={album.cover_photo_base_url} alt="" />
        </Link>
        <section>
          <p><Link to={`/${album.id}`}>{album.title}</Link></p>
        </section>
      </article>
    ));
  };
  const getMetaLinks = () => {
    return data.api.albums.slice(0, 3).map((album) => (
      {
        rel: "preload",
        href: album.cover_photo_base_url,
        as: "image",
      }
    )).filter(i =>i);
  };
  return (<Layout>
    <SEO title="Home" metaLinks={getMetaLinks()} />
    {getAlbums()}
  </Layout>)
}

export const query = graphql`
query ListQuery {
  api {
    albums(order: "DESC") {
      id
      title
      cover_photo_base_url
      order
    }
  }
}`


export default IndexPage
