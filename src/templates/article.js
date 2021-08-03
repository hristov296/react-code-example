import React, { useContext } from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { Remarkable } from "remarkable";
import Media from "react-media";

import Close from "../assets/svg/close.inline.svg";
import { css } from "@emotion/react";

import ScrollBar from "../containers/Scrollbar";

import { ModalRoutingContext } from "../context/modal-routing";
const md = new Remarkable({ html: true, breaks: true });

const newsModal = css`
  height: 100%;
  display: flex;
  @media (max-width: 768px) {
    flex-flow: column;
    overflow: auto;
  }
`;

const imgWrapper = (props) => css`
  width: calc(80vh * ${props.aspectRatio.toFixed(3)});
  max-width: 45%;
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

const contWrapper = css`
  height: 100%;
  /* flex: 55; */
  flex: 1;
  padding: 4.83vw;
  display: flex;
  flex-flow: column;
  .ScrollbarsCustom-Content {
    align-items: flex-start;
  }
`;
const modalTitle = css`
  margin: 0 0 25px;
  font-size: calc(25px + (100vw - 1366px) * 0.009);
  @media (max-width: 1366px) {
    font-size: 25px;
  }
`;
const modalText = css`
  line-height: 1.45;
  margin: 0;
  padding-right: 16px;
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
  @media (max-width: 768px) {
    padding: 10px;
    background-color: #fff;
    top: 0;
    right: 0;
  }
`;

const Article = ({ data }) => {
  const { modal, closeTo } = useContext(ModalRoutingContext);
  const { childImageSharp } = data.strapiArticle.thumbnail.localFile;

  return (
    <div css={newsModal} className="news-modal">
      {childImageSharp ? ( // check if Article has image
        <div
          css={imgWrapper({
            aspectRatio: childImageSharp.fullThumb.aspectRatio,
          })}
        >
          <GatsbyImage
            image={childImageSharp.fullThumb}
            // imgStyle={{ objectFit: "contain" }}
            style={{ height: "100%" }} />
        </div>
      ) : (
        ""
      )}
      <div css={contWrapper}>
        <h1 css={modalTitle}>{data.strapiArticle.title}</h1>
        <Media query={"(max-width: 768px)"}>
          {(matches) =>
            matches ? (
              <p
                css={modalText}
                dangerouslySetInnerHTML={{
                  __html: md.render(data.strapiArticle.content),
                }}
              />
            ) : (
              <ScrollBar>
                <p
                  css={modalText}
                  dangerouslySetInnerHTML={{
                    __html: md.render(data.strapiArticle.content),
                  }}
                />
              </ScrollBar>
            )
          }
        </Media>
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

export default Article;

export const query = graphql`query ArticleTemplate($id: String!) {
  strapiArticle(id: {eq: $id}) {
    content
    excerpt
    title
    created_at
    thumbnail {
      localFile {
        childImageSharp {
          fullThumb: gatsbyImageData(
            height: 1040
            quality: 90
            transformOptions: {cropFocus: CENTER}
            layout: FULL_WIDTH
          )
        }
      }
    }
  }
}
`;
