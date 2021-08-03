import React, {
  useRef,
  createRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import kute from "kute.js";
import "kute.js/kute-svg";
import { gsap } from "gsap";
import { Link, useStaticQuery, graphql } from "gatsby";

import { composedPath } from "../../utils/composedPath";

import { RowContext } from "../../context/row-context";
import { PageContext } from "../../context/page-context";

import {
  MenuWrap,
  MenuClickArea,
  MenuItemWrap,
  MenuItem,
  MenuList,
  SubMenuWrap,
  SubMenuList,
  SubMenuItem,
  MenuSvgWrap,
  MenuHoverBar,
  HoverBar,
} from "./Components";

export default ({
  menuHoverColor = "#000",
  menuColor = "#000",
  menuContentColor = "#000",
}) => {
  const data = useStaticQuery(graphql`
    query MenuQuery {
      strapiMenu(Name: { eq: "Main menu" }) {
        Structure {
          items {
            name
            link
            items {
              name
              link
            }
          }
        }
      }
    }
  `);

  const { rowState, setRowState } = useContext(RowContext);
  const { currentRow, onSubMenuClick } = useContext(PageContext);

  const isInitialMount = useRef(true);
  const longBarTween = useRef(null);
  const hoverBar = useRef(null);
  const currentActive = useRef(null);

  const refs = useRef([...Array(4)].map(() => createRef()));
  const longBar = useRef(null);

  const handleBodyClick = useCallback(
    (ev) => {
      const currentPath =
        ev.path ||
        (ev.composedPath && ev.composedPath()) ||
        composedPath(ev.target);

      if (
        !currentPath.filter(
          (el) => el.classList && el.classList.contains("menu-wrap")
        ).length
      ) {
        setRowState("normal");
        document.body.removeEventListener("click", handleBodyClick);
      }
    },
    [setRowState]
  );

  const onMenuClick = () => {
    if (rowState !== "expanded") {
      setRowState("expanded");
    } else {
      setRowState("normal");
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      currentActive.current = document.querySelector(
        ".main-menu .menu-item > a.active"
      );
      setTimeout(() => {
        if (!longBarTween.current && longBar.current) {
          longBarTween.current = kute.fromTo(
            longBar.current,
            { draw: "0% 0%" },
            { draw: "0% 100%" },
            { duration: 600, easing: "easingCubicInOut" }
          );
        }
      }, 150);
    } else {
      if (rowState === "expanded") {
        const currentTarget =
          currentActive.current === null
            ? { offsetLeft: 0, offsetWidth: 0 }
            : currentActive.current.closest("li");

        gsap
          .timeline()
          .to(
            refs.current[1].current,
            {
              x: -15,
            },
            0
          )
          .to(
            refs.current[2].current,
            {
              x: -8,
            },
            0
          );
        longBarTween.current.start();
        gsap.to(hoverBar.current, {
          x: currentTarget.offsetLeft,
          width: currentTarget.offsetWidth,
          delay: 0.3,
          duration: 0.2,
          ease: "power3.out",
        });
        document.body.addEventListener("click", handleBodyClick);
      } else if (rowState === "normal") {
        longBarTween.current.stop();
        gsap.to(hoverBar.current, {
          x: 0,
          width: 0,
          duration: 0.05,
        });
        gsap
          .timeline()
          .to(
            refs.current[1].current,
            {
              x: 0,
            },
            0
          )
          .to(
            refs.current[2].current,
            {
              x: 0,
            },
            0
          );
        kute
          .to(
            longBar.current,
            { draw: "0% 0%" },
            { duration: 400, easing: "easingQuadraticOut" }
          )
          .start();
        document.body.removeEventListener("click", handleBodyClick);
      }
    }
  }, [rowState, longBar, handleBodyClick]);

  const onMouseOverMenuItem = (ev) => {
    gsap.to(hoverBar.current, {
      x: ev.target.closest("li").offsetLeft,
      width: ev.target.closest("li").offsetWidth,
      duration: 0.2,
      ease: "power3.out",
    });
  };

  const onMouseLeaveMenuItem = () => {
    const currentTarget =
      currentActive.current === null
        ? { offsetLeft: 0, offsetWidth: 0 }
        : currentActive.current.closest("li");

    gsap.to(hoverBar.current, {
      x: currentTarget.offsetLeft,
      width: currentTarget.offsetWidth,
      duration: 0.2,
      ease: "power3.out",
    });
  };

  const isActive = ({ isPartiallyCurrent, location, href }, id) => {
    if (
      id === 0 &&
      currentRow === 0 &&
      href.indexOf(location.pathname) > -1 &&
      location.pathname !== "/"
    ) {
      return { className: "active" };
    }

    return isPartiallyCurrent ||
      (location.hash !== "" && href.indexOf(location.hash) > -1)
      ? { className: "active" }
      : {};
  };

  const handleSubMenuClick = useCallback(
    (e) => {
      if (e.target.classList.contains("active")) {
        return;
      }
      if (
        e.target.href.includes(window.location.pathname) &&
        window.location.pathname !== "/"
      ) {
        e.preventDefault();
        onSubMenuClick(e.target.hash);
      }
    },
    [onSubMenuClick]
  );

  const handleMainMenuClick = useCallback((e) => {
    if (e.target.classList.contains("active")) {
      e.preventDefault();
      return;
    }
  }, []);

  return (
    <MenuWrap className="menu-wrap">
      <MenuSvgWrap>
        <svg
          style={{ width: "100%" }}
          height="42"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 892 29"
          preserveAspectRatio="xMaxYMid slice"
        >
          <path
            ref={longBar}
            d="M882 9h-41 0c-23 0-18 17-35 19H0"
            fill="none"
            stroke={menuColor}
            style={{ strokeDasharray: "0,1200px" }}
          />
          <path ref={refs.current[1]} d="M863 0h29v2h-29z" fill={menuColor} />
          <path ref={refs.current[2]} d="M863 8h29v2h-29z" fill={menuColor} />
          <path ref={refs.current[3]} d="M863 16h29v2h-29z" fill={menuColor} />
        </svg>
        <MenuClickArea onClick={onMenuClick} />
      </MenuSvgWrap>
      <MenuList
        className={rowState + " main-menu"}
        onMouseLeave={onMouseLeaveMenuItem}
      >
        <MenuHoverBar>
          <HoverBar
            ref={hoverBar}
            className="hover-bar"
            colorMenuHover={menuHoverColor}
          />
        </MenuHoverBar>
        {data.strapiMenu.Structure.items.map((item, id) => (
          <MenuItemWrap
            key={`toplevel${id}`}
            colorCode={menuContentColor}
            colorMenuHover={menuHoverColor}
            onMouseEnter={(e) => onMouseOverMenuItem(e)}
          >
            <MenuItem className="menu-item">
              <Link
                onClick={handleMainMenuClick}
                getProps={isActive}
                to={item.link}
              >
                {item.name}
              </Link>
            </MenuItem>
            {item.hasOwnProperty("items") ? (
              <SubMenuWrap className="sub-menu-wrap">
                <SubMenuList className="sub-menu">
                  {item.items.map((subItem, id) => (
                    <SubMenuItem
                      key={"subItem" + id}
                      coloruSubItemHover={menuHoverColor}
                    >
                      <Link
                        getProps={(e) => isActive(e, id)}
                        to={
                          subItem.link.indexOf("/") === 0
                            ? subItem.link
                            : item.link + subItem.link
                        }
                        onClick={handleSubMenuClick}
                      >
                        {subItem.name}
                      </Link>
                    </SubMenuItem>
                  ))}
                </SubMenuList>
              </SubMenuWrap>
            ) : (
              ""
            )}
          </MenuItemWrap>
        ))}
      </MenuList>
    </MenuWrap>
  );
};
