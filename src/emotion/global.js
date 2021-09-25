import { css } from '@emotion/react';
import {
  primary,
  secondary,
  tertiary,
  highlight,
  grey,
  darkness,
} from '@css/utils/color';

export const globalCss = css`
  :root {
    --primary: ${primary};
    --secondary: ${secondary};
    --tertiary: ${tertiary};
    --highlight: ${highlight};
    --grey: ${grey};
    --darkness: ${darkness};
    --fakeBorder: 20px;
    --doubleFakeBorder: 40px;
  }
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
  body {
    line-height: 1;
    padding: env(safe-area-inset-top) env(safe-area-inset-right)
      env(safe-area-inset-bottom) env(safe-area-inset-left);
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
    background-color: var(---secondary);
  }

  body {
    color: var(--primary);
    font-size: 16px;
    margin: 0;
    background: var(--secondary);
    font-family: Arial, Helvetica, sans-serif;
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
`;
