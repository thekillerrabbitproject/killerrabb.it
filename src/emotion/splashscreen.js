import { css } from '@emotion/core';
import { tertiary } from './utils/color';

export const splashscreen = css`
  align-items: center;
  background-color: ${tertiary};
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  div {
    display: none !important;
    width: 100%;
  }
`;

export const fallback = css`
  @media (min-device-width: 320px) and (max-device-width: 768px) {
    display: block !important;
  }
  @media (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
    display: none !important;
  }
  @media (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
    display: none !important;
  }
  @media (device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
    display: none !important;
  }
  @media (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
    display: none !important;
  }
  @media (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
    display: none !important;
  }
  @media (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
    display: none !important;
  }
  @media (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
    display: none !important;
  }
  @media (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
    display: none !important;
  }
  @media (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
    display: none !important;
  }
  @media (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
    display: none !important;
  }
`;

export const loaderIphone5 = css`
  @media (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
    display: block !important;
  }
`;

export const loaderIphone6 = css`
  @media (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
    display: block !important;
  }
`;

export const loaderIphonePlus = css`
  @media (device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
    display: block !important;
  }
`;

export const loaderIphoneX = css`
  @media (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
    display: block !important;
  }
`;

export const loaderIphoneXr = css`
  @media (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
    display: block !important;
  }
`;

export const loaderIphoneXsMax = css`
  @media (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
    display: block !important;
  }
`;

export const loaderIpad = css`
  @media (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
    display: block !important;
  }
`;

export const loaderIpadPro1 = css`
  @media (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
    display: block !important;
  }
`;

export const loaderIpadPro3 = css`
  @media (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
    display: block !important;
  }
`;

export const loaderIpadPro2 = css`
  @media (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
    display: block !important;
  }
`;
