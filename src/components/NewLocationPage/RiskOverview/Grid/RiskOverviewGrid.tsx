import React from 'react';
import OverallRiskBlock from '../../OverallRiskBlock';
import SummaryStat from '../../SummaryStatsBlock';
import VaccinationProgressBlock from '../../VaccinationProgressBar/VaccinationProgressBlock';
import {
  GridContainer,
  GridItemHeader,
  GridItemV1,
  GridItemVP,
  GridItemM1,
  GridItemM2,
  GridItemM3,
} from './../RiskOverview.style';
import { Region } from 'common/regions';
import { LocationSummary } from 'common/location_summaries';
import { summaryToStats } from '../../SummaryStatsBlock/utils';
import { Metric } from 'common/metricEnum';

const RiskOverviewGrid: React.FC<{
  region: Region;
  locationSummary: LocationSummary;
}> = ({ region, locationSummary }) => {
  const stats = summaryToStats(locationSummary);

  return (
    <GridContainer>
      <GridItemHeader>
        <OverallRiskBlock
          currentLevel={locationSummary.level}
          locationName={region.name}
        />
      </GridItemHeader>
      <GridItemV1>
        <VaccinationProgressBlock
          vaccinationsInitiated={0.2}
          vaccinationsCompleted={0.4}
          locationName={region.name}
        />
      </GridItemV1>
      <GridItemVP>
        <SummaryStat
          metric={Metric.VACCINATIONS}
          value={stats[Metric.VACCINATIONS]}
        />
      </GridItemVP>
      <GridItemM1>
        <SummaryStat
          metric={Metric.CASE_DENSITY}
          value={stats[Metric.CASE_DENSITY]}
        />
      </GridItemM1>
      <GridItemM2>
        <SummaryStat
          metric={Metric.POSITIVE_TESTS}
          value={stats[Metric.POSITIVE_TESTS]}
        />
      </GridItemM2>
      <GridItemM3>
        <SummaryStat
          metric={Metric.CASE_GROWTH_RATE}
          value={stats[Metric.CASE_GROWTH_RATE]}
        />
      </GridItemM3>
    </GridContainer>
  );
};

export default RiskOverviewGrid;
