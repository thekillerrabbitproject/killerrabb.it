import { sliderScrollbar } from '@css/constants';
import { css } from '@emotion/react';

const defaultHeight = '256';

export const videoSlider = css`
  --height: ${defaultHeight}px;
  display: block;
  position: relative;
  inline-size: 100%;
  white-space: nowrap;
  overflow: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  ${sliderScrollbar}
  height: var(--height);
  padding-bottom: 24px;
`;

export const disabledVideoSlider = css`
  scroll-snap-type: unset;
  overflow-x: unset;
  overflow-y: unset;
  -webkit-overflow-scrolling: unset;
  display: flex;
  flex-wrap: wrap;
  inline-size: auto;
  height: auto;
  gap: 16px 8px;
`;

export const videoTile = ({ width, height }) => css`
  --width: ${defaultHeight * (width / height)}px;

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
export const title = css`
  position: sticky;
  top: 6px;
  left: 0;
  z-index: 1;

  font-family: var(--font-vcr);
  mix-blend-mode: screen;
`;

export const removeDecoration = css`
  text-decoration: unset;
`;
