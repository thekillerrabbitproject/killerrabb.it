import { sliderScrollbar } from '@css/constants';
import { css } from '@emotion/react';

const defaultHeight = '256';

export const innerSlider = css`
  display: block;
  position: relative;
  inline-size: 100%;
  white-space: nowrap;
  overflow: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  ${sliderScrollbar}
  height: ${defaultHeight}px;
  padding-bottom: 24px;
`;
export const isPortrait = (width, height) => height > width;

export const imageWrapper = ({ width, height }) => css`
  --width: ${defaultHeight * (width / height)}px;

  max-width: var(--width);
  height: ${defaultHeight}px;
  margin-inline-end: 16px;

  display: inline-block;
  scroll-snap-align: center;
  position: relative;

  .gatsby-image-wrapper {
    object-fit: contain;
    max-width: var(--width);
    height: ${defaultHeight}px;
  }
`;

export const meta = css`
  position: sticky;
  top: 6px;
  left: 0;
  z-index: 1;
  width: var(--slider-default-width);

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
  ${sliderScrollbar}
`;
