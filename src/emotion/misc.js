import { css, keyframes } from '@emotion/react';

const paddingnify = keyframes`
  from {
    padding: 0;
  }
  to {
    padding: var(--fakeBorder);
  }
`;

const moveWithPaddingfy = keyframes`
  from {
    opacity: 0;
    top: -10px;
  }
  to {
    opacity: 1;
    top: 2px;
  }
`;

export const fakeBorder = css`
  background: var(--tertiary);
  position: relative;
  animation: ${paddingnify} 1s ease-in-out;
  animation-fill-mode: both;
`;

export const normalContent = css`
  background: var(--darkness);
  min-height: calc(100vh - 40px);
`;

export const floatingTitle = css`
  text-align: center;
  position: absolute;
  right: 0;
  left: 0;
  animation: ${moveWithPaddingfy} 1s ease-in-out;
  animation-fill-mode: both;
`;
