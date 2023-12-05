import { css } from '@emotion/react';

export const mediaQueryDesktop = '@media (min-width: 990px)';

export const sliderScrollbar = css`
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
