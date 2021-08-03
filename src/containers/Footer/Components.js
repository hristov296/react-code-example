import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const FooterWrap = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 0 10px #000000;
  transition: transform 0.5s;
  transform: translateY(200px);
  z-index: 8;
  &.visible {
    transform: translateY(0);
  }
  @media (max-width: 1365px) {
    position: relative;
    transform: none;
  }
`;

export const FooterContainer = styled.div`
  background-color: #3a383c;
  height: calc(53px + (100vw - 1366px) * 0.04);
  display: flex;
  align-items: center;
  padding: 0 2%;
  @media (min-width: 1366px) {
    justify-content: center;
    padding-right: 380px;
  }
  @media (max-width: 1365px) {
    padding: 0;
    height: initial;
    p {
      margin: 7px 0;
    }
    .mobile-foot-container {
      width: calc(100vw - 390px);
      text-align: center;
      a {
        display: inline-block;
      }
    }
  }
  @media (max-width: 1200px) {
    .mobile-foot-container {
      width: calc(100vw - 370px);
    }
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
    height: initial;
    .mobile-foot-container {
      width: 100%;
    }
  }
  @media (max-width: 700px) {
    flex-flow: column;
  }
`;

export const footerText = css`
  color: #a7a7a7;
  font-size: 16px;
  padding: 0 15px;
  text-align: center;
  margin: 4px auto;
  a {
    color: #fff;
    margin: 0 15px;
  }
  @media (max-width: 1200px) {
    font-size: 15px;
  }
`;

export const footerText2 = css`
  a {
    margin: 0;
  }
`;

export const FooterRightWrap = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  @media (max-width: 768px) {
    position: absolute;
    bottom: 100%;
    svg {
      filter: none;
      height: 62px;
    }
  }
`;

export const footRightSvg = css`
  height: 100%;
  width: calc(390px + (100vw - 1366px) * 0.18);
  filter: drop-shadow(9px 3px 10px #000);
  @media (max-width: 1365px) {
    width: 390px;
  }
`;

export const FooterRightMenu = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: calc(87px + (100vw - 1366px) * 0.061);
  @media (max-width: 1366px) {
    padding-left: 87px;
  }
`;

export const socLink = css`
  display: flex;
`;

export const socLinkIcon = css`
  fill: #fff;
  width: calc(34px + (100vw - 1366px) * 0.011);
  height: 40px;
  @media (max-width: 1366px) {
    width: 34px;
  }
`;

export const socLinkWrap = css`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 calc(10px + (100vw - 1366px) * 0.011);
  justify-content: space-around;
`;

export const rightMenuText = css`
  color: #fff;
  text-transform: uppercase;
  font-family: var(--sec-font);
  font-weight: 600;
  font-size: 30px;
  letter-spacing: 1.2px;
  white-space: nowrap;
`;
