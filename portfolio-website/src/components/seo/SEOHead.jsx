import React from "react";
import { Helmet } from "react-helmet-async";
import { settings } from "../../data/seedSettings";

const SEOHead = ({ title, description, url, image }) => {
  const metaTitle = title ? `${title} | ${settings.seo.siteName}` : settings.seo.siteName;
  const metaDescription = description || settings.seo.siteDescription;
  const ogImage = image || settings.seo.ogImage || "/logo.svg";

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={settings.seo.keywords.join(", ")} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEOHead;
