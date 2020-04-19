import React from 'react';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import { COLORS } from 'enums';
import { useEmbed } from 'utils/hooks';

import {
  HeaderHighlight,
  HeaderTitle,
  HeaderSubCopy,
  StyledStateImageWrapper,
  StyledStateCopyWrapper,
  StyledStateHeaderWrapper,
  StyledStateHeaderInner,
} from './StateHeader.style';

const StateHeader = ({ interventions }) => {
  const { isEmbed } = useEmbed();

  const buildInterventionTitle = () => {
    return (
      <HeaderHighlight color={interventions.getThresholdInterventionLevel()}>
        {interventions.getInterventionTitle()}
      </HeaderHighlight>
    );
  };

  const buildPredection = () => {
    return interventions.getInterventionPrediction();
  };

  return (
    <StyledStateHeaderWrapper condensed={isEmbed}>
      <StyledStateHeaderInner condensed={isEmbed}>
        <StyledStateImageWrapper>
          <StateCircleSvg
            actionBackgroundFill={COLORS.LIGHTGRAY}
            state={interventions.stateCode}
            fillColor={interventions.getThresholdInterventionLevel()}
            hasAction={true}
          />
        </StyledStateImageWrapper>
        <StyledStateCopyWrapper>
          <div>
            <HeaderTitle>{buildInterventionTitle()}</HeaderTitle>
            {!isEmbed && buildPredection()}
            {interventions.isCounty && !isEmbed && (
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
      </StyledStateHeaderInner>
    </StyledStateHeaderWrapper>
  );
};

export default StateHeader;
