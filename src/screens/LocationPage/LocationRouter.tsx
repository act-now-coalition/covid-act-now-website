import React from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import { useRegionFromParams, State, County } from 'common/regions';
// import LocationPage from './LocationPage';
import WithSearchInNav from './WithSearchInNav';

const LocationRouter: React.FC = () => {
  const { stateId } = useParams<{
    stateId?: string;
  }>();
  const region = useRegionFromParams();

  if (!region) {
    return <Redirect to="/" />;
  }

  // Redirects deprecated URLs (/us/ca and us/ca/county/kern_county) to prompt
  // Google to update the canonical URL for location pages
  const isDeprecatedUrl =
    stateId?.length === 2 &&
    (region instanceof State || region instanceof County);

  if (isDeprecatedUrl) {
    return <Redirect to={region.relativeUrl} />;
  }

  return <WithSearchInNav region={region} />;
};

export default LocationRouter;
