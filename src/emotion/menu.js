import { css } from '@emotion/react';
import { darkness, highlight } from './utils/color';

const span = css`
  display: block;
  width: 20px;
  height: 2px;
  margin-bottom: 2px;
  position: relative;

  background: ${highlight};
  border-radius: 3px;

  z-index: 1;
`;

export const nav = css`
  width: 20px;
  height: 16px;
  position: fixed;
  top: 0;
  padding-top: 4px;
  right: 20px;
  z-index: 1;
  cursor: pointer;
  span {
    ${span};
  }
`;

export const dialog = css`
  transform: translate(0, 0);
  height: 100vh;
  width: 100vw;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 20px 0 0 0;

  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: invert(1) opacity(0.8);
  ul {
    margin: 20px;
    display: flex;
    justify-content: center;
    li a {
      display: flex;
      align-self: center;
      gap: 8px;
    }
  }
`;

export const close = css`
  cursor: pointer;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  right: 20px;
  padding: 4px;
  background: ${highlight};
  color: ${darkness};
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
