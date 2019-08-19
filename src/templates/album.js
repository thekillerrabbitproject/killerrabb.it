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

  // const getShareButton = () => {
  //   if (typeof window !== `undefined`) {
  //     const share = pathOr(false, ['navigator', 'share'], window);
  //     if (share) {
  //       return <a href={`/${pageContext.slugPath}`} className="share" onClick={(e) => {
  //         e.preventDefault();
  //         navigator.share({
  //           title: data.api.album[0].title,
  //           text: data.api.album[0].title,
  //           url: `/${pageContext.slugPath}`
  //         }).catch(e => e); //silence catch
  //       }}><Img fixed={data.shareIcon.childImageSharp.fixed} /></a>
  //     }
  //   }
  // }

  return (<Layout>
    <SEO
      title={data.api.album[0].title}
      meta={getCardImage(data.api.album[0].cover_photo_base_url)}
    />
    <article className="album">
      <nav>
        {getBackButton()} / <span className="active">{data.api.album[0].title}</span> <ShareButton title={data.api.album[0].title} slugPath={pageContext.slugPath} />
      </nav>
      <h1>{data.api.album[0].title}</h1>
      {getCoverPhoto()}
      {getContent()}
      {getGallery()}
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
