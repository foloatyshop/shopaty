import React from "react";

const OpenGraphTags: React.FC = () => {
  return (
    <React.Fragment>
      <meta
        property="og:url"
        content="https://folostudio.com"
      />
      {/* thumbnail And title for social media */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="ATý Shop" />
      <meta
        property="og:description"
        content="Buôn bán mặt hàng nông sản sạch"
      />
      <meta property="og:image" content="/assets/images/logohome.jpg" />
    </React.Fragment>
  );
};

export default OpenGraphTags;
