import { css } from '@emotion/react';

export const article = css`
  padding: var(--fakeBorder) calc(var(--fakeBorder) / 2);
  color: var(--primary);
`;
export const headline = css`
  position: relative;
  h1 {
    font-weight: 700;
    color: var(--highlight);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    --minFontSize: 32px;
    --maxFontSize: 200px;
    --scaler: 16vw;
    font-size: clamp(var(--minFontSize), var(--scaler), var(--maxFontSize));
  }
`;

export const section = css`
  display: grid;
  grid-template-columns: [article] auto [share] calc(24px + var(--fakeBorder));
  aside {
    grid-area: share;
    padding: var(--fakeBorder) calc(var(--fakeBorder) / 2);
  }
  article {
    grid-area: article;
  }
`;
