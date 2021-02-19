import React, { Fragment } from 'react';
import { RegionPhaseGroup } from 'cms-content/vaccines/phases';
import { getPhaseName } from './utils';
import {
  PhaseDescription,
  StyledEligibilityPanel,
  StartDate,
  PhaseTitle,
} from './VaccinationEligibilityBlock.style';

const EligibilityPanel: React.FC<{
  phaseList: RegionPhaseGroup[];
  currentlyEligible: boolean;
}> = ({ phaseList, currentlyEligible }) => {
  const showStartingDate = !currentlyEligible;
  return (
    <StyledEligibilityPanel>
      {phaseList.map((phaseInfo, index) => (
        <Fragment key={`phase-${index}`}>
          <PhaseTitle>{getPhaseName(phaseInfo)}</PhaseTitle>
          {showStartingDate && phaseInfo.startDate && (
            <StartDate>{phaseInfo.startDate}</StartDate>
          )}
          <PhaseDescription
            source={phaseInfo.description}
            $currentlyEligible={currentlyEligible}
          />
        </Fragment>
      ))}
    </StyledEligibilityPanel>
  );
};

export default EligibilityPanel;
