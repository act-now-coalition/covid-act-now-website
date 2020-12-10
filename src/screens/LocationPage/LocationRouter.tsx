import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import regions, {
  RegionContext,
  RegionType,
  useRegionFromParams,
} from 'common/regions';
import LocationPage from './LocationPage';
import RegionPage from './RegionPage';

const LocationRouter: React.FC = () => {
  const region = useRegionFromParams();

  if (!region) {
    return <Redirect to="/" />;
  }

  // TODO: We will centralize this, this is only used during development
  return (
    <RegionContext.Provider value={region}>
      {region.regionType === RegionType.MSA ? (
        <RegionPage region={region} />
      ) : (
        <LocationPage region={region} />
      )}
    </RegionContext.Provider>
  );
};

export default LocationRouter;
