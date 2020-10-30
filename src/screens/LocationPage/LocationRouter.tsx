import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import {
  getCbsaByUrlName,
  getCountyByUrlName,
  getStateByUrlName,
} from 'common/locations';
import LocationPage from './LocationPage';

interface LocationPageUrlParams {
  stateId: string;
  countyId: string | undefined;
  cbsaId: string | undefined;
}

const LocationRouter: React.FC = () => {
  let { stateId, countyId, cbsaId } = useParams<LocationPageUrlParams>();

  const state = getStateByUrlName(stateId);
  const countyOption =
    countyId && getCountyByUrlName(state?.state_code, countyId);

  const cbsaOption = cbsaId && getCbsaByUrlName(cbsaId);

  // The URL parameters don't correspond to a valid state or county, we
  // redirect the user to the homepage
  const isValidLocation =
    state && !(countyId && !countyOption) && !(cbsaId && !cbsaOption);

  return isValidLocation ? <LocationPage /> : <Redirect to="/" />;
};

export default LocationRouter;
