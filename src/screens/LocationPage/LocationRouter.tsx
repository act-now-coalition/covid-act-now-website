import React from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import regions, {
  findStateByStateCode,
  useFipsFromParams,
} from 'common/regions';
import LocationPage from './LocationPage';

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
  const isDeprecatedUrl = stateId?.length === 2;
  if (isDeprecatedUrl && stateId) {
    const stateUrlSegment = findStateByStateCode(stateId)?.urlSegment;
    let url = `/us/${stateUrlSegment}`;
    if (countyId) {
      url = `${url}/county/${countyId}`;
    }
    return <Redirect to={url} />;
  }

  // breaking this out to the location page itself will be a good follow-on step
  const region = regions.findByFipsCodeStrict(fips);
  return <LocationPage region={region} />;
};

export default LocationRouter;
