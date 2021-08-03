import React, { useState } from "react";
import { graphql, navigate, Link } from "gatsby";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
// import Media from "react-media";

// import Scrollbar from "../containers/Scrollbar";

import { setCookie } from "../utils/cookie";

const VerificationWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #000;
  @media (max-width: 768px), (max-width: 1366px) and (orientation: portrait) {
    height: initial;
    min-height: 100vh;
  }
`;

const videoCss = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  @supports (-ms-ime-align: auto) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: auto;
  }
  @media (max-width: 768px), (max-width: 1366px) and (orientation: portrait) {
    height: initial;
  }
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 22vw;
  background-color: rgba(0, 0, 0, 0.858);
  padding: 10px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  color: #bababa;
  font-size: 1.9vw;
  @media (max-width: 1366px) {
    width: 305px;
    font-size: 28px;
  }
  @media (max-width: 768px), (max-width: 1366px) and (orientation: portrait) {
    background-color: rgba(0, 0, 0, 1);
    width: 100%;
    top: initial;
    position: relative;
  }
`;

const contentTitle = css`
  font-size: 1em;
  text-transform: uppercase;
  font-family: var(--sec-font);
  margin: 0 0 15px;
`;

const contentP = css`
  font-size: 0.5em;
  margin: 0 0 25px;
  line-height: 1.3;
`;

const contentButton = css`
  background: none;
  border: 1px solid #fff;
  padding: 5px 0 7px;
  width: 90%;
  text-align: center;
  outline: none;
  color: #bababa;
  margin-bottom: 20px;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 0.7em;
  font-family: var(--sec-font);
  transition: border-color 0.3s;
  &:hover {
    border-color: #ba0027;
  }
  u {
    font-weight: bold;
  }
  @media (max-width: 768px), (max-width: 1366px) and (orientation: portrait) {
    max-width: 220px;
    margin: 0 auto 20px;
  }
`;

const agreementText = css`
  position: relative;
`;

const contentCheckbox = css`
  position: absolute;
  top: 2px;
  left: -30px;
  border: 1px solid #bababa;
  display: flex;
`;

const CheckMark = styled.svg`
  width: 17px;
  height: 17px;
  fill: #bababa;
  cursor: pointer;
  transition: opacity 0.3s;
  opacity: ${(props) => props.opacityProp};
`;

const errorCss = css`
  color: #ba0027;
  height: 52px;
  font-size: 0.5em;
`;
const contentWrap = css`
  padding: 0 3.5vw;
  @media (max-width: 1366px) {
    padding: 0 0 0 40px;
  }
  @media (max-width: 768px), (max-width: 1366px) and (orientation: portrait) {
    display: flex;
    flex-flow: column;
    padding-left: 0;
    .error-text {
      order: 1;
      height: initial;
      margin: 0 0 15px;
      text-align: center;
    }
    .buttons-wrap {
      order: 4;
    }
    .verification-title {
      text-align: center;
    }
    .agreement-label {
      padding-left: 30px;
      p {
        margin-bottom: 10px;
      }
    }
    .content-checkbox {
      left: 0;
    }
  }
`;
const buttonsWrap = css`
  display: flex;
  flex-wrap: wrap;
`;

const errorTexts = {
  notLegal: "You must be of legal age to view this website",
  notConfirmed: "Please first agree with our Personal Data Protection Policy",
};

const VerificationContent = (props) => {
  const {
    handleCheck,
    confirmLegalAge,
    declineLegalAge,
    currError,
    checked,
  } = props;

  return (
    <div css={contentWrap}>
      <h1 css={contentTitle} className="verification-title">
        Age Verification
      </h1>
      <p css={contentP}>
        We value our social responsibility and we need you
        to confirm your legal status before you proceed.
      </p>
      <div css={buttonsWrap} className="buttons-wrap">
        <button css={contentButton} onClick={confirmLegalAge}>
          I am of legal age
        </button>
        <button css={contentButton} onClick={declineLegalAge}>
          I am <u>not</u> of legal age
        </button>
      </div>
      <p css={errorCss} className="error-text">
        {errorTexts[currError]}
      </p>
      <p css={contentP}>
        We use cookies to ensure that we give you the best experience on our
        website. By clicking on the button <strong>I am of legal age</strong>{" "}
        and entering the website you agree with our{" "}
        <Link
          style={{ textDecoration: "underline" }}
          state={{ modal: true }}
          to="/privacy-policy"
        >
          Privacy Policy
        </Link>
      </p>
      <label
        htmlFor="privacy-agreement"
        css={agreementText}
        className="agreement-label"
      >
        <input
          id="privacy-agreement"
          type="checkbox"
          className="screen-reader-text"
          onChange={handleCheck}
          aria-label="Agreement Checkbox"
        />
        <div css={contentCheckbox} className="content-checkbox">
          <CheckMark
            viewBox="4 4 16 16"
            aria-hidden="true"
            opacityProp={checked}
          >
            <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
          </CheckMark>
        </div>
        <p css={contentP}>
          I confirm that I am familiar with and accept the{" "}
          <Link
            style={{ textDecoration: "underline" }}
            state={{ modal: true }}
            to="/personal-data-protection-policy"
          >
            Personal Data Protection Policy.
          </Link>
        </p>
      </label>
    </div>
  );
};

const AgeVerification = (props) => {
  const [checked, setChecked] = useState(0);
  const [currError, setError] = useState(undefined);
  const state = props.location.state || {};

  const handleCheck = (e) => {
    setChecked(e.target.checked ? 1 : 0);
  };

  const confirmLegalAge = () => { //check if the user agreements are met and the user is of legal age
    if (checked) {
      setCookie("WEBSITE_POLICY_TIMED", "VALID", 1);
      setCookie("WEBSITE_POLICY_SESSION", "VALID");
      if (state.pathname) {
        navigate(state.pathname + state.hash);
      } else {
        navigate("/");
      }
    } else {
      setError("notConfirmed");
    }
  };

  const declineLegalAge = () => {
    setError("notLegal");
  };

  return (
    <VerificationWrapper>
      <video
        css={videoCss}
        src={props.data.intro_video.localURL}
        autoPlay
        loop
        muted
        playsInline
        aria-label="Welcome Video"
      ></video>
      <ContentWrapper>
        <VerificationContent
          declineLegalAge={declineLegalAge}
          confirmLegalAge={confirmLegalAge}
          handleCheck={handleCheck}
          checked={checked}
          currError={currError}
        />
      </ContentWrapper>
    </VerificationWrapper>
  );
};

export default AgeVerification;

export const query = graphql`
  query VerificationQuerySa {
    intro_video: file(fields: { optionId: { eq: "landing_video" } }) {
      id
      url
      relativePath
      localURL
    }
  }
`;
