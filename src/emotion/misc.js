import { css } from '@emotion/react';

export const borderWrapper = css`
  position: relative;
  padding: var(--fakeBorder);
  margin-top: var(--fakeBorder);
`;

export const floatingTitle = css`
  text-align: center;
  padding: calc(var(--fakeBorder) / 2) 0;
  background-color: var(--tertiary);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 2;
`;

export const share = css`
  filter: invert(100%);
`;

export const container = css`
  column-count: 2;
  column-gap: 10px;
  column-fill: balance;

  @media (min-width: 990px) {
    column-count: 4;
  }
  @media (min-width: 1200px) {
    column-count: 6;
  }
`;

export const articleGrid = css`
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 10px;
  break-inside: avoid;
`;
