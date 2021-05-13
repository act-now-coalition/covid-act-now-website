import React from 'react';
import { Region } from 'common/regions';
import { assert } from 'common/utils';
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
  assert(state, `Couldn't find a state for region ${region.fipsCode}`);

  // If we don't have vaccination information for a given state, we fallback to
  // show the eligibility links.
  const eligibilityData = getEligibilityInfo(state);
  const { sourceName, stateVaccinationUrl } = eligibilityData;

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
          stateVaccinationUrl={stateVaccinationUrl}
          stateCode={state.stateCode}
          sourceName={sourceName}
        />
      </Section>
    </Container>
  );
};

export default VaccinationEligibilityBlock;
