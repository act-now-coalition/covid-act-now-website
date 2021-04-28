import React from 'react';
import OverallRiskBlock from '../OverallRiskBlock';
import SummaryStat from '../SummaryStat';
import VaccinationProgressBarBlock from '../VaccinationProgressBarBlock';
import {
  GridContainer,
  GridItemLevel,
  GridItemProgress,
  GridItemMetricVax,
  GridItemMetric1,
  GridItemMetric2,
  GridItemMetric3,
} from './LocationOverview.style';
import { SectionContainer } from '../Shared/Shared.style';
import { Region } from 'common/regions';
import { LocationSummary } from 'common/location_summaries';
import { summaryToStats } from '../SummaryStat/utils';
import { Metric } from 'common/metricEnum';

const LocationOverview: React.FC<{
  region: Region;
  locationSummary: LocationSummary;
}> = ({ region, locationSummary }) => {
  const stats = summaryToStats(locationSummary);

  return (
    <SectionContainer style={{ border: '1px dotted gray', maxWidth: '880px' }}>
      <GridContainer>
        <GridItemLevel>
          <OverallRiskBlock
            currentLevel={locationSummary.level}
            locationName={region.name}
          />
        </GridItemLevel>
        <GridItemProgress>
          <VaccinationProgressBarBlock
            vaccinationsInitiated={0.6}
            vaccinationsCompleted={0.4}
            locationName={region.name}
          />
        </GridItemProgress>
        <GridItemMetricVax>
          <SummaryStat
            metric={Metric.VACCINATIONS}
            value={stats[Metric.VACCINATIONS]}
          />
        </GridItemMetricVax>
        <GridItemMetric1>
          <SummaryStat
            metric={Metric.CASE_DENSITY}
            value={stats[Metric.CASE_DENSITY]}
          />
        </GridItemMetric1>
        <GridItemMetric2>
          <SummaryStat
            metric={Metric.POSITIVE_TESTS}
            value={stats[Metric.POSITIVE_TESTS]}
          />
        </GridItemMetric2>
        <GridItemMetric3>
          <SummaryStat
            metric={Metric.CASE_GROWTH_RATE}
            value={stats[Metric.CASE_GROWTH_RATE]}
          />
        </GridItemMetric3>
      </GridContainer>
    </SectionContainer>
  );
};

export default LocationOverview;
