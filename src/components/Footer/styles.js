import { css } from '@emotion/react';

export const footer = css`
  margin: 16px 0 32px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  font-family: var(--font-vcr);
  font-size: 14px;
  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 16px;
    li:not(a) {
      --text-shadow: 0px 0px 1px currentColor;
      text-shadow: var(--text-shadow);
    }
    li a {
      line-height: 26px;
      &::before {
        display: inline-block;
        content: '\\25B8';
        margin-right: 8px;
        color: currentColor;
        text-decoration: unset;
      }
    }
  }
`;
