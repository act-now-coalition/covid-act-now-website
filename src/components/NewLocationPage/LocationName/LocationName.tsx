import React from 'react';
import { Region, State, County, MetroArea } from 'common/regions';
import { inMultipleStates, getRegionName } from './utils';
import {
  RegionContainer,
  RegionNameText,
  MultiStateText,
} from './LocationName.style';

const LocationName: React.FC<{ region: Region }> = ({ region }) => {
  if (region instanceof State) {
    return (
      <RegionContainer>
        <RegionNameText>
          <strong>{getRegionName(region)}</strong>
        </RegionNameText>
      </RegionContainer>
    );
  } else if (region instanceof County) {
    const [countyName, countySuffix] = getRegionName(region);
    return (
      <RegionContainer>
        <RegionNameText>
          <strong>{countyName}</strong>
          {` ${countySuffix}, `}
          <strong>{region.state.stateCode}</strong>
        </RegionNameText>
      </RegionContainer>
    );
  } else if (region instanceof MetroArea) {
    const [metroName, metroSuffix] = getRegionName(region);
    if (inMultipleStates(region)) {
      return (
        <RegionContainer>
          <RegionNameText>
            <strong>{metroName}</strong>
            {` ${metroSuffix}`}
          </RegionNameText>
          <MultiStateText>{region.stateCodes}</MultiStateText>
        </RegionContainer>
      );
    } else {
      return (
        <RegionContainer>
          <RegionNameText>
            <strong>{`${metroName}, ${region.stateCodes}`}</strong>
            {` ${metroSuffix}`}
          </RegionNameText>
        </RegionContainer>
      );
    }
  } else {
    return null;
  }
};

export default LocationName;
