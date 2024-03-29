import { css } from '@emotion/react';

export const video = css`
  width: 100%;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
  &:fullscreen {
    object-fit: contain;
  }
`;
