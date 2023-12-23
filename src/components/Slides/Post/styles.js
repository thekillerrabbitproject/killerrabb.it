import { mediaQueryDesktop, sliderScrollbar } from '@css/constants';
import { css } from '@emotion/react';

export const slider = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px 0;

  ${mediaQueryDesktop} {
    display: block;
    position: relative;
    inline-size: 100%;
    white-space: nowrap;
    overflow: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    ${sliderScrollbar}
    height: var(--slider-default-height);
  }
`;

export const imageWrapper = ({ height }) => css`
  ${mediaQueryDesktop} {
    --ratio: ${height};
    --width: calc(var(--slider-default-height) / var(--ratio));

    width: var(--width);
    height: var(--slider-default-height);
    margin-inline-end: 16px;

    display: inline-block;
    scroll-snap-align: center;
    position: relative;

    .gatsby-image-wrapper {
      object-fit: contain;
      width: var(--width);
      height: var(--slider-default-height);
    }
  }
`;
