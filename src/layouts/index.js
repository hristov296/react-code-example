import React from "react";
import { Global, css } from "@emotion/react";
import "normalize.css";
import "../../static/fonts/fonts.css";
import SiteMetadata from "../containers/Helmet";
import { gsap } from "gsap";
import classnames from "classnames";
import { useMedia } from "react-media";
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group";

const timeout = 400;
const delay = 420;
const globalStyles = css`
  * {
    box-sizing: border-box;
    outline: 1px solid red;
    outline: none !important;
    -webkit-tap-highlight-color: transparent;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--sec-font);
  }
  html {
    overflow: hidden;
    -webkit-overflow-scrolling: auto;
    @media (max-width: 1365px) {
      overflow: scroll;
      height: initial;
    }
    &.swiping {
      height: 100%;
      overflow: hidden;
    }
    &.ReactModal__Html--open {
      /* touch-action: none; */
      overflow: hidden;
    }
  }
  body {
    overflow: hidden;
    touch-action: none;
    font-family: var(--main-font);
    -webkit-overflow-scrolling: auto;
    &.mob-menu-open {
      /* overflow: hidden; */
      /* position: fixed; */
    }
    &.scrollbar-active {
      user-select: none;
    }
    &.ReactModal__Body--open {
      /* touch-action: none; */
      overflow: hidden;
    }
    &.open-position {
      touch-action: none;
    }
    @media (max-width: 1365px) {
      overflow: initial;
      touch-action: auto;
      width: 100vw;
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  li {
    list-style-type: none;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  .hide-on-expanded {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s ease-in-out, visibility 0.3s;
    .website-row.state-expanded & {
      visibility: hidden;
      opacity: 0;
    }
  }
  .ReactModal__Content {
    top: 10vh !important;
    bottom: 10vh !important;
    right: 17.42vw !important;
    left: 17.42vw !important;
    border-top-left-radius: 3.37vw !important;
    border-bottom-right-radius: 3.37vw !important;
    box-shadow: -11px 11px 20px 0px rgba(0, 0, 0, 0.811);
    @media (max-width: 1365px) {
      top: 4vh !important;
      bottom: 4vh !important;
      left: 4vh !important;
      right: 4vh !important;
    }
  }
  .website-gmap {
    margin-top: 15px;
    border-top-left-radius: 18px;
    border-bottom-right-radius: 18px;
    width: 100%;
    height: 33vh;
    border: none;
  }
  .screen-reader-text {
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    word-wrap: normal !important;
  }
  .tl-edges {
    overflow: hidden;
  }
  .ScrollbarsCustom-Content {
    display: flex;
    align-items: center;
  }
  .exiting {
    .contentContainer {
      opacity: 0;
    }
    .leftBarWrap:not(.no-anim) {
      transform: translate3d(0, -25%, 0);
    }
    .contentTitle {
      transform: translate3d(0, 100%, 0);
    }
  }
  .g-recaptcha {
    width: 304px;
    height: 78px;
  }
`;

const pageWrap = css`
  height: 100vh;
  /* -webkit-overflow-scrolling: auto; */
  position: relative;
  @media (max-width: 1365px) {
    height: initial;
    &.brand-page {
      height: 100vh;
    }
  }
  .mob-menu-open & {
    &:not(.entering) {
      height: 100vh;
      overflow: hidden;
    }
  }
  @media (max-width: 1365px) {
    &:not(.age-verification) {
      padding-top: 83px;
    }
  }
  @media (max-width: 600px) {
    &:not(.age-verification) {
      padding-top: 77px;
    }
  }
`;

const nodeonEntering = (node, isTouch) => {
  if (isTouch) {
    gsap.fromTo(
      node,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: timeout / 1000 }
    );
  } else {
    gsap.fromTo(
      node,
      { xPercent: 100 },
      { xPercent: 0, duration: timeout / 1000, delay: delay / 1000 }
    );
  }
};

const nodeOnStart = (node, isTouch) => {
  if (!isTouch) {
    node.style.position = "absolute";
    node.style.left = 0;
    node.style.top = 0;
    node.style.width = "100vw";
    node.style.zIndex = -1;
  }
};

const nodeOnExiting = (node, isTouch) => {
  if (isTouch) {
    gsap.fromTo(
      node,
      { autoAlpha: 1 },
      {
        autoAlpha: 0,
        duration: timeout / 1000,
        delay: 0.3,
      }
    );
  } else {
    gsap.fromTo(
      node,
      { xPercent: 0 },
      { xPercent: -80, duration: timeout / 1000, delay: delay / 1000 }
    );
  }
};

export default (props) => { // the global layout for the website. Add global styles, add site metadata, wrap the content in a Transition component
  const { children, location, pageContext = {}, transKey } = props;

  let { pageClass, seo } = pageContext;
  const isTouch = useMedia({
    query: "(max-width: 1365px)",
  });

  if (props.location.pathname.indexOf("age-verification") > -1) {
    pageClass = "age-verification"; // add a custom class if currently on landing page
  }

  return (
    <>
      <Global styles={globalStyles} />
      <SiteMetadata pathname={location.pathname} {...seo} />
      <TransitionGroup>
        <ReactTransition
          key={transKey}
          timeout={{
            enter: timeout + delay,
            exit: timeout + delay,
          }}
          onEntering={(node) => nodeonEntering(node, isTouch)}
          onExit={(node) => nodeOnStart(node, isTouch)}
          onExiting={(node) => nodeOnExiting(node, isTouch)}
        >
          {(status) => (
            <div className={classnames(status, pageClass)} css={pageWrap}>
              {children}
            </div>
          )}
        </ReactTransition>
      </TransitionGroup>
    </>
  );
};
