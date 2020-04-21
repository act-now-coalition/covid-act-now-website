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
  HeaderSubCopy,
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
            {projections.isCounty && !isEmbed && (
              <HeaderSubCopy>
                <strong>County data is currently in beta. </strong>
                <span>
                  Because counties don’t report hospitalizations, our forecasts
                  may not be as accurate. See something wrong?{' '}
                </span>
                <a
                  href="https://forms.gle/NPsLcFnrvfS1kqkn9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Please let us know.
                </a>
              </HeaderSubCopy>
            )}
          </div>
        </StyledStateCopyWrapper>
      </StyledLocationPageHeaderInner>
    </StyledLocationPageHeaderWrapper>
  );
};

export default LocationPageHeader;
