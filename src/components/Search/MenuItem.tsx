import React from 'react';
import ShortNumber from 'common/utils/ShortNumber';
import {
  MenuItemWrapper,
  LocationName,
  Zipcode,
  StyledLink,
} from './Search.style';
import { Region } from 'common/regions';
import MenuItemIcon from './MenuItemIcon';

const MenuItem: React.FC<{ region: Region; zipCodeInput: string }> = ({
  region,
  zipCodeInput,
}) => {
  return (
    <StyledLink to={region.relativeUrl}>
      <MenuItemWrapper>
        <MenuItemIcon region={region} />
        <div>
          <LocationName>{region.shortName}</LocationName>
          {zipCodeInput && <Zipcode>contains zipcode {zipCodeInput}</Zipcode>}
          <div>
            <span>{ShortNumber(region.population)} residents</span>
          </div>
        </div>
      </MenuItemWrapper>
    </StyledLink>
  );
};

export default MenuItem;
