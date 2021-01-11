import React from 'react';
import { getMapImageUrl } from 'common/urls';
import { Helmet } from 'react-helmet';

const HomepageStructuredData: React.FC = () => {
  const jsonData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: getMapImageUrl(),
    width: 1200,
    height: 630,
  });

  return (
    <Helmet>
      <script type="application/ld+json">{jsonData}</script>
    </Helmet>
  );
};

export default HomepageStructuredData;
