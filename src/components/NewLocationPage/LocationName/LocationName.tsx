import React from 'react';
import { Region, State, County, MetroArea } from 'common/regions';
import { inMultipleStates, getRegionName } from './utils';

const LocationName: React.FC<{ region: Region }> = ({ region }) => {
  if (region instanceof State) {
    return <strong>{getRegionName(region)}</strong>;
  } else if (region instanceof County) {
    const [countyName, countySuffix] = getRegionName(region);
    return (
      <div>
        <strong>{countyName}</strong>
        {` ${countySuffix}, ${region.state.stateCode}`}
      </div>
    );
  } else if (region instanceof MetroArea) {
    const [metroName, metroSuffix] = getRegionName(region);
    if (inMultipleStates(region)) {
      return (
        <div>
          <div>
            <strong>{metroName}</strong>
            {` ${metroSuffix}`}
          </div>
          {region.stateCodes}
        </div>
      );
    } else {
      return (
        <div>
          <strong>{`${metroName}, ${region.stateCodes}`}</strong>
          {` ${metroSuffix}`}
        </div>
      );
    }
  } else {
    return null;
  }
};

export default LocationName;
