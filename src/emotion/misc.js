import { css } from '@emotion/react';

export const fakeBorder = css`
  background: var(--tertiary);
  position: relative;
  padding: var(--fakeBorder);
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
  top: 2px;
`;
