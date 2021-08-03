import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const MobileHeader = styled.div`
  position: FIXED;
  /* background-color: ${(props) => props.cssBackground}; */
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  transition: transform 0.3s;
  transform: translateY(-100%);
  &.open-header {
    transform: translateY(0);
  }
  &.relative-header {
    height: 85px;
    position: relative;
    @media (max-width: 600px) {
      height: 75px;
    }
  }
  &.absolute-header {
    transform: none !important;
    position: absolute;
    top: 0;
    left: 0%;
    right: 0;
  }
  @media (max-width: 1365px) {
    height: 84px;
    background-color: #1c1c1c;
  }
  @media (max-width: 600px) {
    height: 78px;
  }
`;

export const MobileLogo = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 2;
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
  @media (max-width: 600px) {
    width: 130px;
  }
`;

export const logoItem = css`
  /* position: absolute !important; */
  /* top: 0; */
  /* left: 0; */
`;

export const MobileMenu = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  padding: 25px;
  z-index: 2;
  fill: #fff;
`;

export const MenuSheet = styled.div`
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  transform: translateY(-100%);
  padding: 88px 5px 35px 15px;
  visibility: hidden;
  opacity: 0;
  z-index: 1;
`;

export const MobMenuWrap = styled.div`
  height: 100%;
  overflow: auto;
  padding-right: 10px;
  /* height: calc(100vh - 103px); */
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

export const MainItem = styled.div`
  color: #3a383c;
  font-family: var(--sec-font);
  font-size: 21px;
  font-weight: 700;
  display: flex;
  flex-flow: column;
  &:last-of-type .sub-menu {
    margin-bottom: 0;
  }
  a.active {
    color: #ba0027;
  }
`;

export const SubMenuList = styled.div`
  padding: 10px;
  margin-bottom: 15px;
`;

export const SubMenuItem = styled.div`
  font-family: var(--main-font);
  font-size: 16px;
  a {
    display: block;
    padding: 3px;
    transition: color 0.3s;
    &:focus {
      color: #ba0027;
    }
  }
`;
