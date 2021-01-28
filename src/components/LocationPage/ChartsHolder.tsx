import React, { useRef, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ChartContentWrapper, MainContentInner } from './ChartsHolder.style';
import { Projections } from 'common/models/Projections';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import LocationPageHeader from 'components/LocationPage/LocationPageHeader';
import ChartBlock from 'components/LocationPage/ChartBlock';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Metric, ALL_METRICS } from 'common/metric';
import CompareMain from 'components/Compare/CompareMain';
import Explore, { ExploreMetric } from 'components/Explore';
import Recommend from 'components/Recommend';
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
import { getRecommendationsShareUrl } from 'common/urls';
import { Region, State, getStateName } from 'common/regions';

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
  projections: Projections;
  region: Region;
  chartId: string;
}
const ChartsHolder = ({ projections, region, chartId }: ChartsHolderProps) => {
  const projection = projections.primary;

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

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

  const stats = projection ? projections.getMetricValues() : {};
  const initialFipsList = useMemo(() => {
    return [projections.primary.fips];
  }, [projections.primary.fips]);

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

  const alarmLevel = projections.getAlarmLevel();
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

  // TODO(pablo): Create separate refs for signup and share
  return (
    <>
      <ChartContentWrapper>
        <LocationPageHeader
          projections={projections}
          stats={projections.getMetricValues()}
          onMetricClick={metric => scrollTo(metricRefs[metric].current)}
          onHeaderShareClick={() => scrollTo(shareBlockRef.current, -372)}
          onHeaderSignupClick={() => scrollTo(shareBlockRef.current)}
          isMobile={isMobile}
          region={region}
        />
        <CompareMain
          stateName={getStateName(region) || region.name} // rename prop
          locationsViewable={6}
          stateId={(region as State).stateCode || undefined}
          region={region}
        />
        <MainContentInner>
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
          {ALL_METRICS.map(metric => (
            <ChartBlock
              key={metric}
              metric={metric}
              projections={projections}
              chartRef={metricRefs[metric]}
              isMobile={isMobile}
              region={region}
              stats={stats}
            />
          ))}
        </MainContentInner>
        <MainContentInner ref={exploreChartRef} id="explore-chart">
          <Explore
            initialFipsList={initialFipsList}
            title="Cases, Deaths, and Hospitalizations"
            defaultMetric={defaultExploreMetric}
          />
        </MainContentInner>
      </ChartContentWrapper>
      <div ref={shareBlockRef} id="recommendationsTest">
        <ShareModelBlock
          region={region}
          projections={projections}
          stats={stats}
        />
      </div>
    </>
  );
};

export default ChartsHolder;
