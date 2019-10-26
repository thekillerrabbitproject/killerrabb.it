import React from 'react';
import PropTypes from 'prop-types';

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
        {/* styles splashscreen.scss minified */}
        <style>{`#___splashscreen{align-items:center;background-color:#1b1c1e;display:flex;justify-content:center;position:absolute;left:0;top:0;right:0;bottom:0;z-index:100}#___splashscreen div{display:none!important;width:100%}@media (min-device-width:320px) and (max-device-width:768px){#___splashscreen .fallback{display:block!important}}@media (device-width:320px) and (device-height:568px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait){#___splashscreen .loader-iphone5{display:block!important}#___splashscreen .fallback{display:none!important}}@media (device-width:375px) and (device-height:667px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait){#___splashscreen .loader-iphone6{display:block!important}#___splashscreen .fallback{display:none!important}}@media (device-width:621px) and (device-height:1104px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait){#___splashscreen .loader-iphoneplus{display:block!important}#___splashscreen .fallback{display:none!important}}@media (device-width:375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait){#___splashscreen .loader-iphonex{display:block!important}#___splashscreen .fallback{display:none!important}}@media (device-width:414px) and (device-height:896px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait){#___splashscreen .loader-iphonexr{display:block!important}#___splashscreen .fallback{display:none!important}}@media (device-width:414px) and (device-height:896px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait){#___splashscreen .loader-iphonexsmax{display:block!important}#___splashscreen .fallback{display:none!important}}@media (device-width:768px) and (device-height:1024px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait){#___splashscreen .loader-ipad{display:block!important}#___splashscreen .fallback{display:none!important}}@media (device-width:834px) and (device-height:1112px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait){#___splashscreen .loader-ipadpro1{display:block!important}#___splashscreen .fallback{display:none!important}}@media (device-width:834px) and (device-height:1194px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait){#___splashscreen .loader-ipadpro3{display:block!important}#___splashscreen .fallback{display:none!important}}@media (device-width:1024px) and (device-height:1366px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait){#___splashscreen .loader-ipadpro2{display:block!important}#___splashscreen .fallback{display:none!important}}`}</style>
        <noscript>
          <style>{`
            #___splashscreen {
              display: none;
            }
          `}</style>
        </noscript>
      </head>
      <body {...props.bodyAttributes}>
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
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
