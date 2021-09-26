import { css } from '@emotion/react';

export const borderWrapper = css`
  position: relative;
  position: relative;
  padding: var(--fakeBorder);
`;

const border = css`
  position: fixed;
  background: var(--tertiary);
  z-index: 1;
  transform: translateZ(0);
`;

const horizontalBorder = css`
  left: 0;
  right: 0;
  width: 100vw;
  height: var(--fakeBorder);
`;

const verticalBorder = css`
  top: 0;
  bottom: 0;
  width: var(--fakeBorder);
  height: 100vh;
`;

const corner = css`
  content: '';
  position: absolute;

  background-color: transparent;
  height: 20px;
  width: 10px;
`;

export const borderTop = css`
  ${border};
  ${horizontalBorder};
  top: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  &::before {
    ${corner};
    bottom: -20px;
    border-top-left-radius: 10px;
    left: var(--fakeBorder);
    box-shadow: 0 -10px 0 0 var(--tertiary);
  }
  &::after {
    ${corner};
    bottom: -20px;
    border-top-right-radius: 10px;
    right: var(--fakeBorder);
    box-shadow: 0 -10px 0 0 var(--tertiary);
  }
`;

export const borderBottom = css`
  ${border};
  ${horizontalBorder};
  bottom: 0;
  &::before {
    ${corner};
    top: -20px;
    border-bottom-left-radius: 10px;
    left: var(--fakeBorder);
    box-shadow: 0 10px 0 0 var(--tertiary);
  }
  &::after {
    ${corner};
    top: -20px;
    border-bottom-right-radius: 10px;
    right: var(--fakeBorder);
    box-shadow: 0 10px 0 0 var(--tertiary);
  }
`;

export const borderLeft = css`
  ${border};
  ${verticalBorder};
  left: 0;
`;

export const borderRight = css`
  ${border};
  ${verticalBorder};
  right: 0;
`;

export const normalContent = css`
  background: var(--darkness);
  min-height: calc(100vh - 40px);
`;

export const floatingTitle = css`
  text-align: center;
  padding-bottom: 2px;
`;

export const share = css`
  filter: invert(100%);
`;
