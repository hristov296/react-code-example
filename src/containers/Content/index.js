import React, { useRef, useContext, useEffect, useCallback } from "react";
import { Link, navigate } from "gatsby";
import classnames from "classnames";
import { Remarkable } from "remarkable";
import { GatsbyImage } from "gatsby-plugin-image";
import { gsap } from "gsap";
import Media, { useMedia } from "react-media";
// import ScrollBar from "react-scrollbars-custom";
import ScrollBar from "../Scrollbar";

import Transition from "../Transition";

import { RowContext } from "../../context/row-context";

import {
  ContentContainer,
  ContentWrap,
  Content,
  BrandLogo,
  BrandLogosWrap,
  brandImgCss,
  brandsPointer,
  brandTitle,
  intLinks,
} from "./Components";
import LeftBar from "../LeftBar";

const md = new Remarkable({ html: true, breaks: true });

export default ({ data, template = "brands" }) => { // the content of a row
  const {
    contentTitle,
    contentColor = "#000",
    hoverColor = "#fff",
    barColor = contentColor,
    titleColor = contentColor,
    shapeColor = "#ba0027",
    pr_text,
    brands,
    currLogo,
    links,
  } = data;

  const curr_text =
    pr_text !== null &&
    pr_text.replace(/\/uploads\//g, process.env.API_URL + "/uploads/");

  const contentRef = useRef(null);
  const brandsRef = useRef(null);
  const brandsPointerRef = useRef(null);

  const {
    brandState,
    setBrandState,
    setLeftBarLinkTo,
    row_id,
    brandSlidePlay,
  } = useContext(RowContext);

  const mobileView = useMedia({
    query: "(max-width: 1365px)",
  });

  const gMapDesktop = row_id === "contact-us" && !mobileView;
  const gMapMobile = row_id === "contact-us" && mobileView;

  const templateElements = useCallback(
    (el, i) => ({
      brands: (
        <BrandLogo
          className="brand-logo"
          onMouseEnter={() => setBrandState(i)}
          key={i}
        >
          <Link to={"/brand/" + el.slug}>
            {el.logo ? (
              <GatsbyImage image={el.logo.localFile.childImageSharp.brandLogo} css={brandImgCss} />
            ) : (
              ""
            )}
          </Link>
        </BrandLogo>
      ),
      productRanges: (
        <BrandLogo onClick={() => setBrandState(i)} key={i}>
          <p
            className={classnames({ active: i === brandState })}
            css={[
              brandTitle,
              {
                color: contentColor,
                "&:hover,&.active": {
                  color: hoverColor,
                },
              },
            ]}
          >
            {el.title}
          </p>
        </BrandLogo>
      ),
    }),
    [brandState, setBrandState, contentColor, hoverColor]
  );

  useEffect(() => {
    if (!mobileView) {
      return;
    }

    if (!brandSlidePlay) return;

    const brandLogosInterval = setInterval(() => { // change the active brand on a set time
      setBrandState((brandState) =>
        brandState + 1 > brands.length - 1 ? 0 : brandState + 1
      );
    }, 5000);
    return () => clearInterval(brandLogosInterval);
  }, [brands.length, setBrandState, brandSlidePlay]);

  useEffect(() => {
    if (brands.length === 0 || !brandsPointerRef.current) {
      return;
    }
    let totalHeight;
    let elHeight;
    if (typeof window !== "undefined") {
      totalHeight = brandsPointerRef.current.parentElement.offsetHeight;
      elHeight = brandsPointerRef.current.previousSibling.offsetHeight;
    } else {
      return;
    }

    gsap.to(brandsPointerRef.current, { // move the pointer arrow to the current active brand
      y: (brandState * totalHeight) / brands.length + elHeight / 2 - 15,
      duration: 0.5,
    });
    if (brands[brandState].slug) { // set the corrent link to the active brand
      setLeftBarLinkTo("/brand/" + brands[brandState].slug);
    }
  }, [brandState, brandsPointerRef, brands, setLeftBarLinkTo]);

  return (
    <ContentContainer
      ref={contentRef}
      className="contentContainer"
      shapeColor={shapeColor}
    >
      {brands.length && brands.length > 1 ? ( // if the page has brands, show them
        <BrandLogosWrap
          ref={brandsRef}
          className="hide-on-expanded brand-logos-wrap"
        >
          {brands.map((el, i) => templateElements(el, i)[template])}
          <Media queries={{ mobile: "(max-width: 550px)" }}>
            {(matches) =>
              matches.mobile && row_id === "global-brands" ? (
                <svg
                  className="brands-pointer"
                  ref={brandsPointerRef}
                  css={brandsPointer}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 10 20"
                >
                  <polygon fill={contentColor} points="0 0 10 10 0 20 0 0" />
                </svg>
              ) : (
                <svg
                  className="brands-pointer"
                  ref={brandsPointerRef}
                  css={brandsPointer}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 10 20"
                >
                  <polygon fill={contentColor} points="10 20 0 10 10 0 10 20" />
                </svg>
              )
            }
          </Media>
        </BrandLogosWrap>
      ) : (
        ""
      )}
      <LeftBar
        template="pagerow"
        contentTitle={contentTitle}
        barColor={barColor}
        titleColor={titleColor}
      />
      {pr_text ? (
        <>
          <ContentWrap
            className={classnames("content-wrap hide-on-expanded", {
              "brand-content":
                (brands.length && brands.length > 1) ||
                template === "productRanges",
            })}
          >
            {currLogo ? (
              <Transition
                timeout={300}
                keyProp={brandState}
                type="fadeFully"
                globalStyle={{ height: "100%" }}
              >
                <GatsbyImage
                  image={currLogo.localFile.childImageSharp.brandLogo}
                  style={{ maxHeight: "63px" }}
                  imgStyle={{ objectFit: "contain", objectPosition: "left" }} />
                <ScrollBar>
                  <Content
                    contentColor={contentColor}
                    dangerouslySetInnerHTML={{ __html: md.render(curr_text) }}
                  />
                </ScrollBar>
              </Transition>
            ) : (
              <Media
                queries={{
                  mobile: "(max-width: 768px)",
                }}
                defaultMatches={{ mobile: true }}
              >
                {(matches) =>
                  matches.mobile ? (
                    <>
                      <Content
                        className="row-content"
                        contentColor={contentColor}
                        dangerouslySetInnerHTML={{
                          __html: md.render(curr_text),
                        }}
                      />
                      {row_id === "quality-commitment" ? <div></div> : ""}
                    </>
                  ) : (
                    <ScrollBar>
                      <Content
                        className="row-content"
                        contentColor={contentColor}
                        dangerouslySetInnerHTML={{
                          __html: md.render(curr_text),
                        }}
                      />
                      {row_id === "quality-commitment" ? <div></div> : ""}
                    </ScrollBar>
                  )
                }
              </Media>
            )}
            {links ? (
              <div
                className="brand-links"
                css={intLinks({ color: contentColor })}
              >
                {Object.entries(links).map((el, i) => (
                  <Link key={i} to={el[1]}>
                    {el[0]}
                  </Link>
                ))}
              </div>
            ) : (
              ""
            )}
          </ContentWrap>
        </>
      ) : (
        ""
      )}
    </ContentContainer>
  );
};
