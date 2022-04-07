import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useLocation } from 'react-router-dom';
import {
  useCcviForFips,
  useScrollToElement,
  useBreakpoint,
  useLocationSummariesForFips,
} from 'common/hooks';
import { Metric } from 'common/metricEnum';
import { Region, State, getStateName } from 'common/regions';
import { useProjectionsFromRegion } from 'common/utils/model';
import { LoadingScreen } from 'screens/LocationPage/LocationPage.style';
import { EventCategory, EventAction, trackEvent } from 'components/Analytics';
import CompareMain from 'components/Compare/CompareMain';
import ErrorBoundary from 'components/ErrorBoundary';
import Explore, { ExploreMetric } from 'components/Explore';
import Recommendations from '../Recommend/Recommendations';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import VulnerabilitiesBlock from 'components/VulnerabilitiesBlock';
import LocationPageBlock from './LocationPageBlock';
import { WidthContainer } from './LocationPageBlock.style';
import { LocationPageContentWrapper, BelowTheFold } from './ChartsHolder.style';
import { summaryToStats } from 'components/NewLocationPage/SummaryStat/utils';
import AboveTheFold from 'components/NewLocationPage/AboveTheFold/AboveTheFold';
import {
  SparkLineMetric,
  SparkLineToExploreMetric,
} from 'components/NewLocationPage/SparkLineBlock/utils';
import ChartBlock from 'components/Charts/ChartBlock';
import {
  CHART_GROUPS,
  ChartGroup,
  GroupHeader,
  getChartGroupFromMetric,
} from 'components/Charts/Groupings';

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

const ChartsHolder = React.memo(({ region, chartId }: ChartsHolderProps) => {
  const projections = useProjectionsFromRegion(region);

  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  const caseDensityRef = useRef<HTMLDivElement>(null);
  const caseGrowthRateRef = useRef<HTMLDivElement>(null);
  const positiveTestsRef = useRef<HTMLDivElement>(null);
  const hospitalUsageRef = useRef<HTMLDivElement>(null);
  const vaccinationsRef = useRef<HTMLDivElement>(null);
  const weeklyNewCasesRef = useRef<HTMLDivElement>(null);
  const admissionsPer100kRef = useRef<HTMLDivElement>(null);
  const ratioBedsWithCovidRef = useRef<HTMLDivElement>(null);
  const metricRefs = useMemo(
    () => ({
      [Metric.CASE_DENSITY]: caseDensityRef,
      [Metric.CASE_GROWTH_RATE]: caseGrowthRateRef,
      [Metric.POSITIVE_TESTS]: positiveTestsRef,
      [Metric.HOSPITAL_USAGE]: hospitalUsageRef,
      [Metric.VACCINATIONS]: vaccinationsRef,
      [Metric.WEEKLY_CASES_PER_100K]: weeklyNewCasesRef,
      [Metric.ADMISSIONS_PER_100K]: admissionsPer100kRef,
      [Metric.RATIO_BEDS_WITH_COVID]: ratioBedsWithCovidRef,
    }),
    [],
  );
  const shareBlockRef = useRef<HTMLDivElement>(null);
  const exploreChartRef = useRef<HTMLDivElement>(null);
  const recommendationsRef = useRef<HTMLDivElement>(null);

  const isMobile = useBreakpoint(600);
  useScrollToElement();

  const { pathname, hash } = useLocation();
  const isRecommendationsShareUrl = pathname.includes('recommendations');

  const [currentExploreMetric, setCurrentExploreMetric] = useState<
    ExploreMetric
  >(ExploreMetric.HOSPITALIZATIONS);

  useEffect(() => {
    if (hash === '#explore-chart') {
      setCurrentExploreMetric(ExploreMetric.HOSPITALIZATIONS);
    }
  }, [hash]);

  const [scrolledWithUrl, setScrolledWithUrl] = useState(false);

  // TODO(8.2) rename ref once group header is finalized
  const newBlockRef = useRef<HTMLDivElement>(null);
  const vaccinationsBlockRef = useRef<HTMLDivElement>(null);
  const casesBlockRef = useRef<HTMLDivElement>(null);
  const hospitalizationsBlockRef = useRef<HTMLDivElement>(null);
  const deathsBlockRed = useRef<HTMLDivElement>(null);
  const chartBlockRefs = useMemo(
    () => ({
      [GroupHeader.COMMUNITY_LEVEL_COMPONENTS]: newBlockRef,
      [GroupHeader.VACCINATED]: vaccinationsBlockRef,
      [GroupHeader.CASES]: casesBlockRef,
      [GroupHeader.HOSPITALIZATIONS]: hospitalizationsBlockRef,
      [GroupHeader.DEATHS]: deathsBlockRed,
    }),
    [],
  );

  useEffect(() => {
    const scrollToChart = () => {
      const timeoutId = setTimeout(() => {
        if (chartId in metricRefs) {
          const metricRef = metricRefs[(chartId as unknown) as Metric];
          if (metricRef.current && !scrolledWithUrl) {
            setScrolledWithUrl(true);
            scrollTo(metricRef.current);
          }
        }
      }, 200);
      return () => clearTimeout(timeoutId);
    };

    const scrollToRecommendations = () => {
      const timeoutId = setTimeout(() => {
        if (isRecommendationsShareUrl) {
          if (recommendationsRef.current && !scrolledWithUrl) {
            setScrolledWithUrl(true);
            scrollTo(recommendationsRef.current);
          }
        }
      }, 200);
      return () => clearTimeout(timeoutId);
    };

    scrollToChart();
    scrollToRecommendations();
  }, [chartId, metricRefs, isRecommendationsShareUrl, scrolledWithUrl]);

  const initialFipsList = useMemo(() => [region.fipsCode], [region.fipsCode]);

  const ccviScores = useCcviForFips(region.fipsCode);

  const onClickAlertSignup = useCallback(() => {
    trackEvent(
      EventCategory.ENGAGEMENT,
      EventAction.CLICK,
      `Location Header: Receive Alerts`,
    );
    scrollTo(shareBlockRef.current);
  }, []);

  const onClickShare = useCallback(() => {
    scrollTo(shareBlockRef.current, -352);
  }, []);

  const [clickedStatMetric, setClickedStatMetric] = useState<Metric | null>(
    null,
  );

  const onClickMetric = useCallback(
    (metric: Metric) => {
      trackEvent(
        EventCategory.METRICS,
        EventAction.CLICK,
        `Location Header Stats: ${Metric[metric]}`,
      );
      setClickedStatMetric(metric);
      const groupWithMetric = getChartGroupFromMetric(metric);
      const chartBlockRef = groupWithMetric
        ? chartBlockRefs[groupWithMetric.groupHeader]
        : null;
      if (chartBlockRef?.current) {
        scrollTo(chartBlockRef.current);
      }
    },
    [chartBlockRefs],
  );

  const onClickSparkLine = useCallback((metric: SparkLineMetric) => {
    trackEvent(
      EventCategory.METRICS,
      EventAction.CLICK,
      `Spark line: ${SparkLineMetric[metric]}`,
    );
    setCurrentExploreMetric(SparkLineToExploreMetric[metric]);
    scrollTo(exploreChartRef.current);
  }, []);

  if (!locationSummary) {
    return null;
  }
  const stats = summaryToStats(locationSummary);

  const [showCompareModal, setShowCompareModal] = useState(false);

  // TODO(pablo): Create separate refs for signup and share
  return (
    <>
      <LocationPageContentWrapper>
        <AboveTheFold
          region={region}
          locationSummary={locationSummary}
          onClickMetric={onClickMetric}
          onClickAlertSignup={onClickAlertSignup}
          onClickShare={onClickShare}
          onClickSparkLine={onClickSparkLine}
        />
        <BelowTheFold>
          <WidthContainer>
            <LocationPageBlock>
              <CompareMain
                stateName={getStateName(region) || region.name} // rename prop
                locationsViewable={6}
                stateId={(region as State).stateCode || undefined}
                region={region}
                showModal={showCompareModal}
                setShowModal={setShowCompareModal}
              />
            </LocationPageBlock>
            {!projections ? (
              <LoadingScreen />
            ) : (
              <LocationPageBlock>
                <Recommendations
                  region={region}
                  alarmLevel={projections.getAlarmLevel()}
                  recommendationsRef={recommendationsRef}
                  isHomepage={false}
                />
              </LocationPageBlock>
            )}
            {CHART_GROUPS.map((group: ChartGroup) => {
              const { groupHeader } = group;
              const groupRef = chartBlockRefs[groupHeader];
              return (
                <ErrorBoundary key={groupHeader}>
                  {!projections ? (
                    <LoadingScreen />
                  ) : (
                    <LocationPageBlock ref={groupRef}>
                      <ChartBlock
                        projections={projections}
                        isMobile={isMobile}
                        region={region}
                        stats={stats}
                        group={group}
                        clickedStatMetric={clickedStatMetric}
                      />
                    </LocationPageBlock>
                  )}
                </ErrorBoundary>
              );
            })}
            <LocationPageBlock id="vulnerabilities">
              <VulnerabilitiesBlock scores={ccviScores} region={region} />
            </LocationPageBlock>
            <LocationPageBlock ref={exploreChartRef} id="explore-chart">
              <Explore
                initialFipsList={initialFipsList}
                title="Trends"
                currentMetric={currentExploreMetric}
                setCurrentMetric={setCurrentExploreMetric}
              />
            </LocationPageBlock>
          </WidthContainer>
        </BelowTheFold>
      </LocationPageContentWrapper>
      <div ref={shareBlockRef}>
        <ShareModelBlock
          region={region}
          projections={projections}
          stats={stats}
        />
      </div>
    </>
  );
});

export default ChartsHolder;
