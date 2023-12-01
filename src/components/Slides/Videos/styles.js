import { css } from '@emotion/react';

export const videoSlider = css`
  scroll-snap-type: x mandatory;
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  gap: 8px;
`;

export const disabledVideoSlider = css`
  scroll-snap-type: unset;
  overflow-x: unset;
  -webkit-overflow-scrolling: unset;
  flex-wrap: wrap;
`;

export const videoTile = css`
  scroll-snap-align: start;
  display: grid;
  grid-template-areas:
    'header'
    'aside';
  grid-template-columns: 300px;
  min-width: 300px;
  height: 300px;
  overflow: hidden;
  aside {
    grid-area: aside;
    display: grid;
    position: relative;
    width: 300px;
    height: 300px;
  }
  h2 {
    font-family: var(--font-vcr);
  }
  p {
    color: var(--primary);
  }
`;

export const removeDecoration = css`
  text-decoration: unset;
`;
