import { css } from '@emotion/core';
import { primary } from './utils/color';
import { media } from './utils/media';

export const nav = css`
  display: grid;
  grid-template-columns: [Prev] 33% [Pages] 33% [Next] 33%;
  flex-basis: 100%;
`;
export const navItemPrev = css`
  grid-column: Prev;
`;

export const navItemNext = css`
  grid-column: Next;
  text-align: right;
`;
export const anchor = css`
  padding: 10px 0;
  ${media} {
    padding: 20px 10px;
  }
`;

export const span = css`
  grid-column: Pages;
  text-align: center;
  color: ${primary};
  ${anchor};
`;
