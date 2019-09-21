import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Link from "gatsby-plugin-transition-link/AniLink"
import { pathOr } from "ramda";


import ReactMarkdown from 'react-markdown'
import Layout from "../components/layout"
import SEO from "../components/seo"
import ShareButton from '../components/share-button';

import "../styles/album.scss";

import HamburgerMenu from '../components/hamburger-menu';

import {getCardImage} from '../utils';

const Album = ({ pageContext, data, location }) => {
  const prevPath = pathOr(false, ['state', 'prevPath'], location);
  const getGallery = () => {
    return data.api.album[0].photos.map((photo) => (<Img className="photo" key={photo.id} fluid={photo.imageFile.childImageSharp.fluid} alt="" />));
  }
  const getCoverPhoto = () => {
    return <Img className="photo photo--cover" fluid={data.api.album[0].cover_photo.childImageSharp.fluid}/>
  }
  const getContent = () => {
    return <article><ReactMarkdown source={data.api.album[0].content}/></article>
  }

  const getBackButton = () => {
    if (prevPath) {
      return <Link cover direction="right" bg="#1b1c1e" to={prevPath}>Back</Link>
    }
    return <Link cover direction="right" bg="#1b1c1e" to="/">Home</Link>
  }

  const getTags = () => {
    const {tags} = data.api.album[0];
    const tagsList =  tags.map((tag) => (
      <li key={tag.keyname}><Link cover direction="left" bg="#1b1c1e" to={`/tag/${tag.keyname}`}>#{tag.name}</Link></li>
    ))

    return (<div className="tags"><p>Tags:</p><ul>{tagsList}</ul></div>);
  }

  return (<Layout>
    <SEO
      title={data.api.album[0].title}
      meta={getCardImage(data.api.album[0].cover_photo_base_url)}
    />
    <article className="album">
      <HamburgerMenu />
      <nav>
        {getBackButton()} / <span className="active">{data.api.album[0].title}</span> <ShareButton title={data.api.album[0].title} slugPath={pageContext.slugPath} />
      </nav>
      <h1>{data.api.album[0].title}</h1>
      {getCoverPhoto()}
      {getContent()}
      {getGallery()}
      {getTags()}
    </article>
  </Layout>);
}

export const query = graphql`
query API_AlbumQuery($albumId: String!) {
  shareIcon: file(relativePath: {eq: "share-icon.png"}) {
    childImageSharp {
      fixed(quality: 100, width: 20) {
        ...GatsbyImageSharpFixed_withWebp
      }
    }
  }
  api {
    album(id: $albumId) {
      id
      title
      content
      tags {
        keyname
        name
      }
      cover_photo_base_url
      cover_photo {
        ext
        absolutePath
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
      photos {
        id
        description
        base_url
        imageFile {
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
  }
}`

export default Album
