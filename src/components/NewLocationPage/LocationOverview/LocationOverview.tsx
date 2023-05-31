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
import ShareButtons from 'components/SharedComponents/ShareButtons';
import { EventCategory } from 'components/Analytics';

const noop = () => {};

const LocationOverview: React.FC<{
  region: Region;
  locationSummary: LocationSummary;
  onClickMetric?: (metric: Metric) => void;
  onClickShare: () => void;
}> = ({ region, locationSummary, onClickMetric = noop, onClickShare }) => {
  const stats = summaryToStats(locationSummary);
  const projections = useProjectionsFromRegion(region);
  const shareUrl = region.canonicalUrl;
  const shareQuote = `I'm keeping track of ${region.fullName}'s vaccination progress and COVID risk level data with @CovidActNow. What does your community look like?`;

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
      <MobileOnly>
        <ShareButtons
          eventCategory={EventCategory.ENGAGEMENT}
          shareUrl={shareUrl}
          shareQuote={shareQuote}
          region={region}
          isLocationPageHeader={true}
        />
      </MobileOnly>
    </OverviewSectionContainer>
  );
};

export default LocationOverview;
