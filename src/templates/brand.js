import React, { useState, useMemo } from "react";
import { graphql, Link } from "gatsby";
import classnames from "classnames";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Remarkable } from "remarkable";
import { GatsbyImage } from "gatsby-plugin-image";
import Media, { useMedia } from "react-media";

import { RowContext } from "../context/row-context";

import SiteLogo from "../containers/SiteLogo";
import Menu from "../containers/Menu";
import Footer from "../containers/Footer";
import Shape from "../containers/RowShapes";
import Background from "../containers/BrandBackground";
import Content from "../containers/Content";
import Slider from "../containers/BrandSlider";
import MobileHeader from "../containers/MobileHeader";
import LeftBar from "../containers/LeftBar";

import ChevronDown from "../assets/svg/chevron-down.inline.svg";

const md = new Remarkable({ html: true, breaks: true });

const brandRow = css`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @media (max-width: 1365px) {
    /* @media (max-width: 768px) { */
    padding-top: 10px;
    padding-bottom: 120px;
    margin-bottom: -95px;
    padding-top: 20px;
  }
  @media (max-width: 1200px) {
    position: relative;
  }
  @media (max-width: 550px) {
    .product-wrap {
      padding: 0 15px;
    }
    .product-thumbs {
      width: calc(100% - 60px);
    }
    .product-main {
      height: initial;
      .gatsby-image-wrapper {
        width: 45vw !important;
        max-height: 400px;
      }
      .product-info {
        margin-left: 10px;
        width: auto;
      }
    }
  }
  @media (max-width: 400px) {
    .product-main {
      flex-flow: column;
      .gatsby-image-wrapper {
        width: 75vw !important;
      }
      .product-info {
        margin: 0;
      }
    }
  }
`;

const mobContent = (props) => css`
  color: ${props.contentColor};
  position: relative;
  right: initial;
  top: initial;
  overflow: hidden;
  padding-top: 35px;
  padding-left: 35px;
  padding-bottom: 25px;  
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 450 550' preserveAspectRatio='none'%3E%3Cpath d='M450 550H0V128C0 57 54 0 121 0h329z' fill='%23${props.shapeColor.substr(1)}'/%3E%3C/svg%3E");
  p {
    margin: 0 0 10px;
  }
  .leftbar-pagerow {
    right: 10px !important;
    bottom: 10px;
  }
  @media (max-width: 1365px) and (min-width: 769px) {
    .leftbar-pagerow {
    bottom: 25px;
  }  
  }
  @media (max-width: 768px) {
    padding-bottom: 80px;
  .leftbar-pagerow {
    bottom: 80px;
  }
  }
`;

const productRangeSelect = (props) => css`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-bottom: 35px;
  color: ${props.prodTextColor};
  select {
    border: 2px solid #fff;
    border-top-left-radius: 12px;
    border-bottom-right-radius: 12px;
    background-color: rgba(255, 255, 255, 0.34);
    padding: 4px 6px;
    outline: none;
    min-width: 230px;
    color: ${props.prodTextColor};
    -webkit-appearance: none;
  }
  p {
    font-size: 13px;
    margin: 5px 0 0;
  }
  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

const selectWrap = css`
  position: relative;
`;

const chDown = css`
  width: 18px;
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
`;

const intLinks = (props) => css`
  color: ${props.color};
  display: flex;
  flex-flow: column;
  font-weight: 600;
  margin-top: 15px;
  margin-right: 45px;
  a {
    transition: color 0.3s;
    margin-bottom: 7px;
    font-family: var(--sec-font);
    text-transform: uppercase;
    &:hover {
      color: #ba0027;
    }
  }
`;

const TouchOnly = styled.div`
  @media (min-width: 1366px) {
    display: none;
  }
`;

const MobileOnly = styled.div`
  @media (min-width: 1201px) {
    display: none;
  }
`;

const MobileContent = ({ data }) => { // the mobile brand page structure
  const { contentColor, currLogo, pr_text, shapeColor, links } = data;
  return (
    <div
      css={mobContent({ contentColor, shapeColor })}
      className="mobile-content"
    >
      <LeftBar
        template="pagerow"
        barColor={contentColor}
        titleColor={contentColor}
      />
      <GatsbyImage
        image={currLogo.localFile.childImageSharp.brandLogo}
        style={{ maxHeight: "63px" }}
        imgStyle={{ objectFit: "contain", objectPosition: "left" }} />
      <div
        css={{ lineHeight: 1.5, marginRight: "45px" }}
        dangerouslySetInnerHTML={{ __html: md.render(pr_text) }}
      />
      {links ? (
        <div className="brand-links" css={intLinks({ color: contentColor })}>
          {Object.entries(links).map((el, i) => (
            <Link key={i} to={el[1]}>
              {el[0]}
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const Brand = ({ data }) => {
  const {
    brand_settings,
    slug,
    logo,
    alt_logo,
    product_ranges,
    products,
    internal_background,
  } = data.strapiBrand;

  const {
    rowShape,
    shapeColor,
    logoNormal,
    logoExpand,
    menuColor,
    menuHoverColor,
    contentColor,
    prodTextColor = "#000",
  } = brand_settings;

  const sorted_prod_ranges = useMemo(() => { // sort the product ranges by a custom sorting number
    if (!product_ranges.length) {
      return [];
    }
    return [...product_ranges]
      .map((el, i) => {
        el.initialSort = i;
        return el;
      })
      .sort((a, b) => {
        if (a.item_order === null && b.item_order === null) {
          return a.initialSort - b.initialSort;
        } else if (a.item_order === null || b.item_order === null) {
          return b.item_order - a.item_order;
        } else {
          return a.item_order - b.item_order;
        }
      });
  }, [product_ranges]);

  const sorted_products = useMemo(() => { // sort the products in a product range by a custom sorting number
    if (!products.length) {
      return [];
    }

    return [...products]
      .map((el, i) => {
        el.initialSort = i;
        return el;
      })
      .sort((a, b) => {
        if (a.item_order === null && b.item_order === null) {
          return a.initialSort - b.initialSort;
        } else if (a.item_order === null || b.item_order === null) {
          return b.item_order - a.item_order;
        } else {
          return a.item_order - b.item_order;
        }
      });
  }, [products]);

  const [rowState, setRowState] = useState("normal");
  const [brandState, setBrandState] = useState(0);
  const isDesktop = useMedia({
    query: "(min-width: 1366px)",
  });

  const mobHeaderBackground = {
    king: "#cbd1d7",
    corset: "#cbd1d7",
    merilyn: "#c8aabb",
    corsair: "#8c8f90",
    "best-man": "#264e7b",
  };

  const links = {
    king: {
      Corset: "/brand/corset",
      "Regional Brands": "/brands#regional-brands",
    },
    corset: {
      King: "/brand/king",
      "Regional Brands": "/brands#regional-brands",
    },
    regional: {
      King: "/brand/king",
      Corset: "/brand/corset",
      "Regional Brands": "/brands#regional-brands",
    },
  };

  const onChangeProdRange = (e) => {
    setBrandState(e.target.value);
  };
  return (
    <RowContext.Provider
      value={{
        rowState,
        setRowState,
        brandState,
        setBrandState,
        leftBarButton: "go-back",
      }}
    >
      <TouchOnly>
        <MobileHeader
          cssPosition="absolute"
          cssBackground={mobHeaderBackground[slug]}
        />
      </TouchOnly>
      <div
        className={classnames([
          "website-row",
          "single-brand",
          `shape-${rowShape}`,
          `state-${rowState}`,
          { "single-prod-range": sorted_prod_ranges.length === 1 },
        ])}
        css={brandRow}
      >
        <Background rowBackground={slug} imgBackground={internal_background} />
        {sorted_prod_ranges.length > 1 && ( // show the dropdown menu for product ranges for mobile only
          <MobileOnly>
            <div css={productRangeSelect({ prodTextColor })}>
              <div css={selectWrap}>
                <select onChange={onChangeProdRange}>
                  {sorted_prod_ranges.map((el, i) => (
                    <option key={el.id} value={i}>
                      {el.internalTitle}
                    </option>
                  ))}
                </select>
                <ChevronDown css={chDown} />
              </div>
              <p>* Select a different product range</p>
            </div>
          </MobileOnly>
        )}
        <Slider //the products slider
          brandState={brandState}
          prodRange={sorted_prod_ranges[brandState].id}
          products={sorted_products}
          prodTextColor={prodTextColor}
        />
        <Media
          query="(min-width: 1201px)"
          render={() => <Shape shape={rowShape} shapeColor={shapeColor} />}
        />
        {isDesktop && (
          <SiteLogo logos={{ normal: logoNormal, expanded: logoExpand }} />
        )}
        <Media
          query="(min-width: 1201px)"
          render={() => (
            <Content
              data={{
                contentColor,
                barColor: contentColor,
                brands: sorted_prod_ranges.map((el) => ({ title: el.title })),
                pr_text: sorted_prod_ranges[brandState].description,
                currLogo: alt_logo || logo,
                links: links[slug] ? links[slug] : links["regional"],
              }}
              template="productRanges"
            />
          )}
        />
        {isDesktop && (
          <Menu
            menuColor={menuColor}
            menuHoverColor={menuHoverColor}
            menuContentColor={menuColor}
          // onSubMenuClick={onSubMenuClick}
          />
        )}
      </div>
      <Media
        query="(max-width: 1200px)"
        render={() => (
          <>
            <MobileContent
              data={{
                contentColor,
                pr_text: sorted_prod_ranges[brandState].description,
                currLogo: alt_logo || logo,
                shapeColor,
                links: links[slug] ? links[slug] : links["regional"],
              }}
            />
            <Footer />
          </>
        )}
      />
    </RowContext.Provider>
  );
};

export default Brand;

export const query = graphql`query BrandTemplate($id: String!) {
  strapiBrand(id: {eq: $id}) {
    id
    slug
    title
    internal_background {
      localFile {
        childImageSharp {
          gatsbyImageData(quality: 95, placeholder: NONE, layout: FULL_WIDTH)
        }
      }
    }
    product_ranges {
      id
      internalTitle
      title
      description
      item_order
    }
    products {
      id
      sku
      product_range
      description
      item_order
      image {
        localFile {
          childImageSharp {
            prodImage: gatsbyImageData(
              height: 500
              quality: 90
              placeholder: NONE
              layout: FULL_WIDTH
            )
          }
        }
      }
    }
    logo {
      localFile {
        childImageSharp {
          brandLogo: gatsbyImageData(width: 350, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
    alt_logo {
      localFile {
        childImageSharp {
          brandLogo: gatsbyImageData(width: 350, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
    brand_settings {
      rowShape
      shapeColor
      logoNormal
      menuColor
      menuHoverColor
      contentColor
      prodTextColor
    }
  }
}
`;
