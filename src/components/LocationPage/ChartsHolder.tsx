import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  useCcviForFips,
  useScrollToElement,
  useBreakpoint,
  useLocationSummariesForFips,
  useShowPastPosition,
} from 'common/hooks';
import { ALL_METRICS } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { Region, State, getStateName } from 'common/regions';
import { useProjectionsFromRegion } from 'common/utils/model';
import { LoadingScreen } from 'screens/LocationPage/LocationPage.style';
import { EventCategory, EventAction, trackEvent } from 'components/Analytics';
import CompareMain from 'components/Compare/CompareMain';
import ErrorBoundary from 'components/ErrorBoundary';
import Explore, { ExploreMetric } from 'components/Explore';
import Recommendations from './Recommendations';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import VaccinationEligibilityBlock from 'components/VaccinationEligibilityBlock';
import VulnerabilitiesBlock from 'components/VulnerabilitiesBlock';
import ChartBlock from './ChartBlock';
import LocationPageBlock from './LocationPageBlock';
import { ChartContentWrapper } from './ChartsHolder.style';
import { summaryToStats } from 'components/NewLocationPage/SummaryStat/utils';
import AboveTheFold from 'components/NewLocationPage/AboveTheFold/AboveTheFold';
import {
  SparkLineMetric,
  SparkLineToExploreMetric,
} from 'components/NewLocationPage/SparkLineBlock/utils';
import HomepageUpsell from 'components/HomepageUpsell/HomepageUpsell';

// TODO: 100 is rough accounting for the navbar;
// could make these constants so we don't have to manually update
const scrollTo = (div: null | HTMLDivElement, offset: number = 100) =>
  div &&
  window.scrollTo({
    left: 0,
    top: div.offsetTop - offset,
    behavior: 'smooth',
  });

interface ChartsHolderProps {
  region: Region;
  chartId: string;
}

const ChartsHolder = ({ region, chartId }: ChartsHolderProps) => {
  const projections = useProjectionsFromRegion(region);

  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  const metricRefs = {
    [Metric.CASE_DENSITY]: useRef<HTMLDivElement>(null),
    [Metric.CASE_GROWTH_RATE]: useRef<HTMLDivElement>(null),
    [Metric.POSITIVE_TESTS]: useRef<HTMLDivElement>(null),
    [Metric.HOSPITAL_USAGE]: useRef<HTMLDivElement>(null),
    [Metric.VACCINATIONS]: useRef<HTMLDivElement>(null),
  };
  const shareBlockRef = useRef<HTMLDivElement>(null);
  const exploreChartRef = useRef<HTMLDivElement>(null);
  const recommendationsRef = useRef<HTMLDivElement>(null);

  const isMobile = useBreakpoint(600);
  useScrollToElement();

  const { pathname, hash } = useLocation();
  const isRecommendationsShareUrl = pathname.includes('recommendations');

  const [defaultExploreMetric, setDefaultExploreMetric] = useState<
    ExploreMetric
  >(ExploreMetric.CASES);

  useEffect(() => {
    if (hash === '#explore-chart') {
      setDefaultExploreMetric(ExploreMetric.HOSPITALIZATIONS);
    }
  }, [hash]);

  useEffect(() => {
    const scrollToChart = () => {
      const timeoutId = setTimeout(() => {
        if (chartId in metricRefs) {
          const metricRef = metricRefs[(chartId as unknown) as Metric];
          if (metricRef.current) {
            scrollTo(metricRef.current);
          }
        }
      }, 200);
      return () => clearTimeout(timeoutId);
    };

    const scrollToRecommendations = () => {
      const timeoutId = setTimeout(() => {
        if (isRecommendationsShareUrl) {
          if (recommendationsRef.current) {
            scrollTo(recommendationsRef.current);
          }
        }
      }, 200);
      return () => clearTimeout(timeoutId);
    };

    scrollToChart();
    scrollToRecommendations();
  }, [chartId, metricRefs, isRecommendationsShareUrl]);

  const initialFipsList = useMemo(() => [region.fipsCode], [region.fipsCode]);

  const ccviScores = useCcviForFips(region.fipsCode);

  const onClickAlertSignup = () => {
    trackEvent(
      EventCategory.ENGAGEMENT,
      EventAction.CLICK,
      `Location Header: Receive Alerts`,
    );
    scrollTo(shareBlockRef.current);
  };

  const onClickShare = () => {
    scrollTo(shareBlockRef.current, -352);
  };

  const onClickMetric = (metric: Metric) => {
    trackEvent(
      EventCategory.METRICS,
      EventAction.CLICK,
      `Location Header Stats: ${Metric[metric]}`,
    );
    scrollTo(metricRefs[metric].current);
  };

  const onClickSparkLine = (metric: SparkLineMetric) => {
    trackEvent(
      EventCategory.METRICS,
      EventAction.CLICK,
      `Spark line: ${SparkLineMetric[metric]}`,
    );
    setDefaultExploreMetric(SparkLineToExploreMetric[metric]);
    scrollTo(exploreChartRef.current);
  };

  const experimentTriggerPoint = isMobile ? 8000 : 5000;
  const showHomepageUpsell = useShowPastPosition(experimentTriggerPoint);

  if (!locationSummary) {
    return null;
  }
  const stats = summaryToStats(locationSummary);

  // TODO(pablo): Create separate refs for signup and share
  return (
    <>
      <ChartContentWrapper>
        <AboveTheFold
          region={region}
          locationSummary={locationSummary}
          onClickMetric={(metric: Metric) => onClickMetric(metric)}
          onClickAlertSignup={onClickAlertSignup}
          onClickShare={onClickShare}
          onClickSparkLine={onClickSparkLine}
        />
        <LocationPageBlock>
          <VaccinationEligibilityBlock region={region} />
        </LocationPageBlock>
        <LocationPageBlock>
          <CompareMain
            stateName={getStateName(region) || region.name} // rename prop
            locationsViewable={6}
            stateId={(region as State).stateCode || undefined}
            region={region}
          />
        </LocationPageBlock>
        <LocationPageBlock id="vulnerabilities">
          <VulnerabilitiesBlock scores={ccviScores} region={region} />
        </LocationPageBlock>
        {!projections ? (
          <LoadingScreen />
        ) : (
          <LocationPageBlock>
            <Recommendations
              projections={projections}
              recommendationsRef={recommendationsRef}
            />
          </LocationPageBlock>
        )}
        {ALL_METRICS.map(metric => (
          <ErrorBoundary key={metric}>
            {!projections ? (
              <LoadingScreen />
            ) : (
              <LocationPageBlock>
                <ChartBlock
                  metric={metric}
                  projections={projections}
                  chartRef={metricRefs[metric]}
                  isMobile={isMobile}
                  region={region}
                  stats={stats}
                />
              </LocationPageBlock>
            )}
          </ErrorBoundary>
        ))}
        <LocationPageBlock ref={exploreChartRef} id="explore-chart">
          <Explore
            initialFipsList={initialFipsList}
            title="Cases, Deaths, and Hospitalizations"
            defaultMetric={defaultExploreMetric}
          />
        </LocationPageBlock>
      </ChartContentWrapper>
      <div ref={shareBlockRef}>
        <ShareModelBlock
          region={region}
          projections={projections}
          stats={stats}
        />
      </div>
      <HomepageUpsell showHomepageUpsell={showHomepageUpsell} />
    </>
  );
};

export default ChartsHolder;
