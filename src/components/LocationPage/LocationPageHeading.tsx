import React, { Fragment } from 'react';
import { Region, State, County, MetroArea } from 'common/regions';
import { HeaderStateCode } from './LocationPageHeader.style';

const LocationPageHeading: React.FC<{ region: Region; isEmbed: boolean }> = ({
  region,
  isEmbed,
}) => {
  if (region instanceof State) {
    return <strong>{region.name}</strong>;
  } else if (region instanceof County) {
    return (
      <Fragment>
        <strong>{region.name}</strong>
        {', '}
        <HeaderStateCode>
          <a href={`${isEmbed ? '/embed' : ''}/us/${region.state.urlSegment}`}>
            {region.state.stateCode}
          </a>
        </HeaderStateCode>
      </Fragment>
    );
  } else if (region instanceof MetroArea) {
    return (
      <Fragment>
        <strong>{region.name}</strong>
        {', '}
        <HeaderStateCode>{region.stateCodes}</HeaderStateCode>
      </Fragment>
    );
  } else {
    return null;
  }
};

export default LocationPageHeading;
