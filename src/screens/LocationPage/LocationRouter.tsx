import React from 'react';
import { Redirect } from 'react-router-dom';
import { useRegionFromParams } from 'common/regions';
import LocationPage from './LocationPage';

const LocationRouter: React.FC = () => {
  const region = useRegionFromParams();
  if (!region) {
    return <Redirect to="/" />;
  }

  return <LocationPage region={region} />;
};

export default LocationRouter;
