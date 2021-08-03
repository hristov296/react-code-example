import React from "react";
import { Link } from "gatsby";
import Media from "react-media";

import {
  FooterWrap,
  FooterContainer,
  footerText,
  footerText2,
  footRightSvg,
  FooterRightWrap,
  FooterRightMenu,
  socLink,
  socLinkIcon,
  socLinkWrap,
  rightMenuText,
} from "./Components";

import FbIcon from "../../assets/svg/fb_circle.inline.svg";
import IgIcon from "../../assets/svg/ig_circle.inline.svg";
import InIcon from "../../assets/svg/in_circle.inline.svg";

export default React.memo(({ showFooter }) => {
  return (
    <FooterWrap className={showFooter ? "visible" : ""}>
      <FooterContainer>
        <div>
          <Media
            queries={{
              mobile: "(max-width: 768px)",
              tablet: "(min-width: 769px) and (max-width: 1665px)",
              desktop: "(min-width: 1666px)",
            }}
            defaultMatches={{ mobile: true }}
          >
            {(matches) =>
              matches.mobile ? (
                <>
                  <div className="mobile-foot-container">
                    <p css={footerText}>
                      <Link
                        tabIndex="-1"
                        state={{ modal: true }}
                        to="/terms-and-conditions-of-use"
                      >
                        Terms & Conditions Of Use
                      </Link>
                      |
                      <Link
                        tabIndex="-1"
                        state={{ modal: true }}
                        to="/privacy-policy"
                      >
                        Privacy Policy
                      </Link>
                      |
                      <Link
                        tabIndex="-1"
                        state={{ modal: true }}
                        to="/personal-data-protection-policy"
                      >
                        Personal Data Protection Policy
                      </Link>
                    </p>
                  </div>
                  <div css={{ margin: "0 auto" }}>
                    <p css={[footerText, footerText2]}>
                      © All rights reserved.
                    </p>
                  </div>
                </>
              ) : matches.tablet ? (
                <div className="mobile-foot-container">
                  <p css={footerText}>
                    <Link
                      tabIndex="-1"
                      state={{ modal: true }}
                      to="/terms-and-conditions-of-use"
                    >
                      Terms & Conditions Of Use
                    </Link>
                    |
                    <Link
                      tabIndex="-1"
                      state={{ modal: true }}
                      to="/privacy-policy"
                    >
                      Privacy Policy
                    </Link>
                    |
                    <Link
                      tabIndex="-1"
                      state={{ modal: true }}
                      to="/personal-data-protection-policy"
                    >
                      Personal Data Protection Policy
                    </Link>
                  </p>
                  <p css={footerText}>
                    © All rights reserved.
                  </p>
                </div>
              ) : (
                <p css={footerText}>
                  © All rights reserved.
                  <Link
                    tabIndex="-1"
                    state={{ modal: true }}
                    to="/terms-and-conditions-of-use"
                  >
                    Terms & Conditions Of Use
                  </Link>
                  |
                  <Link
                    tabIndex="-1"
                    state={{ modal: true }}
                    to="/privacy-policy"
                  >
                    Privacy Policy
                  </Link>
                  |
                  <Link
                    tabIndex="-1"
                    state={{ modal: true }}
                    to="/personal-data-protection-policy"
                  >
                    Personal Data Protection Policy
                  </Link>
                </p>
              )
            }
          </Media>
        </div>
        <FooterRightWrap>
          <svg
            css={footRightSvg}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 490.96 99.83"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="menu-footer-grad"
                x1="-627.2"
                x2="-627.2"
                y1="99.83"
                gradientTransform="matrix(-1 0 0 1 -381.72 0)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#74001d" />
                <stop offset="1" stopColor="#ba0027" />
              </linearGradient>
            </defs>
            <path
              fill="url(#menu-footer-grad)"
              d="M7.71 97.06c59.83-23.84 61.6-84 131-96.84A13.51 13.51 0 01141.1 0H491v99.83H0q4-1.29 7.71-2.77z"
            />
          </svg>
          <FooterRightMenu>
            <p css={rightMenuText}>Follow us</p>
            <div css={socLinkWrap}>
              <a
                tabIndex="-1"
                css={socLink}
                href="https://www.linkedin.com/company/king%27s-tobacco/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InIcon css={socLinkIcon} />
              </a>
              <a
                tabIndex="-1"
                css={socLink}
                href="https://www.facebook.com/websitenternational.eu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FbIcon css={socLinkIcon} />
              </a>
              <a
                tabIndex="-1"
                css={socLink}
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IgIcon css={socLinkIcon} />
              </a>
            </div>
          </FooterRightMenu>
        </FooterRightWrap>
      </FooterContainer>
    </FooterWrap>
  );
});
