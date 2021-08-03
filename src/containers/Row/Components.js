import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const WebsiteRow = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transform: translate3d(0, 500%, 0);
  transition: filter 0.5s;
  overflow: hidden;
  &.lazyloaded {
    transform: translate3d(0, 100%, 0);
  }
  &.state-expanded,
  &.state-openPosition {
    .carousel-content .active img,
    .single-background img {
      filter: blur(10px);
    }
    .blur-on-expanded {
      filter: blur(10px);
    }
  }

  &.visible {
    transform: translate3d(0, 0, 0);
    .ReactModal__Body--open & {
      filter: blur(5px);
    }
  }
  &.zoomAnim {
    .single-background img,
    .carousel-content .active img {
      transform: translate3d(0, 0, 0) scale(1.09);
      transition: filter 0.2s, opacity 0.3s, transform 5s !important;
    }
  }
  &.animatingDown,
  &.animatingUp {
    .contentTitle {
      transition: transform 0.31s ease-in;
      transform: translate3d(0, 100%, 0);
    }
  }
  &.animatingUp {
    .contentContainer {
      opacity: 0;
    }
    .leftBarWrap:not(.no-anim) {
      transition: transform 0.4s ease-in-out 0.2s;
      transform: translate3d(0, -25%, 0);
    }
  }
  &.get-in-touch-cf > * {
    z-index: 2;
  }
  &#resources {
    background-color: #e6e6e6;
  }
  @media (max-width: 768px), (max-width: 1366px) and (orientation: portrait) {
    position: relative;
    transform: none;
    height: 100vh;
    overflow: visible;
    &.get-in-touch-cf {
      display: flex;
      flex-flow: column-reverse;
      height: initial;
    }
  }
  @media (max-width: 550px) {
    .touch-device &#our-company,
    .touch-device &#global-footprint,
    .touch-device &#recent-news {
      height: initial;
    }
  }
`;

export const LogoBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 34vw;
  height: 34vw;
  // background: linear-gradient(134deg, #000000 0%, #8e8e8e00 34%, #ffffff00 75%);
  background: linear-gradient(
    133deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(12, 12, 12, 0.96) 3.63%,
    rgba(255, 255, 255, 0) 49.36%
  );
  opacity: 0.5;
  pointer-events: none;
`;

export const ScrollButtonHiding = css`
  padding: 0;
  opacity: 1;
  transition: visibility 0.2s linear 0s, opacity 0.2s ease-in 0s;
  .website-row.state-expanded & {
    visibility: hidden;
    opacity: 0;
    transition-delay: 0.2s, 0s;
  }
`;

export const ScrollButton = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 5px 15px;
  > svg {
    width: 2.68vw;
    color: #bebebe;
    fill: currentColor;
    // opacity: 0.5;
  }
`;
