import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import regions, { RegionContext } from 'common/regions';
import LocationPage from './LocationPage';
import RegionPage from './RegionPage';

interface LocationPageUrlParams {
  stateId: string | undefined;
  countyId: string | undefined;
  metroAreaUrlSegment: string | undefined;
}

const LocationRouter: React.FC = () => {
  let { stateId, countyId, metroAreaUrlSegment } = useParams<
    LocationPageUrlParams
  >();

  const state = stateId ? regions.findStateByUrlParams(stateId) : null;
  const county =
    stateId && countyId
      ? regions.findCountyByUrlParams(stateId, countyId)
      : null;

  const metroArea = metroAreaUrlSegment
    ? regions.findMetroAreaByUrlParams(metroAreaUrlSegment)
    : null;

  if (metroArea) {
    return (
      <RegionContext.Provider value={metroArea}>
        <RegionPage region={metroArea} />
      </RegionContext.Provider>
    );
  }

  const region = county || state;

  if (!region) {
    return <Redirect to="/" />;
  }

  return (
    <RegionContext.Provider value={region}>
      <LocationPage region={region} />
    </RegionContext.Provider>
  );
};

export default LocationRouter;
