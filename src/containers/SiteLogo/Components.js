import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const logoItem = css`
  position: absolute !important;
  top: 0;
  left: 0;
`;

export const additionalSpan = css`
  white-space: nowrap;
  position: absolute;
  bottom: -1px;
  right: -5px;
  transition: transform 0.3s ease-in-out, opacity 0.3s;
  transform: translateX(-100%);
  opacity: 0;
  /* font-family: "Roboto"; */
  font-size: 15px;
  line-height: 1;
`;

export const logoWrap = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 143px;
  height: 60px;
  &:hover span {
    transform: translateX(10%);
    opacity: 1;
  }
`;

export const WebsiteLogo = styled.div`
  position: absolute;
  top: 2.4vw;
  left: 2.4vw;
`;
