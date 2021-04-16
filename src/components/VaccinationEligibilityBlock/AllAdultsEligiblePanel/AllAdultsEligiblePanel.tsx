import React from 'react';
import {
  Section,
  PhaseDescription,
  PhaseTitle,
} from '../VaccinationEligibilityBlock.style';
import { Container as AllEligibleContainer } from './AllAdultsEligiblePanel.style';

const AllAdultsEligiblePanel = () => {
  return (
    <>
      <Section>
        <AllEligibleContainer>
          <PhaseTitle>All adults</PhaseTitle>
          <PhaseDescription
            source={'* Individuals 16+'}
            $currentlyEligible={true}
          />
        </AllEligibleContainer>
      </Section>
    </>
  );
};

export default AllAdultsEligiblePanel;
