import React from 'react';
import { Container } from './VaccinationEligibilityBlock.style';
import { Heading2, Paragraph } from 'components/Markdown';
import { Region, getStateName } from 'common/regions';
import { getEligibilityInfo } from './utils';

const VaccinationEligibilityBlock: React.FC<{ region: Region }> = ({
  region,
}) => {
  const stateName = getStateName(region);
  const eligibilityData = getEligibilityInfo(region);
  // TODO: Handle case where no phases are currently eligible
  const currentPhaseName = eligibilityData.mostRecentPhase?.title;
  return (
    <Container>
      <Heading2>Vaccine eligibility</Heading2>
      <Paragraph>
        {stateName} is currently in <strong>{currentPhaseName}</strong>.{' '}
        Eligibility varies throughout {stateName}, so you may also want to check
        your county or city’s health department website.
      </Paragraph>
      {/* Tabs */}
      {/* Buttons */}
      {/* Source */}
    </Container>
  );
};

export default VaccinationEligibilityBlock;
