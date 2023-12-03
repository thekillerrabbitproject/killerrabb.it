import { css } from '@emotion/react';

export const nav = css`
  margin: 8px 0;
`;

export const menu = css`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

export const menuHack = css`
  --text-shadow: 0px 0px 1px currentColor;
  head {
    &:has(link[rel='canonical'][href='https://killerrabb.it']) + body li#home a
    {
      text-shadow: var(--text-shadow);
    }
    &:has(link[rel='canonical'][href*='/posts']) + body li#posts a {
      text-shadow: var(--text-shadow);
    }
    &:has(link[rel='canonical'][href*='/videos']) + body li#videos a {
      text-shadow: var(--text-shadow);
    }
  }
`;
