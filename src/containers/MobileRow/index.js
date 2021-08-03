import React, { useState, useRef, useEffect } from "react";
import Media, { useMedia } from "react-media";
import classnames from "classnames";
import * as pagerows from "../../pagerows";

import { RowContext } from "../../context/row-context";

import { WebsiteRow, mobContentWrap } from "./Components";

import SliderBackground from "../SliderBackground";
import Shape from "../RowShapes";
import Content from "../Content";

const MobileRow = ({
  data,
  className,
  currentSettings,
  contentTitle = "",
  rowPosition,
  pagerowComponent,
  lastRow,
}) => {
  const [brandState, setBrandState] = useState(0);
  const [brandSlidePlay, setBrandSlideState] = useState(false);
  const {
    row_id,
    pr_text,
    pr_media,
    pr_media_mobile,
    pr_shape = "",
    brands,
  } = data;
  const {
    shapeColor,
    contentColor,
    barColor,
    titleColor,
    linkTo,
    customClassname,
    show_leftbar = false,
    customTitle,
    mobileShape,
  } = currentSettings || {};

  const [leftBarLinkTo, setLeftBarLinkTo] = useState(linkTo);
  const brandObserver = useRef();
  const observer = useRef(null);
  const isMobile = useMedia({
    query: "(max-width: 768px)",
  });

  const observerCb = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setBrandSlideState(true);
      } else {
        setBrandSlideState(false);
      }
    });
  };

  useEffect(() => {
    if (!brandObserver.current) return;
    if (observer.current) observer.current.disconnect();

    const options = {
      threshold: 0.15,
    };

    observer.current = new window.IntersectionObserver(observerCb, options);

    observer.current.observe(brandObserver.current);

    return () => observer.current.disconnect();
  }, [brandObserver]);

  const sliderMedia = brands.length
    ? [isMobile
      ? brands[brandState].archive_bg_mobile
      : brands[brandState].archive_background,]
    : isMobile
      ? pr_media_mobile.length
        ? pr_media_mobile
        : pr_media
      : pr_media;
  const PageRow = pagerowComponent ? pagerows[pagerowComponent] : "div";
  const currentShape = isMobile && mobileShape ? mobileShape : pr_shape;
  const mobileShapeColor = row_id === "our-values" ? undefined : shapeColor;

  const transStyles =
    brands.length && isMobile
      ? { position: " absolute", width: "100%", left: 0, top: 0 }
      : {};

  const brandRowProps =
    customClassname === "brands-row" ? { ref: brandObserver } : {};

  return (
    <RowContext.Provider
      value={{
        row_id,
        brandState,
        setBrandState,
        leftBarLinkTo,
        setLeftBarLinkTo,
        linkToText: row_id === "our-company" ? "Scroll" : "Read More",
        leftBarButton: rowPosition === "last" ? "back-to-top" : "scroll",
        brandSlidePlay,
      }}
    >
      <WebsiteRow
        id={row_id}
        className={classnames(
          "website-row",
          `shape-${currentShape}`,
          { "last-row": lastRow },
          className,
          customClassname
        )}
        tabIndex="0"
        {...brandRowProps}
      >
        {sliderMedia.length ? (
          <SliderBackground
            media={sliderMedia}
            keyProp={brandState}
            globalStyle={transStyles}
          />
        ) : (
          ""
        )}
        {pagerowComponent ? <PageRow /> : ""}
        <Media
          queries={{
            mobile: "(max-width: 768px)",
          }}
          defaultMatches={{ mobile: true }}
        >
          {(matches) =>
            matches.mobile ? (
              <div css={mobContentWrap({ shapeColor: mobileShapeColor })}>
                <Shape shape={currentShape} shapeColor={mobileShapeColor} />
                {pr_text || show_leftbar ? (
                  <Content
                    data={{
                      contentTitle:
                        typeof customTitle === "string"
                          ? customTitle
                          : contentTitle,
                      contentColor,
                      shapeColor: mobileShapeColor,
                      barColor,
                      titleColor,
                      pr_text,
                      brands,
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            ) : (
              <>
                <Shape shape={pr_shape} shapeColor={shapeColor} />
                {pr_text || show_leftbar ? (
                  <Content
                    data={{
                      contentTitle:
                        typeof customTitle === "string"
                          ? customTitle
                          : contentTitle,
                      contentColor,
                      shapeColor,
                      barColor,
                      titleColor,
                      pr_text,
                      brands,
                    }}
                  />
                ) : (
                  ""
                )}
              </>
            )
          }
        </Media>
      </WebsiteRow>
    </RowContext.Provider>
  );
};

export default MobileRow;
