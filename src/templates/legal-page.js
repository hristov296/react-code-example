import React, { useContext } from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import { Remarkable } from "remarkable";
// import ScrollBar from "react-scrollbars-custom";
import ScrollBar from "../containers/Scrollbar";

import Close from "../assets/svg/close.inline.svg";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { ModalRoutingContext } from "../context/modal-routing";

const md = new Remarkable({ html: true, breaks: true });

const newsModal = css`
  height: 100%;
  display: flex;
`;

const contWrapper = css`
  height: 100%;
  flex: 55;
  padding: 40px 20px 20px;
  display: flex;
  flex-flow: column;
  @media (max-width: 550px) {
    padding: 50px 10px 10px;
  }
`;
const closeButton = css`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  display: flex;
  padding: 0;
  cursor: pointer;
  svg {
    height: 24px;
    width: 24px;
    fill: #3a383c;
  }
`;
const Content = styled.div`
  padding-right: 20px;
  line-height: 1.35;
  color: #424242;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-transform: uppercase;
    font-family: var(--sec-font);
    font-size: 30px;
    margin: 0 0 15px;
    @media (max-width: 550px) {
      font-size: 24px;
    }
  }
  a {
    text-decoration: underline;
  }
  ul {
    padding-left: 25px;
    li {
      list-style-type: disc;
    }
  }
  ol {
    li {
      list-style-type: decimal;
    }
  }
`;

const LegalPage = ({ data }) => {
  const { modal, closeTo } = useContext(ModalRoutingContext);
  return (
    <div css={newsModal}>
      <div css={contWrapper}>
        <ScrollBar>
          <Content
            dangerouslySetInnerHTML={{
              __html: md.render(data.strapiLegalPage.content),
            }}
          ></Content>
        </ScrollBar>
      </div>
      {modal ? ( // if modal is open, then show the "close" button
        <Link
          to={closeTo}
          state={{ closingModal: true, scrollPosition: window.pageYOffset }}
          css={closeButton}
        >
          <Close />
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default LegalPage;

export const query = graphql`
  query LegalPageTemplate($id: String!) {
    strapiLegalPage(id: { eq: $id }) {
      content
      title
    }
  }
`;
