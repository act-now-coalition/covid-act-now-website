import React from 'react';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import { COLORS } from 'enums';
import { useEmbed } from 'utils/hooks';

import {
  HeaderHighlight,
  HeaderTitle,
  StyledStateImageWrapper,
  StyledStateCopyWrapper,
  StyledLocationPageHeaderWrapper,
  StyledLocationPageHeaderInner,
} from './LocationPageHeader.style';

const LocationPageHeader = ({ projections }) => {
  const { isEmbed } = useEmbed();

  return (
    <StyledLocationPageHeaderWrapper condensed={isEmbed}>
      <StyledLocationPageHeaderInner condensed={isEmbed}>
        <StyledStateImageWrapper>
          <StateCircleSvg
            actionBackgroundFill={COLORS.LIGHTGRAY}
            state={projections.stateCode}
            fillColor={projections.getAlarmLevelColor()}
            hasAction={true}
          />
        </StyledStateImageWrapper>
        <StyledStateCopyWrapper>
          <div>
            <HeaderTitle>
              <HeaderHighlight color={projections.getAlarmLevelColor()}>
                {projections.getHeading()}
              </HeaderHighlight>
            </HeaderTitle>
            {!isEmbed && projections.getSummary()}
          </div>
        </StyledStateCopyWrapper>
      </StyledLocationPageHeaderInner>
    </StyledLocationPageHeaderWrapper>
  );
};

export default LocationPageHeader;
