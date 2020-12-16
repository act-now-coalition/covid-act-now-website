import React from 'react';
import ShortNumber from 'common/utils/ShortNumber';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import {
  MenuItemWrapper,
  IconWrapper,
  LocationName,
  Zipcode,
  StyledLink,
} from './Search.style';
import { getStateIconFillColor } from 'components/Search';
import { getStateCode, State, County, Region } from 'common/regions';

const MenuItem: React.FC<{ region: Region; zipCodeInput: string }> = ({
  region,
  zipCodeInput,
}) => {
  return (
    <StyledLink to={`/${region.relativeUrl}`}>
      <MenuItemWrapper>
        {/* TODO (chelsi): fix once figured out metro icon/svg */}
        {(region instanceof State || region instanceof County) && (
          <IconWrapper>
            <StateCircleSvg
              ratio={0.8}
              fillColor={getStateIconFillColor(region)}
              state={getStateCode(region)}
            />
          </IconWrapper>
        )}
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
