/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import {pathOr} from 'ramda';
import iphone5_splash from '../images/splashscreen/iphone5_splash.png';
import iphone6_splash from '../images/splashscreen/iphone6_splash.png';
import iphoneplus_splash from '../images/splashscreen/iphoneplus_splash.png';
import iphonex_splash from '../images/splashscreen/iphonex_splash.png';
import iphonexr_splash from '../images/splashscreen/iphonexr_splash.png';
import iphonexsmax_splash from '../images/splashscreen/iphonexsmax_splash.png';
import ipad_splash from '../images/splashscreen/ipad_splash.png';
import ipadpro1_splash from '../images/splashscreen/ipadpro1_splash.png';
import ipadpro3_splash from '../images/splashscreen/ipadpro3_splash.png';
import ipadpro2_splash from '../images/splashscreen/ipadpro2_splash.png';

const SEO = ({ description, lang, meta, title, metaLinks }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = pathOr(description, ['siteMetadata', 'description'], site);
  const author = pathOr('', ['siteMetadata', 'author'], site);
  const metaTitle = pathOr('', ['siteMetadata', 'title'], site);

  const getIphoneSplashScreen = () => {
    return [
        {
          name: `link`,
          href: iphone5_splash,
          media: `(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: iphone6_splash,
          media: `(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: iphoneplus_splash,
          media: `(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: iphonex_splash,
          media: `(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: iphonexr_splash,
          media: `(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: iphonexsmax_splash,
          media: `(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: ipad_splash,
          media: `(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: ipadpro1_splash,
          media: `(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: ipadpro3_splash,
          media: `(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
        {
          name: `link`,
          href: ipadpro2_splash,
          media: `(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)`,
          rel: `apple-touch-startup-image`,
        },
      ];
  }

  const getGoSquared = () => {
    if (typeof window !== `undefined`) {
      const search = pathOr(false, ['location', 'search'], window);
      const urlParams = new URLSearchParams(search);
      if(!urlParams.get('noGoSquared')) {
        return (<script>{`
            !function(g,s,q,r,d){r=g[r]=g[r]||function(){(r.q=r.q||[]).push(
            arguments)};d=s.createElement(q);q=s.getElementsByTagName(q)[0];
            d.src='//d1l6p2sc9645hc.cloudfront.net/tracker.js';q.parentNode.
            insertBefore(d,q)}(window,document,'script','_gs');

            _gs('GSN-606701-F');
            _gs('set', 'anonymizeIP', true);
          `}</script>)
      }
      return null;
    }
    return null;
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${metaTitle}`}
      meta={[
        {
          name: `apple-mobile-web-app-capable`,
          content: `yes`,
        },
        {
          name: `apple-mobile-web-app-status-bar-style`,
          content: `black-translucent`,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
      link={[...metaLinks, ...getIphoneSplashScreen()]}
    >
      {getGoSquared()}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  metaLinks: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  metaLinks: PropTypes.arrayOf(PropTypes.object),
}

export default SEO
