import React, { useContext } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link, useStaticQuery, graphql } from "gatsby";

import Transition from "../Transition";

import { RowContext } from "../../context/row-context";
import { PageContext } from "../../context/page-context";

import { logoItem, additionalSpan, logoWrap, WebsiteLogo } from "./Components";

export default ({ logos }) => {
  const data = useStaticQuery(graphql`query LogosQuery {
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
}
`);

  const { rowState } = useContext(RowContext);
  const { jumpTo } = useContext(PageContext);
  const textColors = {
    site_logo: "#fff",
    site_logo_dark: "#3a383c",
    site_logo_white: "#fff",
  };

  const textColor = logos.expanded
    ? textColors[logos[rowState]]
    : textColors[logos.normal];

  const onLogoClick = (e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      jumpTo(0);
    }
  };

  return (
    <WebsiteLogo>
      <Link
        // swipe
        // direction="left"
        onClick={onLogoClick}
        to="/"
        tabIndex="-1"
      >
        <Transition timeout={300} keyProp={rowState}>
          <div css={logoWrap}>
            {logos.expanded ? (
              <GatsbyImage
                image={data[logos[rowState]].childImageSharp.gatsbyImageData}
                css={logoItem}
                durationFadeIn={150} />
            ) : (
              <GatsbyImage
                image={data[logos.normal].childImageSharp.gatsbyImageData}
                durationFadeIn={150}
                css={logoItem} />
            )}
            <span css={[additionalSpan, { color: textColor }]}> / Home</span>
          </div>
        </Transition>
      </Link>
    </WebsiteLogo>
  );
};
