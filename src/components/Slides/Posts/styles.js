import { css } from '@emotion/react';

export const innerSlider = css`
  --height: 256px;
  display: block;
  position: relative;
  inline-size: 100%;
  white-space: nowrap;
  overflow: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: var(--trueblack) transparent;
  height: var(--height);
  padding-bottom: 24px;
`;
export const isPortrait = (width, height) => height > width;

export const imageWrapper = ({ width, height }) => css`
  --ratio: calc(${width} / ${height});
  --width: calc(var(--height) * var(--ratio));

  max-width: var(--width);
  height: var(--height);
  margin-inline-end: 16px;

  display: inline-block;
  scroll-snap-align: center;
  position: relative;

  .gatsby-image-wrapper {
    object-fit: contain;
    max-width: var(--width);
    height: var(--height);
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
