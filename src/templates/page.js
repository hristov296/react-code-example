import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
  createRef,
} from "react";
import { graphql, navigate } from "gatsby";
import { gsap } from "gsap";
import classnames from "classnames";
import { getCookie } from "../utils/cookie";
import { composedPath } from "../utils/composedPath";
import Media from "react-media";

import { PageContext } from "../context/page-context";

import Row from "../containers/Row";
import MobileRow from "../containers/MobileRow";
import Footer from "../containers/Footer";
import MobileHeader from "../containers/MobileHeader";

const DesktopPageTemplate = (props) => {
  const { location } = props;
  const agreement =
    getCookie("WEBSITE_POLICY_TIMED") === "VALID" &&
    getCookie("WEBSITE_POLICY_SESSION") === "VALID";
  if (!agreement && typeof window !== "undefined") { // if user hasn't accepted the agreements or they timed out, redirect to landing page
    navigate("/age-verification", {
      replace: true,
      state: {
        pathname: location.pathname,
        hash: location.hash,
      },
    });
  }
  const row_ids = useMemo(
    () => props.data.strapiPage.row_of_page.map((el) => el.row_id),
    [props.data.strapiPage.row_of_page]
  );
  const currRowId = useMemo(() => {
    const tempId = row_ids.indexOf(location.hash.substr(1));
    return tempId > -1 ? tempId : 0;
  }, [location.hash, row_ids]);
  const initialRowId = useRef(currRowId);
  const [currentRow, setCurrentRow] = useState(initialRowId.current);
  const [delayedLoad, setDelayedLoad] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [finishingAnim, setFinishingAnim] = useState(false);
  const [zoomAnim, setZoomAnim] = useState([currentRow]);
  const maxScroll = row_ids.length - 1;
  const scrolling = useRef(false);

  const rowsRef = useRef(
    [...Array(props.data.strapiPage.row_of_page.length)].map(() => createRef())
  );

  const rowIndex = (index) =>
    index === 0 ? "first" : index === maxScroll ? "last" : "";

  const doScrollDown = useCallback( // scroll one row down
    (target) => {
      if (scrolling.current || !agreement) {
        return;
      }
      if (target !== maxScroll) {
        setShowFooter(false);
      }

      scrolling.current = true;
      setFinishingAnim(false);
      // setAnimatingDown(target - 1);

      gsap
        .timeline()
        .fromTo(
          rowsRef.current[target].current,
          { yPercent: 100, y: 0, xPercent: 0 },
          { yPercent: 0, y: 0, duration: 0.75, ease: "power3.inOut" },
          0
        )
        .fromTo(
          rowsRef.current[target - 1].current,
          { yPercent: 0, y: 0, xPercent: 0 },
          {
            yPercent: -100,
            y: 0,
            duration: 0.75,
            ease: "power3.inOut",
            onStart: () => {
              setZoomAnim((zoomAnim) => [...zoomAnim, target]);
            },
            onComplete: () => {
              if (target === maxScroll) {
                setShowFooter(true);
              }
              setTimeout(() => {
                rowsRef.current[target - 1].current.style.transform = "";
                scrolling.current = false;
                setZoomAnim((zoomAnim) =>
                  [...zoomAnim].filter((val) => val !== target - 1)
                );
                window.location.hash = `#${row_ids[target]}`;
                setCurrentRow(target);
                // setAnimatingDown(false);
                setFinishingAnim(target - 1);
              }, 200);
            },
          },
          0
        );
    },
    [rowsRef, agreement, row_ids, maxScroll]
  );

  const doScrollUp = useCallback( // scroll one row up
    (target) => {
      if (scrolling.current || !agreement) {
        return;
      }
      if (target !== maxScroll) {
        setShowFooter(false);
      }

      scrolling.current = true;
      // setAnimatingUp(target + 1);

      gsap
        .timeline()
        .fromTo(
          rowsRef.current[target + 1].current,
          {
            yPercent: 0,
            y: 0,
          },
          {
            yPercent: 100,
            y: 0,
            duration: 0.75,
            ease: "power3.inOut",
          },
          0
        )
        .fromTo(
          rowsRef.current[target].current,
          {
            yPercent: -100,
            y: 0,
            xPercent: 0,
          },
          {
            yPercent: 0,
            y: 0,
            duration: 0.75,
            ease: "power3.inOut",
            onStart: () => {
              setZoomAnim((zoomAnim) => [...zoomAnim, target]);
            },
            onComplete: () => {
              if (target === maxScroll) {
                setShowFooter(true);
              }
              setTimeout(() => {
                rowsRef.current[target + 1].current.style.transform = "";
                scrolling.current = false;
                setZoomAnim((zoomAnim) =>
                  [...zoomAnim].filter((val) => val !== target + 1)
                );
                window.location.hash = `#${row_ids[target]}`;
                setCurrentRow(target);
                // setAnimatingUp(false);
                setFinishingAnim(target + 1);
              }, 50);
            },
          },
          0
        );
    },
    [rowsRef, agreement, row_ids, maxScroll]
  );

  const jumpTo = useCallback( // jump to a specific row
    (target) => {
      if (scrolling.current || !agreement) {
        return;
      }
      if (target !== maxScroll) {
        setShowFooter(false);
      }
      scrolling.current = true;

      gsap
        .timeline()
        .fromTo(
          rowsRef.current[currentRow].current,
          { xPercent: 0 },
          { xPercent: -100, duration: 0.35, delay: 550 / 1000 },
          0
        )
        .fromTo(
          rowsRef.current[target].current,
          { xPercent: 100, yPercent: 0, y: 0 },
          {
            xPercent: 0,
            yPercent: 0,
            y: 0,
            duration: 0.35,
            delay: 550 / 1000,
            onComplete: () => {
              if (target === maxScroll) {
                setShowFooter(true);
              }
              setTimeout(() => {
                rowsRef.current[currentRow].current.style.transform = "";
                scrolling.current = false;
                setZoomAnim((zoomAnim) =>
                  [...zoomAnim].filter((val) => val !== currentRow)
                );
                window.location.hash = `#${row_ids[target]}`;
                setCurrentRow(target);
                setFinishingAnim(currentRow);
              }, 200);
            },
          },
          0
        )
        .play();
    },
    [currentRow, rowsRef, agreement, row_ids, maxScroll]
  );

  const handleKeyDown = useCallback( // use the up/down arrows for navigation through rows
    (e) => {
      if (e.isComposing || e.keyCode === 229) {
        return;
      }

      if (e.keyCode === 38 && currentRow > 0) {
        doScrollUp(currentRow - 1);
      } else if (e.keyCode === 40 && currentRow < maxScroll) {
        doScrollDown(currentRow + 1);
      }
    },
    [currentRow, doScrollDown, doScrollUp, maxScroll]
  );

  const onWindowScroll = useCallback( // hijack the window scroll in order to scroll one row at a time
    (ev) => {
      const currentPath =
        ev.path ||
        (ev.composedPath && ev.composedPath()) ||
        composedPath(ev.target);
      if (
        currentPath.filter(
          (el) =>
            el.classList &&
            (el.classList.contains("no-scroll-zone") ||
              el.classList.contains("ReactModalPortal") ||
              el.classList.contains("ps--active-y"))
        ).length
      ) {
        return;
      }
      ev.preventDefault();

      if (ev.deltaY > 0 && currentRow < maxScroll) {
        doScrollDown(currentRow + 1);
      } else if (ev.deltaY < 0 && currentRow > 0) {
        doScrollUp(currentRow - 1);
      }
    },
    [currentRow, maxScroll, doScrollDown, doScrollUp]
  );

  const onSubMenuClick = useCallback( // jump to specific row on clicking a menu item
    (hash) => {
      const tempId = row_ids.indexOf(hash.substr(1));
      jumpTo(tempId > -1 ? tempId : 0);
    },
    [row_ids, jumpTo]
  );

  useEffect(() => {
    document.addEventListener("wheel", onWindowScroll, {
      passive: false,
      capture: "bubble",
    });

    return () => {
      document.removeEventListener("wheel", onWindowScroll, {
        passive: false,
        capture: "bubble",
      });
    };
  }, [onWindowScroll]);

  useEffect(() => {
    const loadTime = setTimeout(() => {
      setDelayedLoad(true);
    }, 1000);
    return () => clearTimeout(loadTime);
  }, []);

  useEffect(() => { // show the footer part if the current row is the last one
    if (initialRowId.current === maxScroll) {
      setShowFooter(true);
    } else {
      setShowFooter(false);
    }
  }, [initialRowId, maxScroll]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return agreement ? ( // if the agreements aren't met, don't attempt to load any components
    <PageContext.Provider value={{ currentRow, onSubMenuClick, jumpTo }}>
      {props.data.strapiPage.row_of_page.map((row, index) => { // use the data to show the current rows
        const { pr_settings } = row;
        const { internal_id } = row.pagerow || {};
        const currentSettings = internal_id
          ? row.pagerow.pr_settings
            ? Object.assign({}, pr_settings, row.pagerow.pr_settings)
            : pr_settings
          : pr_settings;

        return (
          <Row
            className={classnames({
              visible: index === currentRow,
              zoomAnim: zoomAnim.includes(index),
              lazyloaded: delayedLoad,
            })}
            key={index}
            ref={rowsRef.current[index]}
            data={row}
            currentSettings={currentSettings}
            isCurrent={index === currentRow}
            finishingAnim={index === finishingAnim}
            onClickScrollUp={() => doScrollUp(currentRow - 1)}
            onClickScrollDown={() => doScrollDown(currentRow + 1)}
            contentTitle={props.data.strapiPage.contentTitle}
            pagerowComponent={internal_id}
            rowPosition={rowIndex(index)}
          />
        );
      })}
      <Footer showFooter={showFooter} />
    </PageContext.Provider>
  ) : null;
};

const MobilePageTemplate = (props) => {
  const [mobHeaderState, setMobHeader] = useState("visible");
  const { location } = props;
  const agreement =
    getCookie("WEBSITE_POLICY_TIMED") === "VALID" &&
    getCookie("WEBSITE_POLICY_SESSION") === "VALID";
  if (!agreement && typeof window !== "undefined") { // if user hasn't accepted the agreements or they timed out, redirect to landing page
    navigate("/age-verification", {
      replace: true,
      state: {
        pathname: location.pathname,
        hash: location.hash,
      },
    });
  }
  const maxScroll = props.data.strapiPage.row_of_page.length - 1;

  const rowIndex = (index) =>
    index === 0 ? "first" : index === maxScroll ? "last" : "";

  return agreement ? ( // if the agreements aren't met, don't attempt to load any components
    <PageContext.Provider value={{ mobHeaderState, setMobHeader }}>
      <MobileHeader />
      {props.data.strapiPage.row_of_page.map((row, index) => {
        const { pr_settings } = row;
        const { internal_id } = row.pagerow || {};
        const currentSettings = internal_id
          ? row.pagerow.pr_settings
            ? Object.assign({}, pr_settings, row.pagerow.pr_settings)
            : pr_settings
          : pr_settings;

        return (
          <MobileRow
            key={index}
            data={row}
            currentSettings={currentSettings}
            contentTitle={props.data.strapiPage.contentTitle}
            pagerowComponent={internal_id}
            lastRow={index + 1 === props.data.strapiPage.row_of_page.length}
            rowPosition={rowIndex(index)}
          />
        );
      })}
      <Footer />
    </PageContext.Provider>
  ) : null;
};

const PageTemplate = (props) => { // the template for determining wheter desktop or mobile layout is shown
  return (
    <Media
      queries={{
        mobile: { maxWidth: 1365 },
      }}
      defaultMatches={{ mobile: true }}
    >
      {(matches) =>
        matches.mobile ? (
          <MobilePageTemplate {...props} />
        ) : (
          <DesktopPageTemplate {...props} />
        )
      }
    </Media>
  );
};

export default PageTemplate;

export const query = graphql`query PageTemplate($id: String!) {
  strapiPage(id: {eq: $id}) {
    slug
    id
    name
    contentTitle
    pageClass
    row_of_page {
      brands {
        id
        slug
        logo {
          localFile {
            childImageSharp {
              brandLogo: gatsbyImageData(height: 76, placeholder: NONE, layout: FULL_WIDTH)
            }
          }
        }
        archive_background {
          localFile {
            childImageSharp {
              fullImage: gatsbyImageData(
                quality: 90
                breakpoints: [1200, 2097]
                placeholder: NONE
                layout: FULL_WIDTH
              )
            }
          }
        }
        archive_bg_mobile {
          localFile {
            childImageSharp {
              fullImage: gatsbyImageData(
                width: 750
                quality: 90
                breakpoints: [480, 750]
                placeholder: NONE
                layout: CONSTRAINED
              )
            }
          }
        }
      }
      pagerow {
        internal_id
        pr_settings {
          row_logo_normal
          shapeColor
          contentColor
          menuColor
          menuHoverColor
          customClassname
          show_leftbar
        }
      }
      row_id
      pr_text
      pr_shape
      pr_settings {
        row_logo_normal
        row_logo_expand
        show_leftbar
        showLogoBackdrop
        contentColor
        barColor
        titleColor
        shapeColor
        menuColor
        menuHoverColor
        linkTo
        customClassname
        customTitle
        mobileShape
      }
      id
      pr_media {
        localFile {
          childImageSharp {
            fullImage: gatsbyImageData(
              quality: 90
              breakpoints: [1200, 2097]
              placeholder: NONE
              layout: FULL_WIDTH
            )
          }
        }
      }
      pr_media_mobile {
        localFile {
          childImageSharp {
            fullImage: gatsbyImageData(
              width: 750
              quality: 90
              breakpoints: [480, 750]
              placeholder: NONE
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
}
`;
