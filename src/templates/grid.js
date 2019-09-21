import React from "react"
import { graphql } from "gatsby"
import mangoSlugfy from '@mangocorporation/mango-slugfy'
import Img from 'gatsby-image'
import Link from "gatsby-plugin-transition-link/AniLink";


import Layout from "../components/layout"
import SEO from "../components/seo"
import GridList from "../components/grid-list"
import Pagination from '../components/pagination';

import '../styles/nav.scss';

import {getCardImage} from '../utils';

const Grid = ({ data, pageContext, location }) => {
  const getAlbums = () => {
    return data.api.albums.map(album => (
      <article key={album.id}>
        <Link cover direction="left" bg="#1b1c1e" to={`/${mangoSlugfy(album.title)}`}
          state={{
            prevPath: location.pathname,
          }}
        >
          <Img className="photo" fluid={album.cover_photo.childImageSharp.fluid} alt="" objectFit="cover"
      objectPosition="50% 50%" />
        </Link>
      </article>
    ));
  };

  return (<Layout className="grid">
    <SEO title="Home Grid" meta={getCardImage(data.api.albums[0].cover_photo_base_url)} />
    <GridList active="grid" prefix={pageContext.prefix} />
    <Pagination {...pageContext} />
    {getAlbums()}
    <Pagination {...pageContext} />
  </Layout>)
}

export const query = graphql`
query API_GridQueryTMP($skip: Int!, $limit: Int!, $tag: String) {
  api {
    albums(order: "ASC", skip: $skip, limit: $limit, tag: $tag) {
      id
      title
      cover_photo_base_url
      order
      cover_photo {
        ext
        absolutePath
        childImageSharp {
          fluid(quality: 100, cropFocus: ENTROPY, maxWidth: 330, maxHeight: 330, fit: COVER) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
}`


export default Grid
