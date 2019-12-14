import { css } from '@emotion/core';
import { media } from './utils/media';
import { highlight } from './utils/color';

const open = css`
  transform: translateX(-100%);
`;
const closed = css`
  transform: translate(0);
`;

const checkIfShitIsOpen = x => (x ? closed : open);

export const header = menu => css`
  text-align: left;
  max-width: 150px;
  position: fixed;
  padding: 15px;
  ${media} {
    max-width: 750px;
    margin: 0 0 25px 0;
    padding: 0;
    transition: all 0.5s ease-in-out;
    ${checkIfShitIsOpen(menu)}
  }
`;

export const img = css`
  border-radius: 500px;
  ${media} {
    margin: 0 0 0 10px;
  }
`;

export const nav = css`
  ${media} {
    padding: 0;
    margin: 10px 0 0 0;
  }
`;

export const navUl = css`
  list-style-type: none;
  padding: 0;
  margin: 10px 0 0 10px;
  border: 0;
  font-size: 15px;
  line-height: 1.3em;
  font-weight: bold;
  ${media} {
    padding: 0;
    margin: 10px 0 0 0;
  }
`;

export const navLi = css`
  display: list-item;
  ${media} {
    padding: 10px;
    border-top: 1px solid ${highlight};
    &:last-child {
      border-bottom: 1px solid ${highlight};
    }
  }
`;

export const h1 = css`
  margin: 0;
`;

export const hamburgerMenu = css`
  margin: 10px !important;
`;
