import React, { useRef, useEffect } from 'react';

import { ChartContentWrapper, MainContentInner } from './ChartsHolder.style';
import NoCountyDetail from './NoCountyDetail';
import { Projections } from 'common/models/Projections';
import { Projection } from 'common/models/Projection';
import ClaimStateBlock from 'components/ClaimStateBlock/ClaimStateBlock';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import LocationPageHeader from 'components/LocationPage/LocationPageHeader';
import ChartBlock from 'components/LocationPage/ChartBlock';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Metric } from 'common/metric';
import {
  ChartPrevalence,
  ChartPrevalenceDeaths,
  ChartCaseDensity,
} from 'components/Charts';

// TODO(michael): figure out where this type declaration should live.
type County = {
  county: string;
  county_url_name: string;
  county_fips_code: string;
  state_fips_code: string;
  state_code: string;
  full_fips_code: string;
  cities: string[];
  population: string;
};

// TODO: 180 is rough accounting for the navbar and searchbar;
// could make these constants so we don't have to manually update
const scrollTo = (div: null | HTMLDivElement, offset: number = 180) =>
  div &&
  window.scrollTo({
    left: 0,
    top: div.offsetTop - offset,
    behavior: 'smooth',
  });

//TODO(chelsi): implement a metricToShareButtons map to get rid of repeated instances of ShareButtons
const ChartsHolder = (props: {
  projections: Projections;
  stateId: string;
  county: County;
  chartId: string;
  countyId: string;
}) => {
  const projection: Projection | null = props.projections.primary;

  const {
    rtRangeData,
    testPositiveData,
    icuUtilizationData,
    contactTracingData,
  } = getChartData(projection);

  const rtRangeRef = useRef<HTMLDivElement>(null);
  const testPositiveRef = useRef<HTMLDivElement>(null);
  const icuUtilizationRef = useRef<HTMLDivElement>(null);
  const contactTracingRef = useRef<HTMLDivElement>(null);
  const futureProjectionsRef = useRef<HTMLDivElement>(null);
  const shareBlockRef = useRef<HTMLDivElement>(null);

  // TODO (chelsi): follow up with Michael about moving this hook down
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    const chartIdentifiers = ['0', '1', '2', '3', '4'];
    const scrollToChart = () => {
      const timeoutId = setTimeout(() => {
        if (props.chartId && !chartIdentifiers.includes(props.chartId)) return;
        else {
          if (props.chartId === '0' && rtRangeRef.current)
            scrollTo(rtRangeRef.current);
          if (props.chartId === '1' && testPositiveRef.current)
            scrollTo(testPositiveRef.current);
          if (props.chartId === '2' && icuUtilizationRef.current)
            scrollTo(icuUtilizationRef.current);
          if (props.chartId === '3' && contactTracingRef.current)
            scrollTo(contactTracingRef.current);
          if (props.chartId === '4' && futureProjectionsRef.current)
            scrollTo(futureProjectionsRef.current);
        }
      }, 200);
      return () => clearTimeout(timeoutId);
    };

    scrollToChart();
  }, [props.chartId]);

  const getChartSummarys = (projection: Projection) => {
    return {
      [Metric.CASE_GROWTH_RATE]: projection.rt,
      [Metric.HOSPITAL_USAGE]: projection.currentIcuUtilization,
      [Metric.POSITIVE_TESTS]: projection.currentTestPositiveRate,
      [Metric.CONTACT_TRACING]: projection.currentContactTracerMetric,
    };
  };

  const shareButtonProps = {
    chartId: props.chartId,
    stateId: props.stateId,
    countyId: props.countyId,
    county: props.county,
    stats: projection ? getChartSummarys(projection) : {},
    projections: props.projections,
    isMobile,
  };

  //TODO (chelsi): make it so we dont need to pre-generate props array (see comment in PR #970)
  const chartPropsForMap = projection
    ? [
        {
          chartRef: rtRangeRef,
          isMobile,
          data: rtRangeData,
          shareButtonProps,
          metric: Metric.CASE_GROWTH_RATE,
        },
        {
          chartRef: testPositiveRef,
          isMobile,
          data: testPositiveData,
          shareButtonProps,
          metric: Metric.POSITIVE_TESTS,
        },
        {
          chartRef: icuUtilizationRef,
          isMobile,
          data: icuUtilizationData,
          shareButtonProps,
          metric: Metric.HOSPITAL_USAGE,
        },
        {
          chartRef: contactTracingRef,
          isMobile,
          data: contactTracingData,
          shareButtonProps,
          metric: Metric.CONTACT_TRACING,
        },
        {
          chartRef: futureProjectionsRef,
          isMobile,
          shareButtonProps,
          metric: Metric.FUTURE_PROJECTIONS,
          projections: props.projections,
          countyId: props.countyId,
        },
      ]
    : [];

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
              stats={getChartSummarys(projection)}
              onRtRangeClick={() => scrollTo(rtRangeRef.current)}
              onTestPositiveClick={() => scrollTo(testPositiveRef.current)}
              onIcuUtilizationClick={() => scrollTo(icuUtilizationRef.current)}
              onContactTracingClick={() => scrollTo(contactTracingRef.current)}
              onHeaderShareClick={() => scrollTo(shareBlockRef.current, -215)}
              onHeaderSignupClick={() => scrollTo(shareBlockRef.current)}
              isMobile={isMobile}
            />
            <MainContentInner>
              <h1>Case Density</h1>
              <ChartCaseDensity
                series={[
                  projection.getDataset('caseDensityByCases'),
                  projection.getDataset('caseDensityByDeaths'),
                ]}
              />

              <h1>Case Density (by Cases)</h1>
              <ChartPrevalence
                columnData={projection.getDataset('caseDensityByCases')}
              />

              <h1>Case Density (by Deaths)</h1>
              <ChartPrevalenceDeaths
                columnData={projection.getDataset('caseDensityByDeaths')}
              />
              {chartPropsForMap.map(chartProps => (
                <ChartBlock
                  key={chartProps.metric}
                  projections={props.projections}
                  {...chartProps}
                  stateId={props.stateId}
                />
              ))}
            </MainContentInner>
            <ClaimStateBlock
              stateId={props.stateId}
              countyId={props.county?.county_url_name}
            />
          </ChartContentWrapper>
          <div ref={shareBlockRef}>
            <ShareModelBlock condensed={false} {...shareButtonProps} />
          </div>
        </>
      )}
    </>
  );
};

// Exported for use by AllStates.js.
export function getChartData(
  projection: Projection | null,
): {
  rtRangeData: any;
  testPositiveData: any;
  icuUtilizationData: any;
  contactTracingData: any;
} {
  const rtRangeData =
    projection?.rt == null
      ? null
      : projection.getDataset('rtRange').map(d => ({
          x: d.x,
          y: d.y?.rt,
          low: d.y?.low,
          hi: d.y?.high,
        }));

  const testPositiveData =
    projection?.currentTestPositiveRate == null
      ? null
      : projection.getDataset('testPositiveRate');

  const icuUtilizationData =
    projection?.currentIcuUtilization == null ||
    projection?.icuNearCapacityOverride
      ? null
      : projection.getDataset('icuUtilization');

  const contactTracingData =
    projection?.currentContactTracerMetric == null
      ? null
      : projection.getDataset('contractTracers');

  return {
    rtRangeData,
    testPositiveData,
    icuUtilizationData,
    contactTracingData,
  };
}

export default ChartsHolder;
