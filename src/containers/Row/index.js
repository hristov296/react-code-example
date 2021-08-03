import React, { useState, forwardRef, useEffect } from "react";
import classnames from "classnames";
import * as pagerows from "../../pagerows";

import { RowContext } from "../../context/row-context";

import {
  WebsiteRow,
  LogoBackdrop,
  ScrollButtonHiding,
  ScrollButton,
} from "./Components";

import SliderBackground from "../SliderBackground";
import Menu from "../Menu";
import SiteLogo from "../SiteLogo";
import Shape from "../RowShapes";
import Content from "../Content";

import ChevronUp from "../../assets/svg/chevron-up.inline.svg";
import ChevronDown from "../../assets/svg/chevron-down.inline.svg";

const Row = forwardRef(
  (
    {
      data,
      className,
      currentSettings,
      contentTitle = "",
      rowPosition,
      isCurrent,
      finishingAnim,
      onClickScrollUp,
      onClickScrollDown,
      pagerowComponent,
      rowHeight,
    }, ref
  ) => {
    const shouldScrollDown =
      rowPosition !== "last" ? onClickScrollDown : () => { };
    const [rowState, setRowState] = useState("normal");
    const [brandState, setBrandState] = useState(0);
    const { row_id, pr_text, pr_media, pr_shape = "", brands } = data;
    const {
      showLogoBackdrop,
      shapeColor,
      contentColor,
      barColor,
      titleColor,
      linkTo,
      row_logo_normal,
      row_logo_expand,
      menuHoverColor,
      menuColor,
      customClassname,
      show_leftbar = false,
      customTitle,
    } = currentSettings || {};

    const [leftBarLinkTo, setLeftBarLinkTo] = useState(linkTo);

    const playing = rowState === "expanded" ? false : isCurrent;

    const sliderMedia = brands.length
      ? [brands[brandState].archive_background]
      : pr_media;

    useEffect(() => {
      if (finishingAnim) {
        setRowState("normal");
      }
    }, [finishingAnim]);

    const PageRow = pagerowComponent ? pagerows[pagerowComponent] : "div";

    return (
      <RowContext.Provider
        value={{
          rowState,
          row_id,
          setRowState,
          brandState,
          setBrandState,
          leftBarLinkTo,
          setLeftBarLinkTo,
          shouldScrollDown,
          linkToText: row_id === "our-company" ? "Scroll" : "Read More",
          leftBarButton: rowPosition === "last" ? "back-to-top" : "scroll",
        }}
      >
        <WebsiteRow
          ref={ref}
          id={row_id}
          className={classnames(
            "website-row",
            `shape-${pr_shape}`,
            className,
            customClassname,
            `state-${rowState}`,
            { "last-row": rowPosition === "last" }
          )}
          tabIndex="0"
          cssHeight={rowHeight ? "100vh" : "initial"}
        >
          {sliderMedia.length ? (
            <SliderBackground
              media={sliderMedia}
              playing={playing}
              keyProp={brandState}
            />
          ) : (
            ""
          )}
          {pagerowComponent ? <PageRow /> : ""}
          {showLogoBackdrop ? <LogoBackdrop /> : ""}
          <Shape shape={pr_shape} shapeColor={shapeColor} />
          {pr_text || show_leftbar ? (
            <Content
              data={{
                contentTitle:
                  typeof customTitle === "string" ? customTitle : contentTitle,
                rowState,
                contentColor,
                barColor,
                titleColor,
                pr_text,
                brands,
              }}
            />
          ) : (
            ""
          )}
          {row_logo_normal ? (
            <SiteLogo
              logos={{ normal: row_logo_normal, expanded: row_logo_expand }}
              logoNormal={row_logo_normal}
              logoExpand={row_logo_expand}
            />
          ) : (
            ""
          )}
          {rowPosition !== "first" ? (
            <button
              css={[ScrollButton, ScrollButtonHiding, { top: "10px" }]}
              onClick={onClickScrollUp}
              tabIndex="-1"
            >
              <ChevronUp />
            </button>
          ) : (
            ""
          )}
          {rowPosition !== "last" ? (
            <button
              css={[ScrollButton, { bottom: "10px" }]}
              onClick={onClickScrollDown}
              tabIndex="-1"
            >
              <ChevronDown />
            </button>
          ) : (
            ""
          )}
          <Menu
            menuColor={menuColor}
            menuHoverColor={menuHoverColor}
            menuContentColor={contentColor}
          />
        </WebsiteRow>
      </RowContext.Provider>
    );
  }
);

export default Row;
