import React from 'react';
import ShortNumber from 'common/utils/ShortNumber';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import { StyledResultsMenuSubText } from 'components/MapSelectors/MapSelectors.style';
import { MenuItemWrapper, IconWrapper, LocationName } from './Search.style';
import { Region } from 'common/regions';
import { getStateIconFillColor } from './utils';
import { getStateCode } from 'common/regions';

const MenuItem = (props: { region: Region }) => {
  const { region } = props;

  return (
    <MenuItemWrapper>
      <IconWrapper>
        <StateCircleSvg
          ratio={0.8}
          fillColor={getStateIconFillColor(region)}
          state={getStateCode(region)}
        />
      </IconWrapper>
      <div>
        <LocationName>{region.name}</LocationName>
        <StyledResultsMenuSubText>
          <span>{ShortNumber(region.population)} residents</span>
        </StyledResultsMenuSubText>
      </div>
    </MenuItemWrapper>
  );
};

export default MenuItem;
