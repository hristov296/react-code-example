import React, { useRef, useEffect, useState } from "react";
import FontFaceObserver from "fontfaceobserver";
import { useWindowSize } from "../../hooks/useWindowSize";
import classnames from "classnames";

import styled from "@emotion/styled";

const ScrollbarWrap = styled.div`
  overflow: hidden;
  position: relative;
  &.scroll-active {
    padding-right: 20px;
  }
`;
const ScrollbarContainer = styled.div`
  display: flex;
  align-items: center;
  .brand-content &,
  .scroll-active > & {
    overflow: auto;
    padding-right: 40px;
    margin-right: -40px;
    align-items: flex-start;
  }
`;
const ScrollTrackY = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 10px;
  background-color: #b7b7b7;
  border-radius: 10px;
  transition: width 0.3s;
  &:hover,
  .scrollbar-active & {
    width: 15px;
  }
`;
const ScrollThumbY = styled.div`
  position: absolute;
  top: 0;
  left: 0px;
  right: 0px;
  height: ${(props) => props.cssHeight + "px"};
  background-color: #868686;
  border-radius: 10px;
  transform: translateZ(1);
`;

export default (props) => {
  const scrollThumb = useRef();
  const scrollArea = useRef();
  const scrollProps = useRef({});
  const [scrollActive, setScrollActive] = useState(false);
  const screenRes = useWindowSize().width;
  const [localReflow, increaseReflow] = useState(0);
  const { wrapper = true, triggerReflow = 0, customStyles = {} } = props;

  const onAreaScroll = (e) => {
    const scrollBy = e.target.scrollTop / scrollProps.current.scrollSpace;

    scrollThumb.current.style.transform =
      "translate3d(0," + scrollBy * scrollProps.current.thumbMaxMove + "px,0)";
  };

  useEffect(() => {
    const mainFont = new FontFaceObserver("Idealist Sans");
    const secFont = new FontFaceObserver("Oswald", { weight: 600 });
    const thirdFont = new FontFaceObserver("Oswald", { weight: 400 });
    const refArea = scrollArea.current;

    Promise.all([secFont.load(), mainFont.load(), thirdFont.load()]) // wait for fonts to be loaded, as font reflow can cause changes in container width and break the custom scrollbar calculations
      .then(() => {
        refArea.style.height = "initial";
        let totalHeight = Math.floor(refArea.firstChild.clientHeight); // get the total height of the element
        const visibleHeight = Math.floor(refArea.parentElement.clientHeight);  // get the available visible height of the container

        refArea.style.height = visibleHeight + "px";
        setScrollActive(false);

        if (totalHeight - 1 > visibleHeight) { // if available height is less than the element height, then show the scrollbar
          setScrollActive(true);

          totalHeight = refArea.firstChild.clientHeight;
          // console.log(totalHeight, visibleHeight);
          scrollProps.current.scrollSpace = totalHeight - visibleHeight;
          scrollProps.current.thumbHeight = Math.round(
            (Math.max(15, Math.round((visibleHeight / totalHeight) * 100)) /
              100) *
            visibleHeight
          );
          scrollThumb.current.style.height =
            scrollProps.current.thumbHeight + "px";
          scrollProps.current.thumbMaxMove = Math.round(
            visibleHeight - scrollProps.current.thumbHeight
          );

          refArea.addEventListener("scroll", onAreaScroll, {
            passive: true,
          });
        }
      })
      .catch((err) => console.log(err));

    return () =>
      refArea.removeEventListener("scroll", onAreaScroll, {
        passive: true,
      });
  }, [screenRes, triggerReflow, localReflow]);

  const handleGestureStart = (e) => { // on clicking the scrollbar
    const numberPattern = /-?\d+\.?\d*/g;
    const startPoint = window
      .getComputedStyle(scrollThumb.current)
      .transform.match(numberPattern);
    scrollProps.current.startPointer = e.clientY;
    scrollProps.current.startPos = startPoint ? parseInt(startPoint[5]) : 0;

    // console.log(scrollProps.current.startPos, scrollProps.current.startPointer);
    document.body.classList.add("scrollbar-active");
    scrollThumb.current.style.transition = "initial";
    window.addEventListener("mousemove", handleGestureMove);
    window.addEventListener("mouseup", handleGestureEnd);
  };
  const handleGestureMove = (e) => { // on moving the scrollbar 
    const translateBy =
      e.clientY -
      scrollProps.current.startPointer +
      scrollProps.current.startPos;

    const limitedTranslate = Math.min(
      Math.max(0, translateBy),
      scrollProps.current.thumbMaxMove
    );

    const scrollBy =
      Math.min(Math.max(0, translateBy / scrollProps.current.thumbMaxMove), 1) *
      scrollProps.current.scrollSpace;

    scrollArea.current.scrollTo({ top: scrollBy });
    scrollThumb.current.style.transform =
      "translateY(" + limitedTranslate + "px)";
  };
  const handleGestureEnd = (e) => {
    e.preventDefault();

    document.body.classList.remove("scrollbar-active");
    window.removeEventListener("mousemove", handleGestureMove);
  };

  const orientChange = () => {
    increaseReflow((reflow) => reflow + 1);
  };

  useEffect(() => {
    window.addEventListener("orientationchange", orientChange);
    return () => window.removeEventListener("orientationchange", orientChange);
  }, []);

  return (
    <ScrollbarWrap
      className={classnames({ "no-scroll-zone scroll-active": scrollActive })}
      style={{ ...customStyles }}
    >
      <ScrollbarContainer ref={scrollArea}>
        {wrapper ? <div>{props.children}</div> : props.children}
      </ScrollbarContainer>
      {scrollActive ? (
        <ScrollTrackY>
          <ScrollThumbY
            ref={scrollThumb}
            cssHeight={scrollProps.current.thumbHeight}
            onMouseDown={handleGestureStart}
          />
        </ScrollTrackY>
      ) : (
        ""
      )}
    </ScrollbarWrap>
  );
};
