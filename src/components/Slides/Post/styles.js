import { mediaQueryDesktop } from '@css/constants';
import { css } from '@emotion/react';

export const slider = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px 0;

  ${mediaQueryDesktop} {
    --height: calc(100vh - 160px);
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
  }
`;

export const isPortrait = (width, height) => height > width;

export const imageWrapper = ({ width, height }) => css`
  ${mediaQueryDesktop} {
    --ratio: ${height};
    --defaultWidth: 80vw;
    --width: ${isPortrait(width, height)
      ? 'calc(var(--height) / var(--ratio))'
      : 'var(--defaultWidth)'};

    width: var(--width);
    height: var(--height);
    margin-inline-end: 16px;

    display: inline-block;
    scroll-snap-align: center;
    position: relative;

    .gatsby-image-wrapper {
      object-fit: contain;
      width: var(--width);
      height: var(--height);
    }
  }
`;