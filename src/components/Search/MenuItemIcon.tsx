import React from 'react';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import { IconWrapper } from './Search.style';
import { getLocationIconFillColor } from 'components/Search';
import { getStateCode, State, County, MetroArea, Region } from 'common/regions';
import MetroItemIcon from './MetroItemIcon';

const MenuItemIcon: React.FC<{ region: Region }> = ({ region }) => {
  const fillColor = getLocationIconFillColor(region);
  if (region instanceof State || region instanceof County) {
    return (
      <IconWrapper>
        <StateCircleSvg
          ratio={0.8}
          fillColor={fillColor}
          state={getStateCode(region)}
        />
      </IconWrapper>
    );
  } else if (region instanceof MetroArea) {
    return (
      <IconWrapper>
        <MetroItemIcon ratio={0.8} fillColor={fillColor} />
      </IconWrapper>
    );
  } else {
    return null;
  }
};

export default MenuItemIcon;
