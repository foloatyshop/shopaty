import React from "react";
import Script from "next/script";

const GoogleAnalytics: React.FC = () => {
  return (
    <React.Fragment>
      {/* Google analytics */}
      {/* <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-VDHGC7YGZ0"
        strategy="lazyOnload"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-VDHGC7YGZ0');
    `,
        }}
      /> */}
    </React.Fragment>
  );
};

export default GoogleAnalytics;
