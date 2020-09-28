import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { getCountyByUrlName, getStateByUrlName } from 'common/locations';
import LocationPage from './LocationPage';

interface LocationPageUrlParams {
  stateId: string;
  countyId: string | undefined;
}

const LocationRouter: React.FC = () => {
  let { stateId, countyId } = useParams<LocationPageUrlParams>();
  const state = getStateByUrlName(stateId);
  const countyOption = countyId && getCountyByUrlName(countyId);

  // The URL parameters don't correspond to a valid state or county, we
  // redirect the user to the homepage
  const isValidLocation = state && !(countyId && !countyOption);

  return isValidLocation ? <LocationPage /> : <Redirect to="/" />;
};

export default LocationRouter;
