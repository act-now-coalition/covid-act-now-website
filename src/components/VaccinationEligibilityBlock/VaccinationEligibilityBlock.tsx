import React from 'react';
import { Region } from 'common/regions';
import { Heading2 } from 'components/Markdown';
import { getEligibilityInfo, getRegionState } from './utils';
import {
  Container,
  Section,
  LinksDescription,
  EligibleList,
  EligibleListContainer,
} from './VaccinationEligibilityBlock.style';
import ButtonBlock from './ButtonBlock';

const VaccinationEligibilityBlock: React.FC<{ region: Region }> = ({
  region,
}) => {
  const state = getRegionState(region);

  // If we don't have vaccination information for a given state, we fallback to
  // show the eligibility links.
  const eligibilityData = state && getEligibilityInfo(state);

  return (
    <Container>
      <Heading2 style={{ marginTop: 0 }}>Vaccine eligibility</Heading2>
      <Section>
        <EligibleListContainer>
          <EligibleList>
            <li>Individuals 12+</li>
          </EligibleList>
        </EligibleListContainer>
      </Section>
      <Section>
        <LinksDescription>
          Find your vaccine and other information from these official sources:
        </LinksDescription>
        <ButtonBlock
          stateVaccinationUrl={eligibilityData?.stateVaccinationUrl}
          stateCode={state?.stateCode}
          sourceName={eligibilityData?.sourceName}
        />
      </Section>
    </Container>
  );
};

export default VaccinationEligibilityBlock;
