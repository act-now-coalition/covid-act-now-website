import React from 'react';
import { Region, getStateName } from 'common/regions';
import ExternalLink from 'components/ExternalLink';
import { Heading2, Paragraph } from 'components/Markdown';
import { trackEvent, EventCategory, EventAction } from 'components/Analytics';
import { getEligibilityInfo } from './utils';
import {
  Container,
  Section,
  Source,
} from './VaccinationEligibilityBlock.style';

const VaccinationEligibilityBlock: React.FC<{ region: Region }> = ({
  region,
}) => {
  // TODO: Assert that the region is a county, state or a single-state metro
  const stateName = getStateName(region);
  const eligibilityData = getEligibilityInfo(region);
  const { sourceName, sourceUrl } = eligibilityData;
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
      <Section>{/* Tabs */}</Section>
      <Section>{/* Buttons */}</Section>
      <Section>
        <Source>
          Source:{' '}
          <ExternalLink
            href={sourceUrl}
            onClick={() => trackSourceClick(region)}
          >
            {sourceName}
          </ExternalLink>
        </Source>
      </Section>
    </Container>
  );
};

function trackSourceClick(region: Region) {
  trackEvent(
    EventCategory.VACCINATION,
    EventAction.CLICK_LINK,
    `Source: ${region.fullName}`,
  );
}

export default VaccinationEligibilityBlock;
