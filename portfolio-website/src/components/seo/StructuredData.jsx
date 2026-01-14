import React from "react";
import { Helmet } from "react-helmet-async";
import { settings } from "../../data/seedSettings";

const StructuredData = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.personalInfo.fullName,
    jobTitle: settings.personalInfo.title,
    url: "https://arbabofc-prvt.web.app",
    email: settings.personalInfo.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "India",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

export default StructuredData;
