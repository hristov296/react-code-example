import React, {
  useRef,
  useState,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { gsap } from "gsap";
import classnames from "classnames";

import { PageContext } from "../../context/page-context";

// import { useSiteLogos } from "../../static-queries/site-logos";
// import { useSiteMenu } from "../../static-queries/site-menu";
import Transition from "../Transition";

import {
  MobileHeader,
  MobileLogo,
  logoWrap,
  logoItem,
  MobileMenu,
  MenuSheet,
  MobMenuWrap,
  MainItem,
  SubMenuList,
  SubMenuItem,
} from "./Components";

export default (props) => {
  const { cssPosition = "sticky", cssBackground } = props;
  const scrollToPlugin = useRef(0);
  const menuSheet = useRef();
  const [isToggled, setToggled] = useState(false);
  const data = useStaticQuery(graphql`query MobHeaderQuery {
  site_logo: file(fields: {optionId: {eq: "site_logo"}}) {
    childImageSharp {
      gatsbyImageData(width: 150, placeholder: NONE, layout: FIXED)
      fluid(maxWidth: 150) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
  }
  site_logo_white: file(fields: {optionId: {eq: "site_logo_white"}}) {
    childImageSharp {
      gatsbyImageData(width: 150, placeholder: NONE, layout: FIXED)
      fluid(maxWidth: 150) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
  }
  site_logo_dark: file(fields: {optionId: {eq: "site_logo_dark"}}) {
    childImageSharp {
      gatsbyImageData(width: 150, placeholder: NONE, layout: FIXED)
      fluid(maxWidth: 150) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
  }
  strapiMenu(Name: {eq: "Main menu"}) {
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

  const logos = {
    site_logo: data.site_logo,
    site_logo_white: data.site_logo_white,
    site_logo_dark: data.site_logo_dark,
  };

  const { mobHeaderState, setMobHeader } = useContext(PageContext);
  const menu = data.strapiMenu.Structure.items;

  const mobHeader = useRef();
  const menuTl = useRef();
  const touchPos = useRef();
  const scrollPos = useRef();

  useEffect(() => {
    const paths = [...mobHeader.current.querySelectorAll("#menu-trigger path")];
    const sheet = mobHeader.current.querySelector("#menu-sheet");

    menuTl.current = gsap
      .timeline({
        duration: 0.3,
        paused: true,
      })
      .to(
        paths[0],
        {
          rotation: 45,
          transformOrigin: "10% 0",
        },
        0
      )
      .to(
        paths[1],
        {
          autoAlpha: 0,
          duration: 0.2,
        },
        0
      )
      .to(
        paths[2],
        {
          rotation: -45,
          transformOrigin: "10% 100%",
        },
        0
      )
      .to(
        sheet,
        {
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
        },
        0
      );
    return () => document.body.classList.remove("mob-menu-open");
  }, []);

  const bodyTouchStart = (e) => {
    if (isToggled) {
      return;
    }
    touchPos.current = e.touches[0].clientY;
    scrollPos.current = window.pageYOffset;
    document.body.addEventListener("touchmove", bodyTouchMove, false);
    document.body.addEventListener("touchend", bodyTouchEnd, false);
  };
  const bodyTouchMove = (e) => {
    if (
      e.touches[0].clientY < touchPos.current &&
      window.pageYOffset > 80 &&
      scrollPos.current < window.pageYOffset
    ) {
      setMobHeader("hidden");
      // gsap.to(mobHeader.current, {
      //   yPercent: -100,
      //   duration: 0.3,
      // });
    } else if (
      (e.touches[0].clientY > touchPos.current &&
        scrollPos.current > window.pageYOffset) ||
      window.pageYOffset < 80
    ) {
      setMobHeader("visible");
      // gsap.to(mobHeader.current, { yPercent: 0, duration: 0.3 });
    }
  };
  const bodyTouchEnd = (e) => {
    document.body.removeEventListener("touchmove", bodyTouchMove, false);
    document.body.removeEventListener("touchend", bodyTouchEnd, false);
  };

  useEffect(() => {
    if (!mobHeader.current) {
      return;
    }
    document.body.addEventListener("touchstart", bodyTouchStart, false);
    return () =>
      document.body.removeEventListener("touchstart", bodyTouchStart, false);
  }, [mobHeader]);

  const updateMenuHeight = () => {
    if (menuSheet.current !== null) {
      menuSheet.current.style.height = window.innerHeight + "px";
    }
  };

  const toggleMenu = useCallback((isToggled) => {
    if (isToggled) {
      window.removeEventListener("resize", updateMenuHeight);
      document.body.classList.remove("mob-menu-open");
      window.scrollTo({ top: scrollToPlugin.current });
      menuTl.current.reverse();
      gsap.to("#menu-trigger", {
        fill: "#fff",
      });
      // menuSheet.current.style.height = "100vh";
    } else {
      updateMenuHeight();
      scrollToPlugin.current = window.pageYOffset;
      menuTl.current.play().then(() => {
        document.body.style.top = -1 * scrollToPlugin.current;
        document.body.classList.add("mob-menu-open");
      });
      gsap.to("#menu-trigger", {
        fill: "#1c1c1c",
      });
      window.addEventListener("resize", updateMenuHeight);
    }
    setToggled(!isToggled);
  }, []);

  const currLogo = () => {
    if (isToggled) {
      return "site_logo_dark";
    } else {
      return "site_logo";
    }
  };

  const isActive = ({ isPartiallyCurrent, location, href }, id) => {
    if (
      id === 0 &&
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

  const onClickSubmenu = (e, item, subItem) => {
    if (window.location.pathname.indexOf(item.link) > -1) {
      e.preventDefault();
      toggleMenu(isToggled);
      window.location.replace(subItem.link);
    }
  };

  return (
    <MobileHeader
      id="mob-header"
      ref={mobHeader}
      cssPosition={cssPosition}
      cssBackground={cssBackground}
      className={classnames({
        "relative-header": cssPosition === "relative",
        "absolute-header": cssPosition === "absolute",
        "open-header": mobHeaderState === "visible",
      })}
    >
      <MenuSheet ref={menuSheet} id="menu-sheet">
        <MobMenuWrap>
          {menu.map((item, i) => (
            <MainItem key={"topItem" + i}>
              <Link
                css={{ position: "relative" }}
                getProps={isActive}
                to={item.link}
              >
                {item.name}
              </Link>
              <svg
                css={{ width: "100%", height: "25px;", marginTop: "-15px" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 975.31 20.46"
                preserveAspectRatio="xMaxYMid slice"
              >
                <path
                  d="M975.31.5H934.37C911.26.53 916.8 17.62 899 20H0"
                  fill="none"
                  stroke="#c6c6c6"
                />
              </svg>
              {item.hasOwnProperty("items") ? (
                <SubMenuList className="sub-menu">
                  {item.items.map((subItem, id) => (
                    <SubMenuItem key={"subItem" + id}>
                      <Link
                        to={
                          subItem.link.indexOf("/") === 0
                            ? subItem.link
                            : item.link + subItem.link
                        }
                        getProps={isActive}
                        onClick={(e) => onClickSubmenu(e, item, subItem)}
                      >
                        {subItem.name}
                      </Link>
                    </SubMenuItem>
                  ))}
                </SubMenuList>
              ) : (
                  ""
                )}
            </MainItem>
          ))}
        </MobMenuWrap>
      </MenuSheet>
      <MobileLogo>
        <Link to="/">
          <Transition timeout={300} keyProp={isToggled}>
            <div css={logoWrap}>
              <GatsbyImage
                image={logos[currLogo()].childImageSharp.gatsbyImageData}
                css={logoItem}
                durationFadeIn={0}
                imgStyle={{ objectFit: "contain" }} />
            </div>
          </Transition>
        </Link>
      </MobileLogo>
      <MobileMenu onClick={() => toggleMenu(isToggled)}>
        <svg
          id="menu-trigger"
          css={{ overflow: "visible" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 23.2 14.4"
          height="25"
          preserveAspectRatio="xMaxYMid slice"
        >
          <path d="M0 0h23.2v1.6H0z" />
          <path d="M0 6.4h23.2V8H0z" />
          <path d="M0 12.8h23.2v1.6H0z" />
        </svg>
      </MobileMenu>
    </MobileHeader>
  );
};
