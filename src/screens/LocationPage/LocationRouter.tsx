import React from 'react';
import { Redirect } from 'react-router-dom';
import { RegionContext, RegionType, useRegionFromParams } from 'common/regions';
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
      <LocationPage region={region} />
    </RegionContext.Provider>
  );
};

export default LocationRouter;
