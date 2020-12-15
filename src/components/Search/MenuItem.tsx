import React from 'react';
import ShortNumber from 'common/utils/ShortNumber';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import {
  MenuItemWrapper,
  IconWrapper,
  LocationName,
  Zipcode,
} from './Search.style';
import { Region } from 'common/regions';
import { getStateIconFillColor } from './utils';
import { getStateCode } from 'common/regions';

const MenuItem = (props: { region: Region; isZip: boolean; input: string }) => {
  const { region, isZip, input } = props;

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
        <LocationName>{region.shortName}</LocationName>
        {isZip && <Zipcode>contains zipcode {input}</Zipcode>}
        <div>
          <span>{ShortNumber(region.population)} residents</span>
        </div>
      </div>
    </MenuItemWrapper>
  );
};

export default MenuItem;
