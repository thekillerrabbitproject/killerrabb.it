import { css } from '@emotion/react';

export const image = css`
  block-size: min(16rem, 90vh);
  inline-size: auto;
  max-width: 100vw;
  display: inline-block;
  object-fit: contain;
`;

export const item = css`
  position: relative;
  ${image}
`;

export const innerSlider = css`
  position: relative;
  inline-size: 100%;
  white-space: nowrap;
  overflow: auto;
  overflow-y: hidden;
  scroll-snap-type: x;
  margin: 0;
  scrollbar-width: thin;
  scrollbar-color: var(--trueblack) transparent;
  .featured a,
  .image a {
    ${item}
  }
  .gatsby-image-wrapper {
    ${item}
    margin-inline-end: 16px;
    scroll-snap-align: center;
    & > div,
    & > picture img {
      ${image}
      width: 100%
    }
  }
`;

export const meta = css`
  position: sticky;
  top: 6px;
  left: 0;
  z-index: 1;
  width: calc(100vw - 16px);

  font-family: var(--font-negative);
  mix-blend-mode: screen;
  h2 {
    scroll-snap-align: center;
  }
  p:first-of-type {
    margin-left: 16px;
  }
  p,
  ul {
    margin-top: 4px;
    font-style: italic;
    font-weight: 300;
    scroll-snap-align: center;
  }
  ul {
    display: flex;
    gap: 8px;
    text-transform: lowercase;
    &:first-of-type {
    }
    li {
      &::before {
        content: '\\25B8';
        margin-right: 8px;
      }
    }
  }
  a {
    text-decoration: none;
    color: currentColor;
  }
  &.color {
    color: var(--color-negative);
  }
  &.black-white {
    color: var(--black-and-white-negative);
  }
`;

export const metaSlider = css`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  position: relative;
  inline-size: 100%;
  white-space: nowrap;
  overflow-y: hidden;
  scroll-snap-type: x;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
