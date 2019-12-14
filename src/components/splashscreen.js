import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import * as ß from '../emotion/splashscreen';

const SplashScreen = () => {
  const data = useStaticQuery(
    graphql`
      query {
        iphone5: file(name: { eq: "iphone5_splash" }) {
          childImageSharp {
            fixed(width: 320) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
        iphone6: file(name: { eq: "iphone6_splash" }) {
          childImageSharp {
            fixed(width: 375) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
        iphoneplus: file(name: { eq: "iphoneplus_splash" }) {
          childImageSharp {
            fixed(width: 621) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
        iphonex: file(name: { eq: "iphonex_splash" }) {
          childImageSharp {
            fixed(width: 375) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
        iphonexr: file(name: { eq: "iphonexr_splash" }) {
          childImageSharp {
            fixed(width: 414) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
        iphonexsmax: file(name: { eq: "iphonexsmax_splash" }) {
          childImageSharp {
            fixed(width: 414) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
        ipad: file(name: { eq: "ipad_splash" }) {
          childImageSharp {
            fixed(width: 768) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
        ipadpro1: file(name: { eq: "ipadpro1_splash" }) {
          childImageSharp {
            fixed(width: 834) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
        ipadpro2: file(name: { eq: "ipadpro2_splash" }) {
          childImageSharp {
            fixed(width: 834) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
        ipadpro3: file(name: { eq: "ipadpro3_splash" }) {
          childImageSharp {
            fixed(width: 1024) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
        icon: file(name: { eq: "icon" }) {
          childImageSharp {
            fixed(width: 256) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
      }
    `
  );

  return (
    <div key={`splashscreen`} css={ß.splashscreen} id="___splashscreen">
      <Img
        fixed={data.icon.childImageSharp.fixed}
        css={ß.fallback}
        critical
        imgStyle={{ opacity: 1 }}
      />
      <Img
        fixed={data.iphone5.childImageSharp.fixed}
        css={ß.loaderIphone5}
        critical
        imgStyle={{ opacity: 1 }}
      />
      <Img
        fixed={data.iphone6.childImageSharp.fixed}
        css={ß.loaderIphone6}
        critical
        imgStyle={{ opacity: 1 }}
      />
      <Img
        fixed={data.iphoneplus.childImageSharp.fixed}
        css={ß.loaderIphonePlus}
        critical
        imgStyle={{ opacity: 1 }}
      />
      <Img
        fixed={data.iphonex.childImageSharp.fixed}
        loader={ß.loaderIphoneX}
        critical
        imgStyle={{ opacity: 1 }}
      />
      <Img
        fixed={data.iphonexr.childImageSharp.fixed}
        css={ß.loaderIphoneXr}
        critical
        imgStyle={{ opacity: 1 }}
      />
      <Img
        fixed={data.iphonexsmax.childImageSharp.fixed}
        css={ß.loaderIphoneXsMax}
        critical
        imgStyle={{ opacity: 1 }}
      />
      <Img
        fixed={data.ipad.childImageSharp.fixed}
        css={ß.loaderIpad}
        critical
        imgStyle={{ opacity: 1 }}
      />
      <Img
        fixed={data.ipadpro1.childImageSharp.fixed}
        css={ß.loaderIpadPro1}
        critical
        imgStyle={{ opacity: 1 }}
      />
      <Img
        fixed={data.ipadpro3.childImageSharp.fixed}
        css={ß.loaderIpadPro3}
        critical
        imgStyle={{ opacity: 1 }}
      />
      <Img
        fixed={data.ipadpro2.childImageSharp.fixed}
        css={ß.loaderIpadPro2}
        critical
        imgStyle={{ opacity: 1 }}
      />
    </div>
  );
};

export default SplashScreen;

export { SplashScreen };
