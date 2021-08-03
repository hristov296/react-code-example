import styled from "@emotion/styled";

export const MenuWrap = styled.div`
  position: absolute;
  top: 3vw;
  right: 3vw;
  z-index: 2;
`;

export const MenuClickArea = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 62px;
  height: 40px;
  cursor: pointer;
`;

export const MenuItemWrap = styled.li`
  color: ${(props) => props.colorCode};
  font-size: 16px;
  /* font-family: Roboto Condensed; */
  position: relative;
  margin: 6px 8px 0px;
  padding-bottom: 13px;
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
  > .menu-item > a.active,
  &:hover > .menu-item > a,
  &:focus > .menu-item > a {
    color: ${(props) => props.colorMenuHover};
  }
  &:hover,
  &:focus {
    > .sub-menu-wrap {
      visibility: visible;
      transition: visibility 0s linear 0s;
      > .sub-menu {
        transform: translateY(0);
        transition-delay: 0.15s;
      }
    }
  }
`;

export const MenuItem = styled.div`
  overflow: hidden;
  > a {
    display: block;
    padding: 6px 0;
    transform: translateY(40px);
    transition: visibility 0s, transform 0.3s, color 0.2s;
    transition-delay: 1s, 0s, 0s;
  }
`;

export const menuListTrans = () => {
  let styles = {};
  for (let $i = 0; $i < 10; $i++) {
    styles["&:nth-of-type(" + $i + ")"] = {
      "> .menu-item > a": {
        transform: "translateY(0)",
        visibility: "visible",
        transitionDelay: "0s," + $i * 0.05 + "s, 0s",
      },
    };
  }
  return styles;
};

export const MenuList = styled.ul`
  display: inline-flex;
  margin-right: 125px;
  position: relative;
  visibility: hidden;
  &.expanded {
    visibility: visible;
    & > li {
      ${menuListTrans}
    }
  }
`;

export const SubMenuWrap = styled.div`
  overflow: hidden;
  position: absolute;
  visibility: hidden;
  transition: visibility 0s linear 0.5s;
  top: 100%;
  left: 0;
`;

export const SubMenuList = styled.ul`
  display: flex;
  flex-flow: column;
  white-space: nowrap;
  padding-top: 5px;
  transition: transform 0.15s ease-out;
  transform: translateY(-100%);
`;

export const SubMenuItem = styled.li`
  > a {
    display: block;
    padding: 8px 1px;
    transition: color 0.2s, text-shadow 0.2s;
  }
  > a.active,
  &:hover > a,
  &:focus > a {
    color: ${(props) => props.coloruSubItemHover};
    text-shadow: 1px 0 0 ${(props) => props.coloruSubItemHover};
  }
`;

export const MenuSvgWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export const MenuHoverBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 10px;
  overflow: hidden;
`;

export const HoverBar = styled.div`
  width: 0px;
  transition: transform 0.1s;
  height: 3px;
  background-color: ${(props) => props.colorMenuHover};
`;
