import { css } from '@emotion/core';
import { media } from './utils/media';
import { highlight } from './utils/color';

export const hamburger = css`
  display: none;
  color: ${highlight};
  font-size: 24px;
  position: relative;
  width: 50px;
  height: 50px;
  user-select: none;
  border: none;
  background: transparent;
  padding: 0;
  ${media} {
    display: block;
    margin: 10px 0;
    outline: none;
    &:focus {
      outline: none;
    }
  }
`;

const open = css`
  opacity: 1;
  transform: rotate(45deg) translate(-4px, -3px);
  background: ${highlight};
  &.middle {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }
  &.last {
    transform: rotate(-45deg) translate(0, -1px);
  }
`;

const checkIfShitIsOpen = x => (x ? open : ``);

export const span = menu => css`
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;
  background: ${highlight};
  border-radius: 3px;
  z-index: 1;
  transform-origin: 4px 0px;
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  &.first {
    transform-origin: 0% 0%;
  }
  &.last {
    transform-origin: 0% 100%;
  }
  ${checkIfShitIsOpen(menu)}
`;
