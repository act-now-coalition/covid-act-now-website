import React from 'react';
import styled from 'styled-components';
import {
  TabContainer,
  TabTitle,
  TabContent,
} from 'components/NewLocationPage/ChartTabs/ChartTab.style';
import { CircleIcon } from 'components/NewLocationPage/Shared/Shared.style';
import { Value } from 'components/NewLocationPage/SummaryStat/SummaryStat.style';
import { Projections } from 'common/models/Projections';
import { VACCINATIONS_COLOR_MAP } from 'common/colors';
import { formatPercent } from 'common/utils';
import { nullValueString } from './Groupings';

const Wrapper = styled.div`
  display: flex;

  ${TabContainer} {
    &:first-of-type {
      margin-right: 1.5rem;
    }
  }
`;

const VaccinationChartTabs: React.FC<{
  projections: Projections;
}> = ({ projections }) => {
  const percentInitiated =
    projections?.primary.vaccinationsInfo?.ratioInitiated;
  const percentCompleted =
    projections?.primary.vaccinationsInfo?.ratioVaccinated;

  const tabsContent = [
    {
      metricName: '1+ Dose',
      value: percentInitiated || nullValueString,
      iconColor: VACCINATIONS_COLOR_MAP.INITIATED,
    },
    {
      metricName: 'Fully Vaccinated',
      value: percentCompleted || nullValueString,
      iconColor: VACCINATIONS_COLOR_MAP.COMPLETED,
    },
  ];

  return (
    <Wrapper>
      {tabsContent.map((tab: any) => (
        <TabContainer>
          <TabTitle>{tab.metricName}</TabTitle>
          <TabContent>
            <CircleIcon $iconColor={tab.iconColor} />
            <Value>{formatPercent(tab.value)}</Value>
          </TabContent>
        </TabContainer>
      ))}
    </Wrapper>
  );
};

export default VaccinationChartTabs;
