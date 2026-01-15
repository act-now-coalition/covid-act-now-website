import React from 'react';
import {
  TabContainer,
  TabTitle,
  TabContent,
  VaccinationsTabsWrapper,
} from 'components/NewLocationPage/ChartTabs/ChartTab.style';
import { CircleIcon } from 'components/NewLocationPage/Shared/Shared.style';
import { Value } from 'components/NewLocationPage/SummaryStat/SummaryStat.style';
import { Projections } from 'common/models/Projections';
import { VACCINATIONS_COLOR_MAP } from 'common/colors';
import { formatPercent } from 'common/utils';
import { nullValueString } from 'components/Charts/Groupings';

interface VaccinationTabContent {
  metricName: string;
  value: string;
  iconColor: string;
}

const VaccinationChartTabs: React.FC<{
  projections: Projections;
}> = ({ projections }) => {
  const percentInitiated =
    projections?.primary.vaccinationsInfo?.ratioInitiated;
  const percentCompleted =
    projections?.primary.vaccinationsInfo?.ratioVaccinated;
  const percentAdditionalDose =
    projections?.primary.vaccinationsInfo?.ratioAdditionalDose;
  const percentBivalentBoostedFall2022 =
    projections?.primary.vaccinationsInfo?.ratioBivalentBoostedFall2022;

  const tabsContent = [
    {
      metricName: '1+ Dose',
      value: percentInitiated
        ? formatPercent(percentInitiated, 1)
        : nullValueString,
      iconColor: VACCINATIONS_COLOR_MAP.INITIATED,
    },
    {
      metricName: '2+ Doses or J&J',
      value: percentCompleted
        ? formatPercent(percentCompleted, 1)
        : nullValueString,
      iconColor: VACCINATIONS_COLOR_MAP.COMPLETED,
    },
    {
      metricName: 'Booster Dose',
      value: percentAdditionalDose
        ? formatPercent(percentAdditionalDose, 1)
        : nullValueString,
      iconColor: VACCINATIONS_COLOR_MAP.ADDITIONAL_DOSE,
    },
    {
      metricName: 'Bivalent Dose',
      value: percentBivalentBoostedFall2022
        ? formatPercent(percentBivalentBoostedFall2022, 1)
        : nullValueString,
      iconColor: VACCINATIONS_COLOR_MAP.BIVALENT_FALL_2022,
    },
  ];

  return (
    <VaccinationsTabsWrapper>
      {tabsContent.map((tab: VaccinationTabContent) => (
        <TabContainer key={tab.metricName}>
          <TabTitle>{tab.metricName}</TabTitle>
          <TabContent>
            <CircleIcon $iconColor={tab.iconColor} />
            <Value>{tab.value}</Value>
          </TabContent>
        </TabContainer>
      ))}
    </VaccinationsTabsWrapper>
  );
};

export default VaccinationChartTabs;
