import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import regions, { RegionContext } from 'common/regions';
import LocationPage from './LocationPage';

interface LocationPageUrlParams {
  stateId: string;
  countyId: string | undefined;
  chartId?: string;
}

const LocationRouter: React.FC = () => {
  let { stateId, countyId, chartId } = useParams<LocationPageUrlParams>();

  const state = regions.findStateByUrlParams(stateId);
  const county = countyId
    ? regions.findCountyByUrlParams(stateId, countyId)
    : null;
  const region = county || state;

  if (!region) {
    return <Redirect to="/" />;
  }

  return (
    <RegionContext.Provider value={region}>
      <LocationPage region={region} chartId={chartId || ''} />
    </RegionContext.Provider>
  );
};

export default LocationRouter;
