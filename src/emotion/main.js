import { css } from '@emotion/core';
import { media } from './utils/media';

const open = css`
  transform: translate3d(50%, 0, 30px);
  opacity: 0.2;
`;

const closed = css`
  transform: translate3d(0, 0, 0);
  opacity: 1;
`;

const checkIfShitIsOpen = x => (x ? open : closed);

export const main = menu => css`
  margin-left: 170px;
  max-width: 1350px;
  .photo {
    width: 100%;
  }
  ${media} {
    margin: 0;
    padding: 0;
  }
  transition: all 0.5s ease-in-out;
  perspective: 100px;
  ${checkIfShitIsOpen(menu)}
`;

export const grid = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  ${media} {
    padding: 10px;
    margin: 0;
  }
`;

export const gridArticle = css`
  flex-basis: calc((100% / 3) - 20px - 4px);
  overflow: hidden;
  padding: 10px;
  margin: 0;
  background: #33323a;
  border: 2px solid #1b1c1e;
`;

export const gridSection = css`
  height: 100%;
`;

export const gridP = css`
  text-align: left;
`;
