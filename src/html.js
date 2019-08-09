import React from "react"
import PropTypes from "prop-types"

import iphone5_splash from './images/splashscreen/iphone5_splash.png';
import iphone6_splash from './images/splashscreen/iphone6_splash.png';
import iphoneplus_splash from './images/splashscreen/iphoneplus_splash.png';
import iphonex_splash from './images/splashscreen/iphonex_splash.png';
import iphonexr_splash from './images/splashscreen/iphonexr_splash.png';
import iphonexsmax_splash from './images/splashscreen/iphonexsmax_splash.png';
import ipad_splash from './images/splashscreen/ipad_splash.png';
import ipadpro1_splash from './images/splashscreen/ipadpro1_splash.png';
import ipadpro3_splash from './images/splashscreen/ipadpro3_splash.png';
import ipadpro2_splash from './images/splashscreen/ipadpro2_splash.png';
import icon from './images/icon.png'

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        {/* styles.loader.css minified */}
        <style>{`#___loader{align-items:center;background-color:#1b1c1e;display:flex;justify-content:center;position:absolute;left:0;top:0;right:0;bottom:0;z-index:100}#___loader img{display:none;width:100%}@media (max-device-width:768px){#___loader img.fallback{display:block;width:50%}}@media (device-width:320px) and (device-height:568px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait){#___loader img.loader-iphone5{display:block}#___loader img.fallback{display:none}}@media (device-width:375px) and (device-height:667px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait){#___loader img.loader-iphone6{display:block}#___loader img.fallback{display:none}}@media (device-width:621px) and (device-height:1104px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait){#___loader img.loader-iphoneplus{display:block}#___loader img.fallback{display:none}}@media (device-width:375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait){#___loader img.loader-iphonex{display:block}#___loader img.fallback{display:none}}@media (device-width:414px) and (device-height:896px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait){#___loader img.loader-iphonexr{display:block}#___loader img.fallback{display:none}}@media (device-width:414px) and (device-height:896px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait){#___loader img.loader-iphonexsmax{display:block}#___loader img.fallback{display:none}}@media (device-width:768px) and (device-height:1024px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait){#___loader img.loader-ipad{display:block}#___loader img.fallback{display:none}}@media (device-width:834px) and (device-height:1112px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait){#___loader img.loader-ipadpro1{display:block}#___loader img.fallback{display:none}}@media (device-width:834px) and (device-height:1194px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait){#___loader img.loader-ipadpro3{display:block}#___loader img.fallback{display:none}}@media (device-width:1024px) and (device-height:1366px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait){#___loader img.loader-ipadpro2{display:block}#___loader img.fallback{display:none}}`}
        </style>
        <noscript>
          <style>{`
            #___loader {
              display: none;
            }
          `}</style>
        </noscript>
      </head>
      <body {...props.bodyAttributes}>
      <div
            key={`loader`}
            id="___loader"
        >
          {/* TODO: refactor to use srcSet */}
          <img src={icon} className="fallback" />
          <img src={iphone5_splash} className="loader-iphone5" />
          <img src={iphone6_splash} className="loader-iphone6" />
          <img src={iphoneplus_splash} className="loader-iphoneplus" />
          <img src={iphonex_splash} className="loader-iphonex" />
          <img src={iphonexr_splash} className="loader-iphonexr" />
          <img src={iphonexsmax_splash} className="loader-iphonexsmax" />
          <img src={ipad_splash} className="loader-ipad" />
          <img src={ipadpro1_splash} className="loader-ipadpro1" />
          <img src={ipadpro3_splash} className="loader-ipadpro3" />
          <img src={ipadpro2_splash} className="loader-ipadpro2" />
        </div>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
