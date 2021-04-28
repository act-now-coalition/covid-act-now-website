import React from 'react';
import { Region, State, County, MetroArea } from 'common/regions';
import { isMultiStateMetro, getRegionName } from './utils';
import {
  RegionNameContainer,
  RegionNameText,
  MultiStateText,
} from './LocationName.style';

const LocationName: React.FC<{ region: Region }> = ({ region }) => {
  if (region instanceof State) {
    return (
      <RegionNameContainer>
        <RegionNameText>
          <strong>{getRegionName(region)}</strong>
        </RegionNameText>
      </RegionNameContainer>
    );
  } else if (region instanceof County) {
    const [countyName, countySuffix] = getRegionName(region);
    return (
      <RegionNameContainer>
        <RegionNameText>
          <strong>{countyName}</strong>
          {` ${countySuffix}, `}
          <strong>{region.state.stateCode}</strong>
        </RegionNameText>
      </RegionNameContainer>
    );
  } else if (region instanceof MetroArea) {
    const [metroName, metroSuffix] = getRegionName(region);
    if (isMultiStateMetro(region)) {
      return (
        <RegionNameContainer>
          <RegionNameText>
            <strong>{metroName}</strong>
            {` ${metroSuffix}`}
          </RegionNameText>
          <MultiStateText>{region.stateCodes}</MultiStateText>
        </RegionNameContainer>
      );
    } else {
      return (
        <RegionNameContainer>
          <RegionNameText>
            <strong>{`${metroName}, ${region.stateCodes}`}</strong>
            {` ${metroSuffix}`}
          </RegionNameText>
        </RegionNameContainer>
      );
    }
  } else {
    return null;
  }
};

export default LocationName;
