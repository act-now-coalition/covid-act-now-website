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
import { useProjectionsFromRegion } from 'common/utils/model';

const noop = () => {};

const LocationOverview: React.FC<{
  region: Region;
  locationSummary: LocationSummary;
  onClickMetric?: (metric: Metric) => void;
}> = ({ region, locationSummary, onClickMetric = noop }) => {
  const stats = summaryToStats(locationSummary);
  const projections = useProjectionsFromRegion(region);

  return (
    <OverviewSectionContainer>
      <GridContainer>
        <GridItemLevel>
          <OverallRiskBlock
            currentLevel={locationSummary.level}
            locationName={region.name}
          />
        </GridItemLevel>
        <GridItemProgress onClick={() => onClickMetric(Metric.VACCINATIONS)}>
          <MobileOnly>
            <>
              {projections?.primary && (
                <VaccinationProgressBarBlock
                  locationName={region.name}
                  projection={projections.primary}
                />
              )}
            </>
          </MobileOnly>
        </GridItemProgress>
        <GridItemMetricVax onClick={() => onClickMetric(Metric.VACCINATIONS)}>
          <SummaryStat
            metric={Metric.VACCINATIONS}
            value={stats[Metric.VACCINATIONS]}
            projection={projections?.primary}
          />
        </GridItemMetricVax>
        <GridItemMetric1
          onClick={() => onClickMetric(Metric.ADMISSIONS_PER_100K)}
        >
          <SummaryStat
            metric={Metric.ADMISSIONS_PER_100K}
            value={stats[Metric.ADMISSIONS_PER_100K]}
            projection={projections?.primary}
          />
        </GridItemMetric1>
        <GridItemMetric2
          onClick={() => onClickMetric(Metric.RATIO_BEDS_WITH_COVID)}
        >
          <SummaryStat
            metric={Metric.RATIO_BEDS_WITH_COVID}
            value={stats[Metric.RATIO_BEDS_WITH_COVID]}
            projection={projections?.primary}
          />
        </GridItemMetric2>
        <GridItemMetric3
          onClick={() => onClickMetric(Metric.WEEKLY_CASES_PER_100K)}
        >
          <SummaryStat
            metric={Metric.WEEKLY_CASES_PER_100K}
            value={stats[Metric.WEEKLY_CASES_PER_100K]}
            projection={projections?.primary}
          />
        </GridItemMetric3>
      </GridContainer>
    </OverviewSectionContainer>
  );
};

export default LocationOverview;
