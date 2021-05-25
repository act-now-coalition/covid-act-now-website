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
          {projections && projections.primary && (
            <VaccinationProgressBarBlock
              locationName={region.name}
              projection={projections.primary}
            />
          )}
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
        <GridItemMetric2 onClick={() => onClickMetric(Metric.CASE_GROWTH_RATE)}>
          <SummaryStat
            metric={Metric.CASE_GROWTH_RATE}
            value={stats[Metric.CASE_GROWTH_RATE]}
          />
        </GridItemMetric2>
        <GridItemMetric3 onClick={() => onClickMetric(Metric.POSITIVE_TESTS)}>
          <SummaryStat
            metric={Metric.POSITIVE_TESTS}
            value={stats[Metric.POSITIVE_TESTS]}
          />
        </GridItemMetric3>
      </GridContainer>
      <MobileOnly>
        <ShareButton onClickShare={onClickShare} />
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
