import { css } from '@emotion/core';
import { secundary, primary, highlight } from './utils/color';
import { media } from './utils/media';

export const block = css`
  background: ${secundary};
  border: 0;
  margin: 0;
  max-width: 1350px;
  padding: 40px 20px;
  text-align: justify;
`;

export const padBurger = css`
  padding: 0px 10px;
`;

export const iframeWrapper = css`
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;

  iframe,
  object,
  embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const contentBlock = css`
  padding: 0 0 0 10px;
  color: ${primary};
  background: ${secundary};
  ${media} {
    padding: 10px;
  }
`;

export const h1 = css`
  color: ${primary};
  font-size: 24px;
  margin: 15px 0 0 0;
  background: ${secundary};
  padding: 20px 0px;
  ${media} {
    font-size: 20px;
  }
`;

export const subtitle = css`
  margin: 10px 0;
`;

export const discUl = css`
  font-size: 16px;
  line-height: 20px;
  margin: 0 0 20px 0;
  li {
    list-style-type: disc;
    list-style-position: inside;
  }
  a:link,
  a:visited {
    color: ${highlight};
    text-decoration: underline;
  }
`;

export const aside = css`
  ${discUl};
  font-size: 12px;
  margin-top: 10px;
  font-family: 'Courier New', Courier, monospace;
`;
