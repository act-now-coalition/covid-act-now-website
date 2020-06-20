import React, { Fragment, useRef, useEffect } from 'react';

import {
  ChartContentWrapper,
  MainContentInner,
  ChartHeader,
  ChartDescription,
  ChartLocationName,
  BetaTag,
  ChartHeaderWrapper,
} from './ChartsHolder.style';
import NoCountyDetail from './NoCountyDetail';
import { Projections } from 'common/models/Projections';
import { Projection } from 'common/models/Projection';
import Disclaimer from 'components/Disclaimer/Disclaimer';
import ClaimStateBlock from 'components/ClaimStateBlock/ClaimStateBlock';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import NewLocationPageHeader from 'components/LocationPage/NewLocationPageHeader';
import Outcomes from 'components/Outcomes/Outcomes';
import ShareButtons from 'components/LocationPage/ShareButtons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  ChartRt,
  ChartPositiveTestRate,
  ChartICUHeadroom,
  ChartContactTracing,
  ChartFutureHospitalization,
} from 'components/Charts';
import { caseGrowthStatusText } from 'common/metrics/case_growth';
import { positiveTestsStatusText } from 'common/metrics/positive_rate';
import { hospitalOccupancyStatusText } from 'common/metrics/hospitalizations';
import { contactTracingStatusText } from 'common/metrics/contact_tracing';
import { generateChartDescription } from 'common/metrics/future_projection';
import { Metric, getMetricName } from 'common/metric';
import { COLORS } from 'common';
import { formatUtcDate } from 'common/utils';

import ChartContent from 'components/LocationPage/ChartContent';

// Occasionally we need to disable projections for states due to temporary bugs.
const FUTURE_PROJECTIONS_DISABLED_STATES: string[] = ['HI'];

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
  const noInterventionProjection: Projection = props.projections.baseline;

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

  let outcomesProjections = [
    props.projections.baseline,
    props.projections.projected,
  ];
  let outcomesColors = [COLORS.LIMITED_ACTION, COLORS.PROJECTED];

  const shareButtonProps = {
    chartId: props.chartId,
    stateId: props.stateId,
    countyId: props.countyId,
    county: props.county,
    stats: projection ? getChartSummarys(projection) : {},
    projections: props.projections,
    isMobile,
  };

  const futureProjectionsDisabled =
    FUTURE_PROJECTIONS_DISABLED_STATES.includes(props.stateId) &&
    !props.countyId;

  const chartDataForMap = [
    {
      chartRef: rtRangeRef,
      isMobile,
      data: rtRangeData,
      projection,
      shareButtonProps: shareButtonProps,
      metric: Metric.CASE_GROWTH_RATE,
      dataSet: 'rtRange',
      statusText: projection && caseGrowthStatusText(projection),
    },
    {
      chartRef: testPositiveRef,
      isMobile,
      data: testPositiveData,
      projection,
      shareButtonProps: shareButtonProps,
      metric: Metric.POSITIVE_TESTS,
      dataSet: 'testPositiveRate',
      statusText: projection && positiveTestsStatusText(projection),
    },
    {
      chartRef: icuUtilizationRef,
      isMobile,
      data: icuUtilizationData,
      projection,
      shareButtonProps: shareButtonProps,
      metric: Metric.HOSPITAL_USAGE,
      dataSet: 'icuUtilization',
      statusText: projection && hospitalOccupancyStatusText(projection),
    },
    {
      chartRef: contactTracingRef,
      isMobile,
      data: contactTracingData,
      projection,
      shareButtonProps: shareButtonProps,
      metric: Metric.CONTACT_TRACING,
      dataSet: 'contractTracers',
      statusText: projection && contactTracingStatusText(projection),
    },
    // {
    //   chartRef: futureProjectionsRef,
    //   futureProjectionsDisabled: futureProjectionsDisabled,
    //   noInterventionProjection: noInterventionProjection,
    //   isMobile,
    //   data: contactTracingData,
    //   projection,
    //   shareButtonProps: shareButtonProps,
    //   metric: Metric.CONTACT_TRACING,
    //   dataSet: 'contractTracers',
    //   statusText: projection && contactTracingStatusText(projection)
    // }
  ];

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
            <NewLocationPageHeader
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
              {chartDataForMap.map(chartData => (
                <ChartContent {...chartData} />
              ))}

              <ChartHeaderWrapper>
                <ChartHeader ref={futureProjectionsRef}>
                  Future Hospitalization (both ICU and non-ICU) Projections
                </ChartHeader>
                {!isMobile && !futureProjectionsDisabled && (
                  <ShareButtons
                    chartIdentifier={Metric.FUTURE_PROJECTIONS}
                    {...shareButtonProps}
                  />
                )}
              </ChartHeaderWrapper>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              {futureProjectionsDisabled ? (
                'Future hospitalization projections are not currently available. Check back soon.'
              ) : (
                <Fragment>
                  <ChartDescription>
                    {generateChartDescription(
                      projection,
                      noInterventionProjection,
                    )}
                  </ChartDescription>
                  {isMobile && (
                    <ShareButtons
                      chartIdentifier={Metric.FUTURE_PROJECTIONS}
                      {...shareButtonProps}
                    />
                  )}
                  <ChartFutureHospitalization projections={props.projections} />
                  <Outcomes
                    title={`Predicted outcomes by ${formatUtcDate(
                      props.projections.projected.finalDate,
                    )} (30 days from now)`}
                    projections={outcomesProjections}
                    colors={outcomesColors}
                  />
                </Fragment>
              )}
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
    projection?.currentIcuUtilization == null
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
