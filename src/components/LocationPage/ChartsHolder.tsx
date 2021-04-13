import React, { useRef, useEffect, useState, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import {
  useCcviForFips,
  useScrollToElement,
  useBreakpoint,
} from 'common/hooks';
import { ALL_METRICS } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { getRegionsDB, Region, State, getStateName } from 'common/regions';
import { EventCategory, EventAction, trackEvent } from 'components/Analytics';
import ErrorBoundary from 'components/ErrorBoundary';
import { ExploreMetric } from 'components/Explore';
import LocationPageBlock from './LocationPageBlock';
import { ChartContentWrapper } from './ChartsHolder.style';
import { useProjectionsFromRegion } from 'common/utils/model';
import { MetricValues } from 'common/models/Projections';
import { LoadingScreen } from 'screens/LocationPage/LocationPage.style';
import { LocationSummary, useSummaries } from 'common/location_summaries';
import LocationPageHeaderVariant from './Experiment/LocationPageHeaderVariant';

// TODO: 180 is rough accounting for the navbar and searchbar;
// could make these constants so we don't have to manually update
const scrollTo = (div: null | HTMLDivElement, offset: number = 180) =>
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

const VaccinationEligibilityBlock = React.lazy(() =>
  import('components/VaccinationEligibilityBlock'),
);
const CompareMain = React.lazy(() => import('components/Compare/CompareMain'));
const VulnerabilitiesBlock = React.lazy(() =>
  import('components/VulnerabilitiesBlock'),
);
const Recommendations = React.lazy(() => import('./Recommendations'));
const ChartBlock = React.lazy(() => import('./ChartBlock'));
const Explore = React.lazy(() => import('components/Explore'));
const ShareModelBlock = React.lazy(() =>
  import('components/ShareBlock/ShareModelBlock'),
);

// wraps location page items in a common suspense thing since we want
// to treat them all the same.  we pass a "renderBelowFold" flag
// to render the children (thus importing them) for the first time
// once prerequisite data has been loaded
const LocationSuspenseBlock: React.FC<{
  renderBelowFold: boolean;
  id?: string;
  ref?: any;
}> = React.forwardRef(({ renderBelowFold, children, id }, ref) => {
  return (
    <LocationPageBlock ref={ref} id={id}>
      <Suspense fallback={<LoadingScreen />}>
        {renderBelowFold ? children : null}
      </Suspense>
    </LocationPageBlock>
  );
});

const summaryToStats = (summary: LocationSummary): MetricValues => {
  const stats = {} as MetricValues;
  for (const metric of ALL_METRICS) {
    stats[metric] = summary.metrics[metric]?.value ?? null;
  }
  return stats;
};

const ChartsHolder = ({ region, chartId }: ChartsHolderProps) => {
  const projections = useProjectionsFromRegion(region);

  const summaries = useSummaries();
  const locationSummary = summaries?.[region.fipsCode];

  const [dataLoaded, setDataLoaded] = useState(false);

  // cheap way to prevent showing things below the fold before the regionDB is loaded
  useEffect(() => {
    const load = async () => {
      const regions = await getRegionsDB();
      setDataLoaded(regions !== null);
    };
    load();
  }, []);

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

  const defaultExploreMetric =
    hash === '#explore-chart'
      ? ExploreMetric.HOSPITALIZATIONS
      : ExploreMetric.CASES;

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

  const initialFipsList = [region.fipsCode];

  const ccviScores = useCcviForFips(region.fipsCode);

  if (!locationSummary) {
    return null;
  }
  const stats = summaryToStats(locationSummary);

  const alarmLevel = locationSummary.level;

  const onClickAlertSignup = () => {
    trackEvent(
      EventCategory.ENGAGEMENT,
      EventAction.CLICK,
      `Location Header: Receive Alerts`,
    );
    scrollTo(shareBlockRef.current);
    document.getElementById('fieldEmail')?.focus({ preventScroll: true });
  };

  const onClickShare = () => {
    trackEvent(
      EventCategory.ENGAGEMENT,
      EventAction.CLICK,
      'Location Header: Share',
    );
    scrollTo(shareBlockRef.current, -372);
  };

  const onClickMetric = (metric: Metric) => {
    trackEvent(
      EventCategory.METRICS,
      EventAction.CLICK,
      `Location Header Stats: ${Metric[metric]}`,
    );
    scrollTo(metricRefs[metric].current);
  };

  const locationPageHeaderProps = {
    alarmLevel,
    stats,
    onMetricClick: (metric: Metric) => onClickMetric(metric),
    onHeaderShareClick: onClickShare,
    onHeaderSignupClick: onClickAlertSignup,
    isMobile,
    region,
  };

  // TODO(pablo): Create separate refs for signup and share
  return (
    <>
      <ChartContentWrapper>
        <LocationPageHeaderVariant {...locationPageHeaderProps} />
        <LocationSuspenseBlock renderBelowFold={dataLoaded}>
          <VaccinationEligibilityBlock region={region} />
        </LocationSuspenseBlock>
        <LocationSuspenseBlock renderBelowFold={dataLoaded}>
          <CompareMain
            stateName={getStateName(region) || region.name} // rename prop
            locationsViewable={6}
            stateId={(region as State).stateCode || undefined}
            region={region}
          />
        </LocationSuspenseBlock>
        <LocationSuspenseBlock
          renderBelowFold={dataLoaded}
          id="vulnerabilities"
        >
          <VulnerabilitiesBlock scores={ccviScores} region={region} />
        </LocationSuspenseBlock>
        <LocationSuspenseBlock renderBelowFold={dataLoaded}>
          <Recommendations
            projections={projections! /*fixme!*/}
            recommendationsRef={recommendationsRef}
          />
          {ALL_METRICS.map(metric => (
            <ErrorBoundary>
              <ChartBlock
                key={metric}
                metric={metric}
                projections={projections! /*fixme!*/}
                chartRef={metricRefs[metric]}
                isMobile={isMobile}
                region={region}
                stats={stats}
              />
            </ErrorBoundary>
          ))}
        </LocationSuspenseBlock>
        <LocationSuspenseBlock
          renderBelowFold={dataLoaded}
          ref={exploreChartRef}
          id="explore-chart"
        >
          <Explore
            initialFipsList={initialFipsList}
            title="Cases, Deaths, and Hospitalizations"
            defaultMetric={defaultExploreMetric}
          />
        </LocationSuspenseBlock>
      </ChartContentWrapper>
      <div ref={shareBlockRef} id="recommendationsTest">
        <Suspense fallback={<LoadingScreen />}>
          {dataLoaded ? (
            <ShareModelBlock
              region={region}
              projections={projections ?? undefined}
              stats={stats}
            />
          ) : null}
        </Suspense>
      </div>
    </>
  );
};

export default ChartsHolder;
