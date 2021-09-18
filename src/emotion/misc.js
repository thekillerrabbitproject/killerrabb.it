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

export const borderTop = css`
  ${border};
  ${horizontalBorder};
  top: 0;
`;

export const borderBottom = css`
  ${border};
  ${horizontalBorder};
  bottom: 0;
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
`;

export const share = css`
  filter: invert(100%);
`;
