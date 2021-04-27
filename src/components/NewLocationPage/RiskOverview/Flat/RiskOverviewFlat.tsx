import React from 'react';
import OverallRiskBlock from '../../OverallRiskBlock';
import SummaryStat from '../../SummaryStatsBlock';
import VaccinationProgressBlock from '../../VaccinationProgressBar/VaccinationProgressBlock';
import {
  FlatWrapper,
  StatItem,
  OverallRiskItem,
  ProgressBarItem,
  VaxStatItem,
} from './../RiskOverview.style';
import { Region } from 'common/regions';
import { LocationSummary } from 'common/location_summaries';
import { summaryToStats } from '../../SummaryStatsBlock/utils';
import { orderedStatMetrics } from '../../SummaryStatsBlock/utils';
import { Metric } from 'common/metricEnum';

const RiskOverviewFlat: React.FC<{
  region: Region;
  locationSummary: LocationSummary;
}> = ({ region, locationSummary }) => {
  const stats = summaryToStats(locationSummary);

  return (
    <FlatWrapper>
      <OverallRiskItem>
        <OverallRiskBlock
          currentLevel={locationSummary.level}
          locationName={region.name}
        />
      </OverallRiskItem>
      {orderedStatMetrics.map((metric: Metric, index: number) => {
        return (
          <StatItem index={index}>
            <SummaryStat metric={metric} value={stats[metric]} />
          </StatItem>
        );
      })}
      <VaxStatItem>
        <SummaryStat
          metric={Metric.VACCINATIONS}
          value={stats[Metric.VACCINATIONS]}
        />
      </VaxStatItem>
      <ProgressBarItem>
        <VaccinationProgressBlock
          vaccinationsInitiated={0.2}
          vaccinationsCompleted={0.4}
          locationName={region.name}
        />
      </ProgressBarItem>
    </FlatWrapper>
  );
};

export default RiskOverviewFlat;
