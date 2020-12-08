import React, { Fragment } from 'react';
import { Region, State, County } from 'common/regions';

const LocationPageHeading: React.FC<{ region: Region; isEmbed: boolean }> = ({
  region,
  isEmbed,
}) => {
  if (region instanceof State) {
    return <strong>{region.name}</strong>;
  } else if (region instanceof County) {
    return (
      <Fragment>
        <strong>{region.name}, </strong>
        <a href={`${isEmbed ? '/embed' : ''}/us/${region.state.urlSegment}`}>
          {region.state.stateCode}
        </a>
      </Fragment>
    );
  } else {
    return null;
  }
};

export default LocationPageHeading;
