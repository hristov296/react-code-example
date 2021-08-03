import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  right: 7.5%;
  display: flex;
  transform: translate(0, 0);
  transition: transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1),
    opacity 0.31s ease-in 0.1s;
  .website-row.state-expanded & {
    transform: translate(calc(-580px + (100vw - 1366px) * 0.4), 0);
    transition-duration: 0.6s;
    transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
  }
  .website-row.state-expanded.shape-rectangular & {
    transform: translate(calc(-530px + (100vw - 1366px) * 0.4), 0);
  }
  .website-row.state-expanded.shape-t_letter_upside & {
    transform: translate(calc(-560px + (100vw - 1366px) * 0.3), 0);
  }
  .website-row.state-expanded.single-brand & {
    transform: translate3d(-830px, 0, 0);
  }
  .website-row.state-expanded.shape-leaf &,
  .website-row.state-expanded.shape-t_letter_upside_reverse &,
  .website-row.state-expanded.shape-t_letter_v2_reverse &,
  .website-row.state-expanded.shape-rectangular_reverse &,
  .website-row.state-expanded.company-facts &,
  .website-row.state-expanded.shape-t_letter_inverse_reverse &,
  .website-row.state-expanded.shape-k_letter_open_inverse & {
    transform: none;
  }
  .website-row.state-expanded.shape-rectangular_smaller &,
  .website-row.state-expanded.shape-t_letter & {
    transform: translate(calc(-645px + (100vw - 1366px) * 0.316), 0);
  }
  .website-row.state-expanded.welcome-row &,
  .website-row.state-expanded.brands-row & {
    transform: translate(calc(-695px + (100vw - 1270px) * 0.262), 0);
  }

  .website-row.state-expanded.get-in-touch-join-us & {
    transform: translate(calc(-770px + (100vw - 1366px) * 0.2166), 0);
  }
  .website-row.state-expanded.single-brand.single-prod-range & {
    transform: translate(calc(-720px + (100vw - 1366px) * 0.217), 0);
  }
  .shape-t_letter_inverse_reverse & {
    right: 63%;
  }
  .shape-leaf &,
  .shape-k_letter_open_inverse & {
    right: 59%;
  }
  .shape-t_letter_upside_reverse &,
  .shape-t_letter_v2_reverse &,
  .shape-rectangular_reverse & {
    right: 54%;
  }
  .timeline & {
    right: 41%;
    @media (max-width: 1200px) {
      right: initial;
      left: 45%;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }
  .get-in-touch-join-us & {
    right: 22.5%;
  }
  .open-position ~ & {
    transform: translateX(calc(-828px + (100vw - 1366px) * -0.69)) !important;
  }
  .company-facts & {
    right: 79%;
    @media (max-width: 1024px) {
      display: none;
    }
  }
  .media-events & {
    right: 31%;
    @media (max-width: 1200px) {
      right: 41%;
    }
  }
  .single-brand & {
    right: 2.5%;
  }
  @media (max-width: 1365px) {
    .website-row.shape-rectangular_smaller:not(.media-events, .media-partners) & {
      right: 1.5%;
      .content-wrap {
        width: 32vw;
      }
    }
    .website-row.get-in-touch-join-us & {
      right: 330px;
    }
    .open-position & {
      transform: none !important;
    }
  }
  @media (max-width: 1200px) {
    .single-brand & {
      .brand-logos-wrap {
        width: 120px;
      }
      .content-wrap {
        width: 270px;
      }
    }
  }
  /* @media (max-width: 1050px) {
    .shape-leaf &,
    .shape-t_letter_upside_reverse & {
      right: 0;
      left: 0;
      bottom: 0;
      top: 70px;
      padding: 0 15px;
      .content-wrap {
        position: relative;
        width: 37vw;
        margin-top: 15px;
      }
      .leftbar-pagerow {
        position: absolute;
        margin: 0;
        right: 40px;
        top: 0;
        .left-bar-svg {
          height: calc(100vh - 120px);
          max-height: initial;
        }
        .content-title-wrap {
          transform: rotate(-90deg) translateY(-100%);
          top: 5px;
          transform-origin: top right;
          bottom: initial;
          .contentTitle {
            font-size: 35px;
          }
        }
      }
    }
    .website-row.shape-t_letter_v2_reverse & {
      right: 54%;
      .content-wrap {
        width: 34vw;
      }
    }
  } */
`;

export const ContentWrap = styled.div`
  width: 30vw;
  height: 70vh;
  margin-top: 12vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  pointer-events: all;
  .single-brand & {
    width: 18.23vw;
  }
  .single-brand.single-prod-range & {
    width: 26vw;
  }
  .shape-rectangular & {
    width: 33vw;
  }
  .shape-t_letter_upside_reverse &,
  .shape-t_letter_v2_reverse & {
    width: 28vw;
  }
  .shape-rectangular_smaller &,
  .shape-t_letter & {
    width: 24vw;
  }
  .shape-t_letter &,
  .welcome-row & {
    height: 36vh;
    margin-top: 29vh;
  }
  .shape-leaf & {
    width: 24vw;
    max-height: 49vh;
    margin-top: 70px;
    display: flex;
    flex-flow: column;
  }
  .shape-t_letter &,
  .shape-t_letter_v2_reverse &,
  .shape-t_letter_inverse_reverse & {
    .scrollbar-container {
      max-height: 55vh;
    }
  }
  .shape-t_letter_v2_reverse & {
    margin-top: 32vh;
    height: 50vh;
    .ScrollbarsCustom-Content {
      align-items: flex-start;
    }
  }
  .shape-t_letter_inverse_reverse & {
    width: 21vw;
  }
  .welcome-row &,
  .brands-row &,
  .shape-k_letter_open_inverse & {
    width: 22vw;
  }
  .media-partners &,
  .media-members &,
  .media-resources & {
    margin-top: 15vh;
    height: 60vh;
  }
  .scrollbar-container {
    max-height: 72vh;
    padding-right: 17px;
    #social-responsibility & {
      max-height: 67vh;
    }
  }
  p:last-child {
    margin-bottom: 0;
  }
  &.brand-content {
    margin-top: 26vh;
    position: relative;
    height: initial;
    justify-content: flex-start;
    .ScrollbarsCustom-Content {
      align-items: flex-start;
    }
    .brands-row & {
      margin-top: 37vh;
    }
  }
  .quality-commitment & {
    margin-top: 11vh;
    height: 85vh;
    p {
      /* display: flex; */
    }
    img {
      width: 63px;
      height: 63px;
      float: left;
      margin-right: 10px;
    }
    .certificate {
      display: grid;
      grid-template-columns: 70px 1fr;
      grid-gap: 4px 15px;
      margin-bottom: 10px;
      img {
        grid-row: span 2;
        width: 70px;
        height: auto;
      }
      p {
        margin: 0;
        font-weight: 600;
        &:first-of-type {
          align-self: flex-end;
        }
      }
    }
  }
  .get-in-touch-cf & {
    margin-top: 10vh;
    height: 80vh;
  }
`;

export const Content = styled.div`
  color: ${(props) => props.contentColor};
  line-height: 1.35;
  font-size: 15px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-transform: uppercase;
    font-family: var(--sec-font);
    font-size: 30px;
    margin: 0 0 15px;
    /* &:not(:first-child) {
      margin-top: 25px;
    } */
  }
  a {
    text-decoration: underline;
  }
`;

export const BrandLogo = styled.div`
  cursor: pointer;
  margin-bottom: 35px;
  .single-brand & {
    margin-bottom: 20px;
  }
  img {
    object-fit: contain !important;
    object-position: center right !important;
    @media (max-width: 550px) {
      object-position: center left !important;
    }
  }
`;

export const BrandLogosWrap = styled.div`
  pointer-events: all;
  width: 15vw;
  align-self: flex-end;
  margin-bottom: 100px;
  margin-right: calc(0px + (100vw - 1366px) * 0.027);
  position: relative;
  .single-brand & {
    width: 9vw;
    text-align: right;
    margin-bottom: 120px;
  }
  @media (max-width: 1365px) and (min-width: 769px) {
    margin-right: 0;
    align-self: center;
    margin-bottom: 0;
  }
  @media (max-width: 768px) {
    z-index: 2;
    margin: 0;
    position: absolute;
    right: 49px;
    top: 27%;
    width: 170px;
    .brand-logo {
      margin-bottom: 10px;
      .gatsby-image-wrapper {
        max-height: 60px;
      }
    }
  }
  @media (min-width: 1921px) {
    margin-right: 15px;
    .brands-pointer {
      right: -39px;
      width: 14px;
    }
    .single-brand & {
      margin-bottom: 150px;
      margin-right: 12px;
    }
  }
`;

export const brandImgCss = css`
  max-height: calc(64px + (100vw - 1366px) * 0.036);
`;

export const brandsPointer = css`
  position: absolute;
  right: calc(-22px + (100vw - 1366px) * -0.027);
  top: 0;
  width: calc(10px + (100vw - 1366px) * 0.00722);
  height: 30px;
  fill: #808080;
  @media (max-width: 1365px) {
    right: -19px;
    width: 10px;
  }
`;

export const brandTitle = css`
  text-transform: uppercase;
  font-family: var(--sec-font);
  font-weight: bold;
  font-size: 18px;
  transition: color 0.3s;
  margin: 0;
  height: 20px;
`;

export const currTitle = css`
  text-transform: uppercase;
  font-family: var(--sec-font);
  font-weight: bold;
  font-size: 30px;
  margin: 15px 0;
`;

export const intLinks = (props) => css`
  position: absolute;
  top: calc(100% + 15px);
  left: calc(-52px - (100vw - 1366px) * 0.045);
  color: ${props.color};
  display: flex;
  flex-flow: column;
  font-weight: 600;
  a {
    transition: color 0.3s;
    margin-bottom: 7px;
    font-family: var(--sec-font);
    text-transform: uppercase;
    &:hover {
      color: #ba0027;
    }
  }
`;
