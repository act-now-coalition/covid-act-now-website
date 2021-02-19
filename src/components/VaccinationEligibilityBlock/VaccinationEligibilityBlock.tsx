import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Region, getStateName } from 'common/regions';
import { COLOR_MAP } from 'common/colors';
import { assert } from 'common/utils';
import ExternalLink from 'components/ExternalLink';
import { Heading2, Paragraph } from 'components/Markdown';
import TabsPanel, { TabInfo } from 'components/TabsPanel';
import { trackEvent, EventCategory, EventAction } from 'components/Analytics';
import { getVaccinationDataByRegion } from 'cms-content/vaccines';
import { getEligibilityInfo, getRegionState } from './utils';
import {
  Container,
  Section,
  Source,
} from './VaccinationEligibilityBlock.style';
import EligibilityPanel from './EligibilityPanel';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { StyledLinkButton, ButtonsContainer } from './ButtonBlock.style';
import { EmailAlertIcon } from 'components/EmailAlertsFooter/EmailAlertsFooter.style';
import { scrollWithOffset } from 'components/TableOfContents';

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

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const tabList: TabInfo[] = [
    {
      title: 'Eligible now',
      indicatorColor: COLOR_MAP.GREEN.BASE,
      renderPanel: () => (
        <EligibilityPanel
          phaseList={eligibilityData.phasesEligibleNow}
          currentlyEligible={true}
          stateName={stateName || 'Your state'}
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
          stateName={stateName || 'Your state'}
        />
      ),
    },
  ];

  const onSelectTab = (newSelectedTab: number) => {
    trackTabSelected(tabList[newSelectedTab].title);
    setSelectedTabIndex(newSelectedTab);
  };

  const sharedTrackingProps = {
    trackingCategory: EventCategory.VACCINATION,
    trackingAction: EventAction.CLICK_LINK,
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
        <ButtonsContainer>
          <StyledLinkButton
            $highlighted={!signupLink || selectedTabIndex === 1}
            to="#share-container"
            {...sharedTrackingProps}
            trackingLabel="Vaccination alerts"
            startIcon={<EmailAlertIcon />}
            scroll={(element: HTMLElement) => scrollWithOffset(element, -80)}
          >
            Get notified when eligibility changes
          </StyledLinkButton>
          {signupLink && (
            <StyledLinkButton
              $highlighted={selectedTabIndex === 0}
              href={signupLink}
              {...sharedTrackingProps}
              trackingLabel="Where to get vaccinated"
              endIcon={<OpenInNewIcon />}
            >
              See where and how to get vaccinated
            </StyledLinkButton>
          )}
        </ButtonsContainer>
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
