import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const SliderWrap = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 0;
  overflow: hidden;
  background-color: #2f2f2f;
  @media (max-width: 768px) {
    /* position: relative; */
    bottom: initial;
    .welcome-row & {
      bottom: 0;
    }
    .shape-rectangular & {
      /* position: relative; */
    }
    .shape-t_letter_inverse_reverse & {
      position: relative;
      margin-top: -135px;
    }
    .shape-leaf & {
      bottom: initial;
      position: absolute;
    }
  }
`;

export const slide = css`
  position: relative;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  pointer-events: none;
  user-select: none;
  @media (max-width: 768px) {
    overflow: hidden;
  }
`;

export const slideImage = css`
  /* display: none; */
  width: 100%;
  height: 100%;
  img {
    will-change: filter;
    backface-visibility: hidden;
    perspective: 1000;
    filter: blur(0.001px);
    transform: translate3d(0, 0, 0) scale(1);
    transition: filter 0.2s, opacity 0.3s, transform 0.1s !important;
    @media (max-width: 768px) {
      .website-row.shape-t_letter_v2_reverse &,
      .website-row.shape-leaf & {
        object-position: 70% !important;
      }
      will-change: unset;
      backface-visibility: unset;
      filter: none;
      transform: none;
      perspective: none;
    }
  }
  @media (max-width: 768px) {
    /* width: 180%; */
    .website-row#production-facilities & {
      img {
        object-position: 0% !important;
        height: 130%;
      }
    }
    .website-row#in-house-laboratories & {
      img {
        object-position: 29% !important;
      }
    }
  }
`;

export const carouselIndicators = css`
  position: absolute;
  bottom: 6%;
  left: 23%;
  z-index: 15;
  display: flex;
  justify-content: center;
  padding-left: 0;
  list-style: none;
  margin: 0 auto;
  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    bottom: 60px;
    .website-row.shape-t_letter & {
      top: 97vw;
      top: calc(290px + (100vw - 320px) * 1.183);
      bottom: initial;
    }
    .website-row.shape-t_letter_inverse_reverse & {
      bottom: 15px;
      top: initial;
    }
    .shape-k_letter_open & {
      top: calc(290px + (100vw - 320px) * 1.183);
      bottom: initial;
    }
  }
  @media (max-width: 550px) {
    bottom: 15px;
  }
`;

export const carouselIndicatorWrap = css`
  height: 22px;
  width: 22px;
  border-radius: 50%;
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const CarouselIndicator = styled.div`
  position: relative;
  background-color: #808080;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 50%;
  padding: 0;
  transition: transform 0.2s, background-color 0.2s;
  .active.carousel-indicator & {
    background-color: #fff;
    transform: scale(1.5);
  }
`;

export const carouselContent = css`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: hidden;
  position: relative;
  user-select: none;
  height: 100%;
`;

export const CarouselChild = styled.div`
  flex: 1;
  height: 100%;
`;
