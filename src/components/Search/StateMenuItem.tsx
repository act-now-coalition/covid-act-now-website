import React from 'react';
import ShortNumber from 'common/utils/ShortNumber';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import { stateColor } from 'common/colors';
import { StyledResultsMenuSubText } from 'components/MapSelectors/MapSelectors.style';
import { MenuItemWrapper, IconWrapper } from './Search.style';

const StateMenuItem = (props: { region: any }) => {
  const { region } = props;
  const fillColor = stateColor(region.stateCode);

  return (
    <MenuItemWrapper>
      <IconWrapper>
        <StateCircleSvg
          ratio={0.8}
          fillColor={fillColor}
          state={region.stateCode}
          actionBackgroundFill="#FFFFFF"
        />
      </IconWrapper>
      <div>
        <div>{region.name}</div>
        <StyledResultsMenuSubText>
          <span>{ShortNumber(region.population)} residents</span>
        </StyledResultsMenuSubText>
      </div>
    </MenuItemWrapper>
  );
};

export default StateMenuItem;
