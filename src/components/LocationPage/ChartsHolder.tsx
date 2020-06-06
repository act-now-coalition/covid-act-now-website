import React, { useRef, useEffect } from 'react';

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
import { Projection, TRACERS_NEEDED_PER_CASE } from 'common/models/Projection';
import SummaryStats from 'components/SummaryStats/SummaryStats';
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
import {
  caseGrowthStatusText,
  CASE_GROWTH_DISCLAIMER,
} from 'common/metrics/case_growth';
import {
  positiveTestsStatusText,
  POSITIVE_RATE_DISCLAIMER,
} from 'common/metrics/positive_rate';
import {
  hospitalOccupancyStatusText,
  HOSPITALIZATIONS_DISCLAIMER,
} from 'common/metrics/hospitalizations';
import { generateChartDescription } from 'common/metrics/future_projection';
import { contactTracingStatusText } from 'common/metrics/contact_tracing';
import { Metric, getMetricName } from 'common/metric';
import { COLORS } from 'common';
import { formatDate } from 'common/utils';

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
              <ChartHeaderWrapper>
                <ChartHeader ref={rtRangeRef}>
                  {getMetricName(Metric.CASE_GROWTH_RATE)}
                </ChartHeader>
                {!isMobile && rtRangeData && (
                  <ShareButtons chartIdentifier="0" {...shareButtonProps} />
                )}
              </ChartHeaderWrapper>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              <ChartDescription>
                {caseGrowthStatusText(projection)}
              </ChartDescription>
              {isMobile && rtRangeData && (
                <ShareButtons chartIdentifier="0" {...shareButtonProps} />
              )}
              {rtRangeData && (
                <>
                  <ChartRt columnData={projection.getDataset('rtRange')} />
                  <Disclaimer metricName="infection growth rate">
                    {CASE_GROWTH_DISCLAIMER}
                  </Disclaimer>
                </>
              )}
              <ChartHeaderWrapper>
                <ChartHeader ref={testPositiveRef}>
                  {getMetricName(Metric.POSITIVE_TESTS)}
                </ChartHeader>
                {!isMobile && testPositiveData && (
                  <ShareButtons chartIdentifier="1" {...shareButtonProps} />
                )}
              </ChartHeaderWrapper>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              <ChartDescription>
                {positiveTestsStatusText(projection)}
              </ChartDescription>
              {isMobile && testPositiveData && (
                <ShareButtons chartIdentifier="1" {...shareButtonProps} />
              )}
              {testPositiveData && (
                <>
                  <ChartPositiveTestRate columnData={testPositiveData} />
                  <Disclaimer metricName="positive test rate">
                    {POSITIVE_RATE_DISCLAIMER}
                  </Disclaimer>
                </>
              )}
              <ChartHeaderWrapper>
                <ChartHeader ref={icuUtilizationRef}>
                  {getMetricName(Metric.HOSPITAL_USAGE)}
                  <BetaTag>Beta</BetaTag>
                </ChartHeader>
                {!isMobile && icuUtilizationData && (
                  <ShareButtons chartIdentifier="2" {...shareButtonProps} />
                )}
              </ChartHeaderWrapper>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              <ChartDescription>
                {hospitalOccupancyStatusText(projection)}
              </ChartDescription>
              {isMobile && icuUtilizationData && (
                <ShareButtons chartIdentifier="2" {...shareButtonProps} />
              )}
              {icuUtilizationData && (
                <>
                  <ChartICUHeadroom columnData={icuUtilizationData} />
                  <Disclaimer metricName="COVID ICU usage">
                    <a
                      href="https://preventepidemics.org/wp-content/uploads/2020/04/COV020_WhenHowTightenFaucet_v3.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resolve to Save Lives
                    </a>
                    {HOSPITALIZATIONS_DISCLAIMER}
                  </Disclaimer>
                </>
              )}
              <ChartHeaderWrapper>
                <ChartHeader ref={contactTracingRef}>
                  {getMetricName(Metric.CONTACT_TRACING)}
                  <BetaTag>Beta</BetaTag>
                </ChartHeader>
                {!isMobile && contactTracingData && (
                  <ShareButtons chartIdentifier="3" {...shareButtonProps} />
                )}
              </ChartHeaderWrapper>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              <ChartDescription>
                {contactTracingStatusText(projection)}
              </ChartDescription>
              {isMobile && contactTracingData && (
                <ShareButtons chartIdentifier="3" {...shareButtonProps} />
              )}
              {/* TODO: Use contact tracing data here */}
              {contactTracingData && (
                <>
                  <ChartContactTracing columnData={contactTracingData} />
                  <Disclaimer>
                    <a
                      href="https://covidlocal.org/assets/documents/COVID%20Local%20Metrics%20overview.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Experts recommend
                    </a>{' '}
                    {`that at least 90% of contacts for each new case must be
                    traced within 48 hours in order to contain COVID. Experts
                    estimate that tracing each new case within 48 hours requires
                    an average of ${TRACERS_NEEDED_PER_CASE} contact tracers per
                    new case, as well as fast testing.`}
                  </Disclaimer>
                </>
              )}
              <ChartHeaderWrapper>
                <ChartHeader ref={futureProjectionsRef}>
                  Future Hospitalization (both ICU and non-ICU) Projections
                </ChartHeader>
                {!isMobile && (
                  <ShareButtons chartIdentifier="4" {...shareButtonProps} />
                )}
              </ChartHeaderWrapper>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              <ChartDescription>
                {generateChartDescription(projection, noInterventionProjection)}
              </ChartDescription>
              {isMobile && (
                <ShareButtons chartIdentifier="4" {...shareButtonProps} />
              )}
              <ChartFutureHospitalization projections={props.projections} />
              <Outcomes
                title={`Predicted outcomes by ${formatDate(
                  props.projections.projected.finalDate,
                )} (90 days from now)`}
                projections={outcomesProjections}
                colors={outcomesColors}
              />
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
