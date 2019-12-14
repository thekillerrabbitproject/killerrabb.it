import { css } from '@emotion/core';
import { media } from './utils/media';
import { primary, secundary, highlight, grey } from './utils/color';

export const album = css`
  margin: 0 0 0 10px;
  ${media} {
    margin: 10px;
  }
`;

export const nav = css`
  display: flex;
  flex-direction: row;
  color: ${grey};
  font-size: 16px;
  margin: 15px 0;
  align-items: baseline;
  a:link,
  a:visited,
  span {
    color: ${grey};
    padding: 0 5px;
    &:first-child {
      padding: 0 5px 0 0;
    }
    &.active {
      color: ${primary};
    }
  }
`;

export const share = css`
  color: ${primary};
  margin-left: auto;
`;

export const h1 = css`
  color: ${primary};
  font-size: 24px;
  margin: 15px 0 0 0;
  background: ${secundary};
  padding: 40px 20px;
  ${media} {
    font-size: 20px;
  }
`;

export const article = css`
  color: ${primary};
  font-size: 16px;
  line-height: 20px;
  margin: 0;
  padding: 30px 20px;
  background: #33323a;
  a:link,
  a:visited {
    color: ${highlight};
    text-decoration: underline;
  }
  ${media} {
    margin: 0;
    padding: 30px 10px;
  }
`;

export const tagUl = css`
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 5px 0 0 0;
`;

export const tagLi = css`
  a:link,
  a:visited {
    color: rgb(250, 202, 207);
    text-decoration: underline;
  }
  padding: 0 10px 0 0;
`;
