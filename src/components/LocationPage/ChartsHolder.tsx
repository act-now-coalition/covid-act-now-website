import React, { useRef, useEffect, useMemo } from 'react';
import { ChartContentWrapper, MainContentInner } from './ChartsHolder.style';
import NoCountyDetail from './NoCountyDetail';
import { Projections } from 'common/models/Projections';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import LocationPageHeader from 'components/LocationPage/LocationPageHeader';
import ChartBlock from 'components/LocationPage/ChartBlock';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Metric, ALL_METRICS } from 'common/metric';
import CompareMain from 'components/Compare/CompareMain';
import Explore from 'components/Explore';
import { County } from 'common/locations';
import Recommend from 'components/Recommend';
import {
  getDynamicIntroCopy,
  getRecommendations,
} from 'common/utils/recommend';
import { mainContent } from 'cms-content/recommendations';

// TODO: 180 is rough accounting for the navbar and searchbar;
// could make these constants so we don't have to manually update
const scrollTo = (div: null | HTMLDivElement, offset: number = 180) =>
  div &&
  window.scrollTo({
    left: 0,
    top: div.offsetTop - offset,
    behavior: 'smooth',
  });

const ChartsHolder = (props: {
  projections: Projections;
  stateId: string;
  county: County;
  chartId: string;
  countyId: string;
}) => {
  const { chartId } = props;
  const projection = props.projections.primary;

  const metricRefs = {
    [Metric.CASE_DENSITY]: useRef<HTMLDivElement>(null),
    [Metric.CASE_GROWTH_RATE]: useRef<HTMLDivElement>(null),
    [Metric.POSITIVE_TESTS]: useRef<HTMLDivElement>(null),
    [Metric.HOSPITAL_USAGE]: useRef<HTMLDivElement>(null),
    [Metric.CONTACT_TRACING]: useRef<HTMLDivElement>(null),
  };
  const shareBlockRef = useRef<HTMLDivElement>(null);
  const exploreChartRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

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

    scrollToChart();
  }, [chartId, metricRefs]);

  const shareButtonProps = {
    chartId: props.chartId,
    stateId: props.stateId,
    countyId: props.countyId,
    county: props.county,
    stats: projection ? props.projections.getMetricValues() : {},
    projections: props.projections,
    isMobile,
  };

  const initialFipsList = useMemo(() => {
    return [props.projections.primary.fips];
  }, [props.projections.primary.fips]);

  const recommendationsIntro = getDynamicIntroCopy(
    projection.locationName,
    props.projections.getMetricValues(),
  );

  const recommendationsMainContent = getRecommendations(
    projection,
    mainContent.recommendations,
  );

  // TODO(pablo): Create separate refs for signup and share
  return (
    <>
      {!projection ? (
        <NoCountyDetail
          countyId={props.county?.county_url_name}
          stateId={props.stateId}
        />
      ) : (
        <>
          <ChartContentWrapper>
            <LocationPageHeader
              projections={props.projections}
              stats={props.projections.getMetricValues()}
              onMetricClick={metric => scrollTo(metricRefs[metric].current)}
              onHeaderShareClick={() => scrollTo(shareBlockRef.current, -372)}
              onHeaderSignupClick={() => scrollTo(shareBlockRef.current)}
              onNewUpdateClick={() => scrollTo(exploreChartRef.current)}
              isMobile={isMobile}
            />
            <CompareMain
              stateName={props.projections.stateName}
              county={props.county}
              locationsViewable={6}
              stateId={props.stateId}
            />
            <MainContentInner>
              <Recommend
                introCopy={recommendationsIntro}
                recommendations={recommendationsMainContent}
                locationName={projection.locationName}
              />
              {ALL_METRICS.map(metric => (
                <ChartBlock
                  key={metric}
                  metric={metric}
                  projections={props.projections}
                  chartRef={metricRefs[metric]}
                  shareButtonProps={shareButtonProps}
                  isMobile={isMobile}
                  stateId={props.stateId}
                />
              ))}
            </MainContentInner>
            <MainContentInner ref={exploreChartRef}>
              <Explore
                initialFipsList={initialFipsList}
                title="Cases, Deaths, and Hospitalizations"
              />
            </MainContentInner>
          </ChartContentWrapper>
          <div ref={shareBlockRef}>
            <ShareModelBlock {...shareButtonProps} />
          </div>
        </>
      )}
    </>
  );
};

export default ChartsHolder;
