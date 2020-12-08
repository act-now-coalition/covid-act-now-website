import React, { Fragment } from 'react';
import { Region, State, County } from 'common/regions';

const LocationPageHeading: React.FC<{ region: Region }> = ({ region }) => {
  if (region instanceof State) {
    return <strong>{region.name}</strong>;
  }

  if (region instanceof County) {
    return (
      <Fragment>
        <strong>{region.name}, </strong>
        {region.state.stateCode}
      </Fragment>
    );
  }

  return null;
};

export default LocationPageHeading;
