import React from 'react';
import OverallRiskBlock from '../OverallRiskBlock';
import SummaryStat from '../SummaryStatsBlock';
// import { VaccinationProgressBar } from '../VaccinationProgressBar';
import VaccinationProgressBlock from '../VaccinationProgressBar/VaccinationProgressBlock';
import {
  Item,
  Section,
  MultiStatsWrapper,
  Wrapper,
  StatWrapper,
} from './RiskOverview.style';
import { Region } from 'common/regions';
import { LocationSummary } from 'common/location_summaries';
import { summaryToStats } from '../SummaryStatsBlock/utils';
import { orderedStatMetrics } from '../SummaryStatsBlock/utils';
import { Metric } from 'common/metricEnum';

const RiskOverview: React.FC<{
  region: Region;
  locationSummary: LocationSummary;
}> = ({ region, locationSummary }) => {
  const stats = summaryToStats(locationSummary);

  return (
    <Wrapper>
      <Section style={{ flex: 3 }}>
        <Item>
          <OverallRiskBlock
            currentLevel={locationSummary.level}
            locationName={region.name}
          />
        </Item>
        <MultiStatsWrapper>
          {orderedStatMetrics.map((metric: Metric) => {
            return (
              <StatWrapper style={{ flex: 1 }}>
                <SummaryStat metric={metric} value={stats[metric]} />
              </StatWrapper>
            );
          })}
        </MultiStatsWrapper>
      </Section>
      <Section style={{ flex: 2 }}>
        <Item>
          <VaccinationProgressBlock
            vaccinationsInitiated={0.2}
            vaccinationsCompleted={0.4}
            locationName={region.name}
          />
        </Item>
        <Item style={{ flex: 1 }}>
          <SummaryStat
            metric={Metric.VACCINATIONS}
            value={stats[Metric.VACCINATIONS]}
          />
        </Item>
      </Section>
    </Wrapper>
  );
};

export default RiskOverview;
