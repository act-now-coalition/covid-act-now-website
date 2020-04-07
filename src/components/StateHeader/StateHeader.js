import React from 'react';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import { COLORS } from 'enums';
import { useEmbed } from 'utils/hooks';

import {
  HeaderHighlight,
  HeaderTitle,
  StyledStateImageWrapper,
  StyledStateCopyWrapper,
  StyledStateHeaderWrapper,
  StyledStateHeaderInner,
} from './StateHeader.style';

const StateHeader = ({ interventions }) => {
  const { isEmbed } = useEmbed();

  const buildInterventionTitle = () => {
    return (
      <HeaderHighlight color={interventions.getInterventionColor()}>
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
            fillColor={interventions.getInterventionColor()}
            hasAction={true}
          />
        </StyledStateImageWrapper>
        <StyledStateCopyWrapper>
          <div>
            <HeaderTitle>{buildInterventionTitle()}</HeaderTitle>
            {!isEmbed && buildPredection()}
          </div>
        </StyledStateCopyWrapper>
      </StyledStateHeaderInner>
    </StyledStateHeaderWrapper>
  );
};

export default StateHeader;
