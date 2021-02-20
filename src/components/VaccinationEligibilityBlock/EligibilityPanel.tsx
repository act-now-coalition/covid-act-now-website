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
  stateName: string;
}> = ({ phaseList, currentlyEligible, stateName }) => {
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
      {phaseList.length === 0 && (
        <PhaseDescription
          source={`${stateName} is still deciding future eligibility phases`}
          $currentlyEligible={false}
        />
      )}
    </StyledEligibilityPanel>
  );
};

export default EligibilityPanel;
