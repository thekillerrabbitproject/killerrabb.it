import React from "react"
import { graphql } from "gatsby"
import mangoSlugfy from '@mangocorporation/mango-slugfy'
import Img from 'gatsby-image'
import Link from "gatsby-plugin-transition-link/AniLink";


import Layout from "../components/layout"
import SEO from "../components/seo"
import GridList from "../components/grid-list"
import Pagination from '../components/pagination';

import {getCardImage} from '../utils';

const List = ({ data, pageContext, location }) => {
  const getAlbums = () => {
    return data.api.albums.map(album => (
      <article key={album.id}>
        <Link cover direction="left" bg="#1b1c1e" to={`/${mangoSlugfy(album.title)}`}
        state={{
          prevPath: location.pathname,
        }}
        >
          <Img className="photo" fluid={album.cover_photo.childImageSharp.fluid} alt="" />
        </Link>
        <section>
          <p><Link to={`/${mangoSlugfy(album.title)}`}>{album.title}</Link></p>
        </section>
      </article>
    ));
  };

  return (<Layout>
    <SEO title="Home" meta={getCardImage(data.api.albums[0].cover_photo_base_url)} />
    <GridList active="list" />
    <Pagination {...pageContext} />
    {getAlbums()}
    <Pagination {...pageContext} />
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
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
}`


export default List
