import React from 'react';
import { getMapImageUrl } from 'common/urls';
import { Helmet } from 'react-helmet';
import urlJoin from 'url-join';
const canLogo = '/assets/images/covid-act-now-logo.png';

const HomepageStructuredData: React.FC = () => {
  const canLogoUrl = urlJoin('https://covidactnow.org', canLogo);

  const imageData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: getMapImageUrl(),
    width: 1200,
    height: 630,
  });

  const organizationData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Covid Act Now',
    url: canLogoUrl,
    logo:
      'https://covidactnow.org/static/media/covid-act-now-logo.0ac0983b.png',
  });

  return (
    <Helmet>
      <script type="application/ld+json">{imageData}</script>
      <script type="application/ld+json">{organizationData}</script>
    </Helmet>
  );
};

export default HomepageStructuredData;
