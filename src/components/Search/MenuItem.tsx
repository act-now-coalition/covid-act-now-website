import React from 'react';
import ShortNumber from 'common/utils/ShortNumber';
import {
  MenuItemWrapper,
  LocationName,
  Zipcode,
  StyledLink,
} from './Search.style';
import { Region, MetroArea } from 'common/regions';
import MenuItemIcon from './MenuItemIcon';

const MenuItem: React.FC<{ region: Region; zipCodeInput: string }> = ({
  region,
  zipCodeInput,
}) => {
  const locationLabel = getOptionLabel(region);
  return (
    <StyledLink to={region.relativeUrl}>
      <MenuItemWrapper>
        <MenuItemIcon region={region} />
        <div>
          <LocationName>{locationLabel}</LocationName>
          {zipCodeInput && <Zipcode>contains zipcode {zipCodeInput}</Zipcode>}
          <div>
            <span>{ShortNumber(region.population)} residents</span>
          </div>
        </div>
      </MenuItemWrapper>
    </StyledLink>
  );
};

export function getOptionLabel(region: Region) {
  return region instanceof MetroArea
    ? `${region.shortName}, ${region.stateCodes}`
    : region.shortName;
}

export default MenuItem;
