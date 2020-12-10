import React, { Fragment } from 'react';
import { Region } from 'common/regions';
import { getPageTitle } from './utils';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';

const RegionPage: React.FC<{ region: Region }> = ({ region }) => {
  const pageTitle = getPageTitle(region);
  const canonicalUrl = region.canonicalUrl;

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl={canonicalUrl}
        pageTitle={pageTitle}
        pageDescription={''}
      />
      <h1>{region.fullName}</h1>
    </Fragment>
  );
};

export default RegionPage;
