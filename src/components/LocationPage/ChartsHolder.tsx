import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useLocation } from 'common/utils/router';
import { v4 as uuidv4 } from 'uuid';
import {
  useCcviForFips,
  useScrollToElement,
  useBreakpoint,
} from 'common/hooks';
import { ALL_METRICS } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { Region, State, getStateName } from 'common/regions';
import { getRecommendationsShareUrl } from 'common/urls';
import {
  getDynamicIntroCopy,
  getRecommendations,
  getShareQuote,
  getFedLevel,
  getHarvardLevel,
  getModalCopyWithFedLevel,
  getModalCopyWithHarvardLevel,
} from 'common/utils/recommend';
import { mainContent } from 'cms-content/recommendations';
import { EventCategory, EventAction, trackEvent } from 'components/Analytics';
//import CompareMain from 'components/Compare/CompareMain';
import ErrorBoundary from 'components/ErrorBoundary';
import { /*Explore, */ ExploreMetric } from 'components/Explore';
//import Recommend from 'components/Recommend';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
//import VaccinationEligibilityBlock from 'components/VaccinationEligibilityBlock';
import VulnerabilitiesBlock from 'components/VulnerabilitiesBlock';
import ChartBlock from './ChartBlock';
import LocationPageBlock from './LocationPageBlock';
import LocationPageHeader from './LocationPageHeader';
import { ChartContentWrapper } from './ChartsHolder.style';
import { useProjectionsFromRegion } from 'common/utils/model';
import { Projections } from 'common/models/Projections';
import { LoadingScreen } from 'screens/LocationPage/LocationPage.style';
import type { LocationSummary } from 'common/location_summaries';
import { summaryToStats } from 'common/utils/chart';

const Recommend = dynamic(() => import('components/Recommend'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

const CompareMain = dynamic(() => import('components/Compare/CompareMain'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});
const VaccinationEligibilityBlock = dynamic(
  () => import('components/VaccinationEligibilityBlock'),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  },
);
const Explore = dynamic(() => import('components/Explore'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

// TODO: 180 is rough accounting for the navbar and searchbar;
// could make these constants so we don't have to manually update
const scrollTo = (div: null | HTMLDivElement, offset: number = 180) =>
  div &&
  window.scrollTo({
    left: 0,
    top: div.offsetTop - offset,
    behavior: 'smooth',
  });

interface RecommendationsProps {
  projections: Projections;
  recommendationsRef: React.RefObject<HTMLDivElement>;
}

const Recommendations = ({
  projections,
  recommendationsRef,
}: RecommendationsProps) => {
  const alarmLevel = projections.getAlarmLevel();
  const region = projections.region;
  const projection = projections.primary;

  const recommendationsIntro = getDynamicIntroCopy(
    projection,
    projections.locationName,
    projections.getMetricValues(),
  );

  const recommendationsMainContent = getRecommendations(
    projection,
    mainContent.recommendations,
  );

  const recommendsShareUrl = getRecommendationsShareUrl(region);

  const recommendsShareQuote = getShareQuote(
    projections.locationName,
    alarmLevel,
  );

  const recommendationsFeedbackForm = `https://can386399.typeform.com/to/WSPYSGPe#source=can&id=${uuidv4()}&fips=${
    projection.fips
  }`;

  // TODO(Chelsi): make these 2 functions less redundant?
  const recommendationsFedModalCopy = getModalCopyWithFedLevel(
    projection,
    projections.locationName,
    projections.getMetricValues(),
  );

  const recommendationsHarvardModalCopy = getModalCopyWithHarvardLevel(
    projection,
    projections.locationName,
    projections.getMetricValues(),
  );

  return (
    <Recommend
      introCopy={recommendationsIntro}
      recommendations={recommendationsMainContent}
      locationName={region.fullName}
      shareUrl={recommendsShareUrl}
      shareQuote={recommendsShareQuote}
      recommendationsRef={recommendationsRef}
      feedbackFormUrl={recommendationsFeedbackForm}
      fedLevel={getFedLevel(projections.primary)}
      harvardLevel={getHarvardLevel(projections.primary)}
      harvardModalLocationCopy={recommendationsHarvardModalCopy}
      fedModalLocationCopy={recommendationsFedModalCopy}
    />
  );
};

interface ChartsHolderProps {
  region: Region;
  chartId: string;
  locationSummary: LocationSummary;
}

const ChartsHolder = ({
  region,
  chartId,
  locationSummary,
}: ChartsHolderProps) => {
  const projections = useProjectionsFromRegion(region);

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

  const { search, hash } = useLocation();
  const isRecommendationsShareUrl = hash.includes('recommendations');

  const defaultExploreMetric = ExploreMetric.CASES;

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

  // TODO(pablo): Create separate refs for signup and share
  return (
    <>
      <ChartContentWrapper>
        <LocationPageHeader
          alarmLevel={alarmLevel}
          stats={stats}
          onMetricClick={metric => onClickMetric(metric)}
          onHeaderShareClick={onClickShare}
          onHeaderSignupClick={onClickAlertSignup}
          isMobile={isMobile}
          region={region}
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
        <LocationPageBlock>
          {!projections ? (
            <LoadingScreen />
          ) : (
            <Recommendations
              projections={projections}
              recommendationsRef={recommendationsRef}
            />
          )}
          {ALL_METRICS.map(metric => (
            <ErrorBoundary key={`key-${metric}`}>
              {!projections ? (
                <LoadingScreen />
              ) : (
                <ChartBlock
                  key={metric}
                  metric={metric}
                  projections={projections}
                  chartRef={metricRefs[metric]}
                  isMobile={isMobile}
                  region={region}
                  stats={stats}
                />
              )}
            </ErrorBoundary>
          ))}
        </LocationPageBlock>
        <LocationPageBlock ref={exploreChartRef} id="explore-chart">
          <Explore
            region={region}
            initialFipsList={initialFipsList}
            title="Cases, Deaths, and Hospitalizations"
            defaultMetric={defaultExploreMetric}
          />
        </LocationPageBlock>
      </ChartContentWrapper>
      <div ref={shareBlockRef} id="recommendationsTest">
        <ShareModelBlock region={region} projections={projections} />
      </div>
    </>
  );
};

export default ChartsHolder;
