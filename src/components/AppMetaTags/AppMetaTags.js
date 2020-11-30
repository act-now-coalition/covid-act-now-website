import React from 'react';
import { Helmet } from 'react-helmet';
import { getMapImageUrl } from 'common/urls';

/**
 * public/index.html contains meta tags for the home page. Every non-home page
 * will contain react-helmet tags to override the meta tags for the home page.
 * This component helps manage the per-page meta tags.
 *
 * TypeScript definition for props:
 * @param {{canonicalUrl: string, pageTitle?: string, pageDescription: string, shareTitle?: string, shareDescription?: string}} props
 */
export default function AppMetaTags({
  canonicalUrl,
  pageTitle,
  pageDescription,
}) {
  let fullPageTitle = pageTitle
    ? [pageTitle, 'Covid Act Now'].join(' - ')
    : 'Covid Act Now';
  let fullCanonicalUrl = new URL(canonicalUrl, 'https://covidactnow.org/').href;

  return (
    <Helmet>
      {/* Keep these in sync with the meta tags marked data-react-helmet in public/index.html! */}
      <title>{fullPageTitle}</title>
      <link rel="canonical" href={fullCanonicalUrl} />
      <meta name="description" content={pageDescription} />
      {canonicalUrl === '/' && <meta name="image" content={getMapImageUrl()} />}
    </Helmet>
  );
}
