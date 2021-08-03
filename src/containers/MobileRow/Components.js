import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const WebsiteRow = styled.div`
  position: absolute;
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transform: translate3d(0, 500%, 0);
  transform: none;
  transition: filter 0.5s;
  overflow: hidden;
  height: 60vw;
  @media (max-width: 1365px) {
    &.get-in-touch-cf {
      display: flex;
      flex-flow: column-reverse;
    }
  }
  @media (max-width: 1365px) and (min-width: 769px) {
    position: relative;
    transform: none;
    &.recent-news {
      display: flex;
      flex-flow: column-reverse;
      height: initial;
    }
    &.get-in-touch-cf {
      display: flex;
      flex-flow: column-reverse;
    }

    /* RESET HERE */
    .contentContainer {
      right: 3%;
      .leftbar-pagerow {
        margin-right: 25px;
      }
      .content-wrap {
        width: 28vw;
        height: 100%;
        margin-top: 26vw;
        max-height: 38vw;
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-size: 25px;
        }
        p {
          font-size: 15px;
        }
      }
    }

    /* BEGIN INDIVIDUAL MARGINS AND HEIGHTS AND WIDTHS */
    &.shape-t_letter,
    &.shape-k_letter_brands {
      .contentContainer .content-wrap {
        margin-top: 20vw;
      }
    }
    &.shape-slope_brands {
      .left-bar-svg {
        height: 53vw;
      }
      .brand-logos-wrap {
        margin-top: 8vw;
        .brand-logo {
          margin-bottom: 15px;
        }
      }
    }
    &.shape-rectangular,
    &.shape-rectangular_smaller,
    &.shape-t_letter_upside,
    &.shape-k_letter_open {
      .contentContainer .content-wrap {
        margin-top: 4vw;
        max-height: 52vw;
      }
    }
    &.shape-k_letter_open {
      .contentContainer {
        .left-bar-svg {
          height: 47vw;
        }
        .content-wrap {
          width: 33vw;
        }
      }
    }
    &.shape-rectangular {
      .contentContainer .content-wrap {
        width: 44vw;
      }
    }
    &.shape-rectangular_smaller {
      .contentContainer .content-wrap {
        width: 32vw;
      }
    }
    &.shape-leaf {
      .contentContainer {
        right: 59%;
        .content-wrap {
          margin-top: 3vw;
        }
      }
    }
    &.shape-slope {
      .contentContainer {
        .content-wrap {
          margin-top: 9vw;
          max-height: 48vw;
        }
        .left-bar-svg {
          height: 54vw;
        }
      }
    }
    &.shape-t_letter_v2 {
      .contentContainer {
        .left-bar-svg {
          height: 54vw;
        }
        .content-title-wrap {
          transform: rotate(-90deg) translateX(46%);
        }
        .content-wrap {
          margin-top: 12vw;
          max-height: 45vw;
          width: 37vw;
        }
      }
    }
    &.shape-t_letter_v2_reverse {
      .contentContainer {
        right: 50%;
        .content-wrap {
          width: 40vw;
          margin-top: 19vw;
        }
        .content-title-wrap {
          transform: rotate(-90deg) translateX(50%);
        }
      }
    }
    .people-and-culture & {
      .left-bar-svg {
        height: 51vw;
      }
      .content-title-wrap {
        transform: rotate(-90deg) translateX(65%);
      }
      &.shape-k_letter_open {
        .content-wrap {
          width: 30vw;
        }
      }
    }
    &.shape-t_letter_upside_reverse {
      .contentContainer {
        right: 52%;
        .content-wrap {
          margin-top: 3vw;
          width: 37vw;
          max-height: 44vw;
        }
      }
    }
    &.get-in-touch-cf {
      height: initial;
      flex-flow: row-reverse;
      .form-wrap {
        position: relative;
        flex: 1.5;
        padding-bottom: 25px;
      }
      .row-shape {
        display: none;
      }
      .contentContainer {
        position: relative;
        right: initial;
        flex: 1;
        padding: 0 35px;
        background-color: #811c34;
      }
      .content-wrap {
        margin-top: 45px;
        width: 100%;
        height: 360px;
      }
      .left-bar-svg {
        height: 370px;
      }
      .website-gmap {
        position: absolute;
        bottom: 15px;
        left: 15px;
        width: calc(100% - 30px);
      }
    }
    &.shape-t_letter_inverse_reverse {
      .contentContainer {
        right: 63%;
        .content-wrap {
          margin-top: 3vw;
        }
      }
    }
    &.media-members {
      .contentContainer {
        right: 62%;
        .content-wrap {
          margin-top: 20vw;
        }
      }
    }
    &.media-partners {
      .left-bar-svg {
        height: 50vw;
      }
      .contentContainer {
        .content-wrap {
          margin-top: 22vw;
        }
      }
    }
    &.company-facts {
      .contentContainer {
        right: 83%;
      }
    }
    @media (max-width: 1200px) {
      &.media-resources {
        height: 83vw;
      }
    }
    @media (max-width: 1024px) {
      &.media-partners {
        height: 70vw;
        .media-logo-cont {
          height: 100%;
          padding: 15px;
          align-items: center;
          .media-logo {
            max-width: 350px;
          }
        }
      }
    }
  }
  @media (max-width: 1050px) and (min-width: 769px) {
    &.shape-leaf {
      .contentContainer {
        left: 3%;
        .content-wrap {
          width: 35vw;
          height: 35vw;
        }
      }
    }
  }
  @media (max-width: 768px) {
    height: initial;
    &#resources {
      background-color: #e6e6e6;
      margin-top: -2px;
      .row-shape {
        top: -5px;
      }
    }
    &.welcome-row {
      height: 100vh;
    }
    &.shape-t_letter,
    &.shape-t_letter_v2,
    &.shape-mob_slope,
    &.shape-slope,
    &.shape-k_letter_open,
    &.shape-rectangular:not(.timeline) {
      padding-top: 120.7vw;
    }
    &.shape-t_letter_v2_reverse,
    &.shape-t_letter_upside {
      padding-top: 193.7vw;
    }
    &.media-events {
      padding-top: 113.7vw;
      @media (max-width: 480px) {
        padding-top: 120.7vw;
      }
    }
    &#social-responsibility {
      padding-top: 120vw;
      @media (max-width: 600px) {
        padding-top: 150vw;
      }
      @media (max-width: 480px) {
        padding-top: 750px;
      }
    }
    &.brands-row {
      padding-top: 194vw;
      .content-wrap {
        margin-top: 0 !important;
      }
    }
    &:not(.recent-news) .leftbar-pagerow {
      display: none;
    }
    .contentContainer {
      right: initial;
      left: initial;
      bottom: initial;
      top: initial;
      pointer-events: none;
      padding: 0;
      position: relative;
      padding: 25px 15px 35px;
      .content-wrap {
        margin: 0;
        position: absolute;
        position: relative;
        top: calc(50% - 10px);
        bottom: 0;
        left: 0;
        right: 70px;
        width: initial;
        height: initial;
        max-height: initial;
      }
    }

    &.website-row.shape-t_letter_inverse_reverse {
      display: flex;
      flex-flow: column-reverse;
    }
    &.shape-k_letter_brands .contentContainer {
      top: 0;
      left: 0;
      right: 0;
      bottom: initial;
      flex-flow: row-reverse;
      justify-content: space-between;
      padding: 150px 0 75px 25px;
      /* background-image: url("data:image/svg+xml,%3Csvg opacity='0.8' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 850 450'%3E%3Cpath d='M850 370V0H0v370l22 7c108 25 237 48 402 73a5306 5306 0 00426-80z' fill='%23000'/%3E%3C/svg%3E"); */
      /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 937'%3E%3Cpath d='M2227.09 545.65c-3.92-74.45-58.77-152.81-199.84-207.67C1729.46 216.51 1372.89 114.63 918.36 1c-450.62 113.63-807.19 215.51-1105 337-141.06 54.86-192 133.22-195.92 207.67V1776h2609.65z' fill='%23000' /%3E%3C/svg%3E"); */
      /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 374.33 415.01' opacity='0.88'%3E%3Cpath d='M374.33 139.72C319.66 93.7 257.93 48.83 187.43 0 116.33 49.25 54.64 94.46 0 140.9V415h374.33z' /%3E%3C/svg%3E"); */
      /* background-size: cover; */
      /* background-position: top; */
      /* background-repeat: no-repeat; */
      position: relative;
      /* margin-top: -120px; */
      .brand-logos-wrap {
        position: relative;
        top: initial;
        right: 49px;
      }
      .leftbar-pagerow {
        top: 70px;
      }
      .content-wrap {
        position: relative;
        top: initial;
        left: initial;
        right: initial;
        bottom: initial;
        max-width: 260px;
        margin-top: 0;
      }
    }
    &.shape-k_letter_open .contentContainer {
      .content-wrap {
        top: calc(59% - 10px);
      }
    }
    .website-row.shape-leaf & .contentContainer {
      .content-wrap {
        top: 68%;
      }
    }
    &.website-row.shape-t_letter_v2_reverse .contentContainer {
      right: initial;
      .content-wrap {
        width: 100%;
        top: 24%;
      }
    }
    &#quality-commitment .contentContainer {
      .content-wrap {
        height: initial;
        margin: 0;
      }
    }
    &.website-row.welcome-row .contentContainer {
      position: absolute;
      top: 26px;
      bottom: 0;
      left: 52%;
      .content-wrap {
        white-space: nowrap;
        top: 0;
      }
    }
    &.website-row.shape-t_letter_inverse_reverse .contentContainer {
      .content-wrap {
        height: 28%;
        top: 0;
        margin-top: 16px;
        right: 120px;
      }
    }
    &.website-row.get-in-touch-join-us .contentContainer {
      z-index: 1;
    }
    &.shape-leaf,
    &.shape-t_letter_upside_reverse {
      .contentContainer {
        top: 0;
        padding: 15px;
        right: 0;
        /* background-color: rgb(179, 179, 179); */
        .content-wrap {
          width: 100%;
          br {
            display: none;
          }
        }
      }
    }
    &.shape-leaf {
      margin-top: -2px;
      .contenContainer {
        margin-top: -2px;
      }
    }
    &.timeline {
      background-color: #0a0a0a;
      .contentContainer {
        display: none;
      }
    }
    &.get-in-touch-join-us .contentContainer,
    &.media-events .contentContainer {
      display: none;
    }
    &#resources,
    &#membership,
    &#media-partners {
      display: flex;
      flex-flow: column-reverse;
      .contentContainer {
        right: 0;
      }
    }
    &.last-row .contentContainer {
      padding-bottom: 80px;
    }
    &#media-partners {
      .contentContainer {
        padding-bottom: 135px;
        @media (max-width: 480px) {
          padding-bottom: 55px;
        }
      }
    }
  }
  @media (max-width: 600px) {
    &.website-row .contentContainer {
      .content-wrap {
        right: 45px;
      }
      .leftbar-pagerow {
        right: 0;
      }
    }
    &.website-row.shape-k_letter_brands .contentContainer {
      top: 0;
      .leftbar-pagerow {
        right: 25px;
      }
      .content-wrap {
        right: initial;
      }
    }
    &.website-row.shape-slope_brands .contentContainer {
      top: 0;
      .leftbar-pagerow {
        right: 25px;
      }
      .content-wrap {
        right: initial;
      }
    }
    &.website-row.shape-slope_brands .contentContainer {
      top: initial;
      padding-left: 30px;
      padding-top: 30px;
      .leftbar-pagerow {
        right: 25px;
        height: calc(100vh - 60px);
        .left-bar-svg {
          height: calc(100vh - 95px);
          max-height: initial;
        }
      }
      .content-wrap {
        br {
          display: none;
        }
      }
    }
  }
  @media (max-width: 550px) {
    .contentContainer .leftbar-pagerow {
      display: none;
    }
    &.website-row.shape-t_letter_v2_reverse .contentContainer {
      .content-wrap {
        width: initial;
        top: 0;
        bottom: 63%;
      }
    }
    &.website-row.shape-k_letter_open .contentContainer .content-wrap,
    &.website-row.shape-t_letter .contentContainer .content-wrap {
      left: initial;
      top: initial;
      right: initial;
      bottom: initial;
      width: auto;
    }
    &.website-row.welcome-row .contentContainer {
      left: calc(91px + (100vw - 320px) * 0.7);
    }
    &.website-row.shape-t_letter_inverse_reverse .contentContainer .content-wrap {
      right: 15px;
    }
    &.website-row.shape-slope_brands .contentContainer {
      padding-left: 15px;
      padding-top: 15px;
    }
  }
`;

export const mobContentWrap = (props) => css`
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .row-shape {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  #welcome & {
    position: absolute;
  }
  .website-row.shape-k_letter_brands & {
    position: absolute;
    margin: initial;
    bottom: initial;
    .contentContainer {
      padding: 25px 25px 85px;
      .brand-logos-wrap {
        right: 20px;
      }
    }
    @media (max-width: 550px) {
      .contentContainer {
        flex-flow: column-reverse;
        .brand-logos-wrap {
          align-self: flex-start;
          right: initial;
          width: 180px;
          left: 22px;
          .brand-logo .gatsby-image-wrapper {
            max-height: 53px;
          }
          .brands-pointer {
            right: initial;
            left: -22px;
            @keyframes pointer-anim {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(100%);
              }
            }
            animation-name: pointer-anim;
            animation-iteration-count: infinite;
          }
        }
        .content-wrap {
          max-width: initial;
          margin-bottom: 25px;
          h1,
          h2,
          h3,
          h4 {
            font-size: 24px;
            margin-bottom: 10px;
          }
          p {
            margin-top: 10px;
          }
        }
        .row-content br {
          display: none;
        }
      }
    }
    @media (max-width: 768px) and (min-width: 551px) {
      .contentContainer {
        padding: 65px 25px 185px;
      }
    }
  }
  .shape-slope_brands & {
    position: absolute;
    top: initial;
    .contentContainer {
      position: relative;
      padding-bottom: 80px;
      right: -1px;
      bottom: -1px;
      top: initial;
      left: initial;
      flex-flow: column;
      padding-left: 50px;
      padding-top: 50px;
      background-image: url("data:image/svg+xml,%3Csvg opacity='0.8' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 450 550' preserveAspectRatio='none'%3E%3Cpath d='M450 550H0V128C0 57 54 0 121 0h329z' fill='%23fff'/%3E%3C/svg%3E");
    }
    .brand-logos-wrap {
      position: relative;
      top: initial;
      right: 20px;
      margin-bottom: 25px;
    }
    .leftbar-pagerow {
      bottom: 0;
      top: initial;
      height: calc(100vh - 82px);
    }
    .content-wrap {
      position: relative;
      margin-top: 0;
      margin-right: 70px;
    }
  }
  .shape-t_letter & {
    margin-top: -100px;
    .contentContainer {
      padding-top: 61px;
    }
  }
  .shape-t_letter_inverse_reverse & {
    margin: 0;
    .contentContainer {
      right: 0;
      padding: 20px 20px 145px;
      @media (max-width: 480px) {
        padding-bottom: 65px;
      }
    }
  }
  .shape-leaf & {
    display: flex;
    flex-flow: column;
    .row-shape {
      height: auto;
      position: relative;
    }
    .contentContainer {
      background: ${props.shapeColor};
    }
  }
  .shape-t_letter_v2 & {
    margin-top: -200px;
    .contentContainer {
      padding: 170px 25px 25px;
    }
  }
  #main-capabilities & {
    .contentContainer {
      padding: 55px 45px 25px;
    }
  }
  .shape-t_letter_upside & {
    position: absolute;
    top: initial;
    .row-shape {
      position: absolute;
    }
    .contentContainer {
      padding-right: 15px;
      padding-bottom: 35px;
      padding-top: calc(130px + (100vw - 320px) * 0.3255);
      padding-left: calc(65px + (100vw - 320px) * 0.186);
    }
    @media (max-width: 480px) {
      .row-shape {
        transform: scaleX(1.3);
        transform-origin: right;
      }
      .contentContainer {
        padding-left: 15px;
      }
    }
  }
  .shape-t_letter_upside.last-row & {
    .contentContainer {
      padding-bottom: 73px;
    }
  }
  .shape-mob_slope & {
    margin-top: -100px;
    .row-shape {
      height: 90px;
    }
    .row-content h2 {
      padding-right: 60px;
    }
  }
  .shape-slope & {
    margin-top: -100px;
    @media (max-width: 480px) {
      .contentContainer {
        padding-top: 85px;
        padding-left: 32px;
      }
    }
  }
  .shape-t_letter_v2_reverse & {
    position: absolute;
    bottom: initial;
    .row-shape {
      top: initial;
      height: auto;
    }
    .contentContainer {
      padding-bottom: calc(140px + (100vw - 320px) * 0.4464);
      padding-right: calc(15px + (100vw - 320px) * 0.0893);
    }
  }
  .shape-k_letter_open & {
    margin-top: -70px;
    .contentContainer {
      padding-top: 75px;
    }
  }
  .get-in-touch-cf & {
    .contentContainer {
      bottom: initial;
      top: 0 !important;
      left: 0;
      right: 0;
      position: relative;
      flex-flow: column;
      padding: 0;
      .leftbar-pagerow {
        display: none;
      }
      .content-wrap {
        position: relative;
        margin-top: 0;
        padding: 25px 15px;
        background: linear-gradient(135deg, #b8002c 15%, #73001f 85%);
      }
      .website-gmap {
        border-radius: 0;
        margin-top: 0;
        height: 400px;
        max-height: 40vh;
        width: auto;
        pointer-events: all;
      }
    }
  }
  .get-in-touch-join-us & {
    position: absolute;
    bottom: 0;
    top: 121vw;
    display: flex;
    flex-flow: column;
    .row-shape {
      position: relative;
    }
  }
  .media-events & {
    position: absolute;
    top: 121vw;
  }
  .media-members & {
    .row-content {
      color: #3a383c;
    }
  }
`;
