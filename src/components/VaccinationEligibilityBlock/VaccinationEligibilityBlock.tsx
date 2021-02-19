import React from 'react';
import { Region, getStateName } from 'common/regions';
import { COLOR_MAP } from 'common/colors';
import { assert } from 'common/utils';
import ExternalLink from 'components/ExternalLink';
import { Heading2, Paragraph } from 'components/Markdown';
import TabsPanel, { TabInfo } from 'components/TabsPanel';
import { trackEvent, EventCategory, EventAction } from 'components/Analytics';
import { getVaccinationDataByRegion } from 'cms-content/vaccines';
import ButtonBlock from './ButtonBlock';
import { getEligibilityInfo, getRegionState } from './utils';
import {
  Container,
  Section,
  Source,
} from './VaccinationEligibilityBlock.style';
import EligibilityPanel from './EligibilityPanel';

const VaccinationEligibilityBlock: React.FC<{ region: Region }> = ({
  region,
}) => {
  const state = getRegionState(region);
  assert(
    state,
    `VaccinationEligibilityBlock cannot be used for locations with more than one state`,
  );

  // TODO: Assert that the region is a county, state or a single-state metro
  const stateName = getStateName(state);
  const eligibilityData = getEligibilityInfo(state);
  const { mostRecentPhaseName, sourceName, sourceUrl } = eligibilityData;

  const vaccinationData = getVaccinationDataByRegion(region);
  const signupLink = vaccinationData && vaccinationData.vaccinationSignupUrl;

  const tabList: TabInfo[] = [
    {
      title: 'Eligible now',
      indicatorColor: COLOR_MAP.GREEN.BASE,
      renderPanel: () => (
        <EligibilityPanel
          phaseList={eligibilityData.phasesEligibleNow}
          currentlyEligible={true}
        />
      ),
    },
    {
      title: 'Eligible later',
      indicatorColor: COLOR_MAP.BLACK,
      renderPanel: () => (
        <EligibilityPanel
          phaseList={eligibilityData.phasesEligibleLater}
          currentlyEligible={false}
        />
      ),
    },
  ];

  const onSelectTab = (newSelectedTab: number) => {
    trackTabSelected(tabList[newSelectedTab].title);
  };

  return (
    <Container>
      <Heading2>Vaccine eligibility</Heading2>
      <Paragraph>
        {stateName} is currently in <strong>{mostRecentPhaseName}</strong>.{' '}
        Eligibility varies throughout {stateName}, so you may also want to check
        your county or city’s health department website.
      </Paragraph>
      <Section>
        <TabsPanel tabList={tabList} onSelectTab={onSelectTab} />
      </Section>
      <Section>
        <ButtonBlock signupLink={signupLink} />
      </Section>
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

function trackTabSelected(tabName: string) {
  trackEvent(
    EventCategory.VACCINATION,
    EventAction.CLICK,
    `Selected: ${tabName}`,
  );
}

export default VaccinationEligibilityBlock;
