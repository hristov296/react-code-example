import React from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

const SiteMetadata = ({ pathname, title, description, keywords, lang }) => {
  const {
    site_title: { option_value: siteTitle },
    site_url: { option_value: siteUrl },
  } = useStaticQuery(graphql`
    query SiteMetadata {
      site_title: strapiOption(option_id: { eq: "site_title" }) {
        option_value
      }
      site_url: strapiOption(option_id: { eq: "site_url" }) {
        option_value
      }
    }
  `);

  return (
    <Helmet
      defer={false}
      htmlAttributes={{
        lang,
      }}
      title={title}
      defaultTitle={siteTitle}
      titleTemplate={`%s | ${siteTitle}`}
      meta={[
        {
          name: "description",
          content: description,
        },
        {
          name: "keywords",
          content: keywords,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:creator`,
          content: "Website Author",
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ]}
    >
      <html lang="en" />
      <link rel="canonical" href={`${siteUrl}${pathname}`} />
      {/* <link
        rel="preload"
        as="font"
        href="/fonts/IdealistSansLight.woff2"
        type="font/woff2"
        crossOrigin
      /> */}
      {/* <link
        rel="preload"
        as="font"
        href="/fonts/IdealistSansLight.woff"
        type="font/woff"
        crossOrigin="anonymous"
      /> */}
      <meta name="docsearch:version" content="2.0" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Oswald:300,600&display=block"
        rel="stylesheet"
      ></link>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#00aba9" />
      <meta name="theme-color" content="#1c1c1c" />
      <meta name="msapplication-navbutton-color" content="#1c1c1c" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#1c1c1c" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en" />
      <meta property="og:site_name" content={title} />
      {/* <meta property="og:image" content={`${siteUrl}`} /> */}
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />

      <meta name="twitter:card" content="summary" />
      {/* <meta name="twitter:site" content={twitter} /> */}
      {
        <script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          async
          defer
        />
      }
    </Helmet>
  );
};

export default SiteMetadata;
