import React, { Fragment } from 'react';
import { Region } from 'common/regions';
import { getPageTitle } from './utils';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { useProjectionsFromRegion } from 'common/utils/model';

const RegionPage: React.FC<{ region: Region }> = ({ region }) => {
  const pageTitle = getPageTitle(region);
  const canonicalUrl = region.canonicalUrl;
  const projections = useProjectionsFromRegion(region);

  if (!projections) {
    return null;
  }

  const projection = projections.primary;

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
