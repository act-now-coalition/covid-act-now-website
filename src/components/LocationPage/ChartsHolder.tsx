import React, { useRef } from 'react';

import {
  ChartContentWrapper,
  MainContentInner,
  ChartHeader,
  ChartDescription,
  ChartLocationName,
  BetaTag,
  ChartHeaderWrapper,
} from './ChartsHolder.style';
import LocationPageHeader from 'components/LocationPage/LocationPageHeader';
import NoCountyDetail from './NoCountyDetail';
import { Projections } from 'common/models/Projections';
import { Projection } from 'common/models/Projection';
import SummaryStats from 'components/SummaryStats/SummaryStats';
import Disclaimer from 'components/Disclaimer/Disclaimer';
import ClaimStateBlock from 'components/ClaimStateBlock/ClaimStateBlock';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import Outcomes from 'components/Outcomes/Outcomes';
import ShareButtons from 'components/LocationPage/ShareButtons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

// TODO(michael): These format helpers should probably live in a more
// general-purpose location, not just for charts.
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

const scrollTo = (div: null | HTMLDivElement) =>
  div &&
  window.scrollTo({
    left: 0,
    // TODO: 180 is rough accounting for the navbar and searchbar;
    // could make these constants so we don't have to manually update
    top: div.offsetTop - 180,
    behavior: 'smooth',
  });

const ChartsHolder = (props: {
  projections: Projections;
  stateId: string;
  county: County;
}) => {
  const projection: Projection = props.projections.primary;
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const shareURL = `https://covidactnow.org/us/${props.stateId.toLowerCase()}${
    props.county ? `/county/${props.county.county_url_name}` : ''
  }`;

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
            <LocationPageHeader projections={props.projections} />
            <SummaryStats
              stats={getChartSummarys(projection)}
              onRtRangeClick={() => scrollTo(rtRangeRef.current)}
              onTestPositiveClick={() => scrollTo(testPositiveRef.current)}
              onIcuUtilizationClick={() => scrollTo(icuUtilizationRef.current)}
              onContactTracingClick={() => scrollTo(contactTracingRef.current)}
            />
            <MainContentInner>
              <ChartHeaderWrapper>
                <ChartHeader ref={rtRangeRef}>
                  {getMetricName(Metric.CASE_GROWTH_RATE)}
                </ChartHeader>
                {!isMobile && rtRangeData && (
                  <ShareButtons shareURL={`${shareURL}/?chart=0`} />
                )}
              </ChartHeaderWrapper>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              <ChartDescription>
                {caseGrowthStatusText(projection)}
              </ChartDescription>
              {isMobile && rtRangeData && (
                <ShareButtons shareURL={`${shareURL}/?chart=0`} />
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
                  <ShareButtons shareURL={`${shareURL}/?chart=1`} />
                )}
              </ChartHeaderWrapper>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              <ChartDescription>
                {positiveTestsStatusText(projection)}
              </ChartDescription>
              {isMobile && testPositiveData && (
                <ShareButtons shareURL={`${shareURL}/?chart=1`} />
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
                  <ShareButtons shareURL={`${shareURL}/?chart=2`} />
                )}
              </ChartHeaderWrapper>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              <ChartDescription>
                {hospitalOccupancyStatusText(projection)}
              </ChartDescription>
              {isMobile && icuUtilizationData && (
                <ShareButtons shareURL={`${shareURL}/?chart=2`} />
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
              </ChartHeaderWrapper>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              <ChartDescription>
                {contactTracingStatusText(projection)}
              </ChartDescription>
              {/* TODO: Use contact tracing data here */}
              {contactTracingData && (
                <>
                  <ChartContactTracing columnData={contactTracingData} />
                  <Disclaimer>
                    <a
                      href="https://science.sciencemag.org/content/368/6491/eabb6936"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Experts recommend
                    </a>{' '}
                    that at least 70% of contacts for each new case must be
                    traced within 48 hours in order to contain COVID. Experts
                    estimate that tracing each new case within 48 hours requires
                    an average of 10 contact tracers per new case, as well as
                    fast testing. Our contact tracing data is sourced from{' '}
                    <a
                      href="https://testandtrace.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      testandtrace.com
                    </a>{' '}
                    and NPR.{' '}
                    <a
                      href="https://blog.covidactnow.org/modeling-metrics-critical-to-reopen-safely/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn more
                    </a>
                    .
                  </Disclaimer>
                </>
              )}
              <ChartHeaderWrapper>
                <ChartHeader>
                  Future Hospitalization (both ICU and non-ICU) Projections
                </ChartHeader>
                {!isMobile && (
                  <ShareButtons shareURL={`${shareURL}/?chart=3`} />
                )}
              </ChartHeaderWrapper>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              <ChartDescription>
                {generateChartDescription(projection, noInterventionProjection)}
              </ChartDescription>
              {isMobile && <ShareButtons shareURL={`${shareURL}/?chart=3`} />}
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
          <ShareModelBlock
            condensed={false}
            stateId={props.stateId}
            county={props.county}
            projections={props.projections}
            stats={getChartSummarys(projection)}
          />
        </>
      )}
    </>
  );
};

// Exported for use by AllStates.js.
export function getChartData(
  projection: Projection,
): {
  rtRangeData: any;
  testPositiveData: any;
  icuUtilizationData: any;
  contactTracingData: any;
} {
  const rtRangeData =
    projection &&
    projection.rt &&
    projection.getDataset('rtRange').map(d => ({
      x: d.x,
      y: d.y?.rt,
      low: d.y?.low,
      hi: d.y?.high,
    }));

  const testPositiveData =
    projection &&
    projection.currentTestPositiveRate &&
    projection.getDataset('testPositiveRate');

  const icuUtilizationData =
    projection &&
    projection.currentIcuUtilization &&
    projection.getDataset('icuUtilization');

  const contactTracingData =
    projection &&
    projection.currentContactTracerMetric &&
    projection.getDataset('contractTracers');

  return {
    rtRangeData,
    testPositiveData,
    icuUtilizationData,
    contactTracingData,
  };
}

export default ChartsHolder;
