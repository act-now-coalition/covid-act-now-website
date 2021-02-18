import React, { useState } from 'react';
import { Container } from './VaccinationEligibilityBlock.style';
import { Heading2, Paragraph } from 'components/Markdown';
import TabsPanel, { TabInfo } from 'components/TabsPanel';
import { Region, getStateName } from 'common/regions';
import { getEligibilityInfo } from './utils';
import EligibilityPanel from './EligibilityPanel';
import { COLOR_MAP } from 'common/colors';

const VaccinationEligibilityBlock: React.FC<{ region: Region }> = ({
  region,
}) => {
  const stateName = getStateName(region);
  const eligibilityData = getEligibilityInfo(region);
  const { mostRecentPhaseName } = eligibilityData;

  const onSelectTab = (newSelectedTab: number) => {
    // TODO: Tracking
  };

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

  return (
    <Container>
      <Heading2>Vaccine eligibility</Heading2>
      <Paragraph>
        {stateName} is currently in <strong>{mostRecentPhaseName}</strong>.{' '}
        Eligibility varies throughout {stateName}, so you may also want to check
        your county or city’s health department website.
      </Paragraph>
      <TabsPanel tabList={tabList} onSelectTab={onSelectTab} />
      {/* Buttons */}
      {/* Source */}
    </Container>
  );
};

export default VaccinationEligibilityBlock;
