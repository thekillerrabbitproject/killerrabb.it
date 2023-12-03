import { css } from '@emotion/react';

export const meta = css`
  width: calc(100vw - 16px);

  font-family: var(--font-negative);
  mix-blend-mode: screen;
  margin: 16px 0;
  p,
  ul {
    margin-top: 4px;
    font-style: italic;
    font-weight: 300;
    scroll-snap-align: center;
  }
  ul {
    display: flex;
    gap: 8px;
    text-transform: lowercase;
    &:first-of-type {
    }
    li {
      &::before {
        content: '\\25B8';
        margin-right: 8px;
      }
    }
  }
  a {
    text-decoration: none;
    color: currentColor;
  }
  &.color {
    color: var(--color-negative);
  }
  &.black-white {
    color: var(--black-and-white-negative);
  }
`;

export const metaSlider = css`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  position: relative;
  inline-size: 100%;
  white-space: nowrap;
  overflow-y: hidden;
  scroll-snap-type: x;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
