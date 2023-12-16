import { css } from '@emotion/react';

export const mediaQueryDesktop = '@media (min-width: 990px)';

export const sliderScrollbar = css`
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const primary = '#FFFFFF';
export const secondary = '#33323a';
export const tertiary = '#1b1c1e';
export const highlight = '#facacf';
export const trueblack = '#000000';
export const colorNegativeText = '#e8850d';
export const blackAndWhiteNegativeText = primary;
