import { css } from '@emotion/core';
import { media } from './utils/media';
import { primary, grey } from './utils/color';

export const wrapper = css`
  display: grid;
  grid-template-columns: [Menu] 50px [empty] auto [List] 30px [Grid] 30px;
  grid-column-gap: 10px;
  flex-basis: 100%;
  justify-items: right;
  padding: 0 10px;
`;

export const anchor = active => css`
  width: 30px;
  height: 30px;
  padding: 10px 0;
  color: ${grey};
  opacity: 0.5;
  ${media} {
    padding: 20px 10px;
  }
  ${active
    ? `
    color: ${primary};
    opacity: 1;
  `
    : ``}
`;

export const padBurger = css`
  grid-column: Menu;
`;

export const list = css`
  grid-column: List;
`;

export const grid = css`
  grid-column: Grid;
  text-align: right;
`;
