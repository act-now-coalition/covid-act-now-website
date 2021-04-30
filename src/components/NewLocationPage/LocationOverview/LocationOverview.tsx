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
  OverviewSectionContainer,
} from './LocationOverview.style';
import { MobileOnly } from '../Shared/Shared.style';
import { Region } from 'common/regions';
import { LocationSummary } from 'common/location_summaries';
import { summaryToStats } from '../SummaryStat/utils';
import { Metric } from 'common/metricEnum';
import ShareButton from 'components/NewLocationPage/HeaderButtons/ShareButton';

const noop = () => {};

const LocationOverview: React.FC<{
  region: Region;
  locationSummary: LocationSummary;
  onClickMetric?: (metric: Metric) => void;
}> = ({ region, locationSummary, onClickMetric = noop }) => {
  const stats = summaryToStats(locationSummary);

  return (
    <OverviewSectionContainer>
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
        <GridItemMetricVax onClick={() => onClickMetric(Metric.VACCINATIONS)}>
          <SummaryStat
            metric={Metric.VACCINATIONS}
            value={stats[Metric.VACCINATIONS]}
          />
        </GridItemMetricVax>
        <GridItemMetric1 onClick={() => onClickMetric(Metric.CASE_DENSITY)}>
          <SummaryStat
            metric={Metric.CASE_DENSITY}
            value={stats[Metric.CASE_DENSITY]}
          />
        </GridItemMetric1>
        <GridItemMetric2 onClick={() => onClickMetric(Metric.POSITIVE_TESTS)}>
          <SummaryStat
            metric={Metric.POSITIVE_TESTS}
            value={stats[Metric.POSITIVE_TESTS]}
          />
        </GridItemMetric2>
        <GridItemMetric3 onClick={() => onClickMetric(Metric.CASE_GROWTH_RATE)}>
          <SummaryStat
            metric={Metric.CASE_GROWTH_RATE}
            value={stats[Metric.CASE_GROWTH_RATE]}
          />
        </GridItemMetric3>
      </GridContainer>
      <MobileOnly>
        <ShareButton />
      </MobileOnly>
    </OverviewSectionContainer>
  );
};

export default LocationOverview;
