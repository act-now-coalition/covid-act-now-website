import React from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import { RegionType } from 'common/regions';
import LocationPage from './LocationPage';
import { useFipsFromParams } from 'common/regions/useFipsFromParams';
import { findStateByStateCodeStrict } from 'common/regions/statesByFips';

const LocationRouter: React.FC = () => {
  const { stateId, countyId } = useParams<{
    stateId?: string;
    countyId?: string;
  }>();
  const fips = useFipsFromParams();

  if (!fips) {
    return <Redirect to="/" />;
  }

  // Redirects deprecated URLs (/us/ca and us/ca/county/kern_county) to prompt
  // Google to update the canonical URL for location pages
  if (stateId?.length === 2) {
    const state = findStateByStateCodeStrict(stateId!.toUpperCase());
    let newUrl = `${state.relativeUrl}`;
    if (countyId) {
      newUrl += `/county/${countyId}`;
    }
    return <Redirect to={newUrl} />;
  }

  return <LocationPage fips={fips} />;
};

export default LocationRouter;
