import { menuHack } from '@components/Menu/styles';
import { css } from '@emotion/react';

import fonts from './fonts';
import { headers } from './header';
import icon from './icon';
import loader from './loader';

const primary = '#FFFFFF';
const secondary = '#33323a';
const tertiary = '#1b1c1e';
const highlight = '#facacf';
const trueblack = '#000000';
const colorNegativeText = '#e8850d';
const blackAndWhiteNegativeText = '#FFF';

const global = css`
  :root {
    --primary: ${primary};
    --secondary: ${secondary};
    --tertiary: ${tertiary};
    --highlight: ${highlight};
    --trueblack: ${trueblack};
    --icon-color: invert(83%) sepia(8%) saturate(915%) hue-rotate(305deg)
      brightness(101%) contrast(96%);
    --font-vcr: 'vcr-osd-mono', sans-serif;
    --font-negative: 'Roboto Mono', ui-monospace, sans-serif;
    --color-negative: ${colorNegativeText};
    --black-and-white-negative: ${blackAndWhiteNegativeText};
  }
  ${fonts}
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html {
    background-color: var(--trueblack);
    overscroll-behavior: none;
  }

  body {
    line-height: 1;
    padding: env(safe-area-inset-top) env(safe-area-inset-right)
      env(safe-area-inset-bottom) env(safe-area-inset-left);
    color: var(--primary);
    font-size: 16px;
    margin: 8px;
    background: var(--trueblack);
    font-family: var(--font-negative);
    ${icon}
    a {
      opacity: 1;
      color: var(--highlight);
    }
    strong {
      font-weight: 700;
    }
    em {
      font-style: italic;
    }
  }
  ${loader}
  ${menuHack}
  ${headers}
`;

export default global;
