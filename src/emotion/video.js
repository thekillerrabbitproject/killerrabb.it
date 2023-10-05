import { css } from '@emotion/react';

export const video = css`
  width: 100%;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
  &:fullscreen {
    object-fit: contain;
  }
`;

export const main = css`
  max-width: 990px;
  margin: 0 auto;
  h1 {
    color: var(--highlight);
    --minFontSize: 24px;
    --maxFontSize: 32px;
    --scaler: 16vw;
    font-size: clamp(var(--minFontSize), var(--scaler), var(--maxFontSize));
  }}
`;

export const article = css`
  padding: var(--fakeBorder) 0;
  color: var(--primary);

  display: grid;
  gap: var(--fakeBorder);

  grid-template-areas:
    'title'
    'aside'
    'section'
    'relatedPosts';
`;

export const aside = css`
  position: relative;
  grid-area: aside;
`;

export const section = css`
  grid-area: section;
  border-bottom: 1px solid var(--highlight);
  padding-bottom: var(--fakeBorder);
  margin-bottom: var(--fakeBorder);
  h2 {
    color: var(--highlight);
    --minFontSize: 16px;
    --maxFontSize: 32px;
    --scaler: 16vw;
    font-size: clamp(var(--minFontSize), var(--scaler), var(--maxFontSize));
    margin: 0 0 var(--fakeBorder) 0;
  }
  h3 {
    --minFontSize: 14px;
    --maxFontSize: 22px;
    --scaler: 16vw;
    font-size: clamp(var(--minFontSize), var(--scaler), var(--maxFontSize));
    margin: calc(var(--fakeBorder) / 2) 0;
  }
  p {
    line-height: 18px;
  }
`;
