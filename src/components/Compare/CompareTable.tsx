import React, { useState, Fragment } from 'react';
import { sortBy, findIndex, partition, reverse } from 'lodash';
import {
  Wrapper,
  Footer,
  ViewAllLink,
  HeaderWrapper,
  Header,
  DisclaimerWrapper,
} from 'components/Compare/Compare.style';
import { Metric } from 'common/metric';
import { COLOR_MAP } from 'common/colors';
import LocationTable from './LocationTable';
import { SummaryForCompare, RankedLocationSummary } from 'common/utils/compare';
import { ChartLocationName } from 'components/LocationPage/ChartsHolder.style';

export const orderedMetrics = [
  Metric.CASE_DENSITY,
  Metric.CASE_GROWTH_RATE,
  Metric.POSITIVE_TESTS,
  Metric.HOSPITAL_USAGE,
  Metric.CONTACT_TRACING,
];

const CompareTable = (props: {
  stateName?: string;
  county?: any | null;
  setShowModal: any;
  isModal: boolean;
  locationsViewable?: number;
  isHomepage?: boolean;
  locations: any;
  currentCounty?: any;
}) => {
  const [sorter, setSorter] = useState(5);
  const [sortDescending, setSortDescending] = useState(true);
  const [sortByPopulation, setSortByPopulation] = useState(false);

  const currentCounty = props.county && props.currentCounty;

  const currentCountyFips = currentCounty
    ? currentCounty.locationInfo.full_fips_code
    : 0;

  function sortLocationsBy(
    locations: SummaryForCompare[],
    getValue: (location: SummaryForCompare) => number | undefined,
  ) {
    const [locationsWithValue, locationsWithoutValue] = partition(
      locations,
      getValue,
    );
    const sortedLocationsAsc = sortBy(locationsWithValue, getValue);
    const sortedLocations = sortDescending
      ? reverse(sortedLocationsAsc)
      : sortedLocationsAsc;
    return [...sortedLocations, ...locationsWithoutValue];
  }

  const getPopulation = (location: SummaryForCompare) =>
    location?.locationInfo?.population;
  const getMetricValue = (location: any) =>
    location.metricsInfo.metrics[sorter].value;

  let sortedLocationsArr = props.locations;

  if (sortByPopulation) {
    sortedLocationsArr = sortLocationsBy(props.locations, getPopulation);
  } else {
    sortedLocationsArr = sortLocationsBy(props.locations, getMetricValue);
  }

  const currentCountyRank = findIndex(
    sortedLocationsArr,
    (location: SummaryForCompare) =>
      location.locationInfo.full_fips_code === currentCountyFips,
  );

  const locationsViewable =
    props.locationsViewable || sortedLocationsArr.length;

  //TODO (chelsi): make this a theme-
  const arrowColorSelected = props.isModal ? 'white' : 'black';
  const arrowColorNotSelected = props.isModal
    ? '#828282'
    : `${COLOR_MAP.GRAY.BASE}`;

  const arrowContainerProps = {
    sortDescending,
    sorter,
    arrowColorSelected,
    arrowColorNotSelected,
  };

  const headerCopy = props.isHomepage
    ? 'States comparison'
    : 'Counties comparison';

  // checks if there are less counties than the default amount shown (10):
  const amountDisplayed =
    props.locationsViewable &&
    sortedLocationsArr.length < props.locationsViewable
      ? sortedLocationsArr.length
      : props.locationsViewable;

  const firstHeaderName = props.isHomepage
    ? 'State'
    : props.isModal
    ? 'Counties'
    : 'County';

  const sortedLocations: RankedLocationSummary[] = sortedLocationsArr
    .filter((location: SummaryForCompare) => location.metricsInfo !== null)
    .map((summary: SummaryForCompare, i: any) => ({ rank: i + 1, ...summary }));

  const currentLocation = props.county
    ? { rank: currentCountyRank + 1, ...currentCounty }
    : null;

  const disclaimerRedirect =
    currentCounty &&
    `/us/${currentCounty.locationInfo.state_code.toLowerCase()}/chart/${
      Metric.CONTACT_TRACING
    }`;

  return (
    <Wrapper isModal={props.isModal} isHomepage={props.isHomepage}>
      {!props.isModal && (
        <HeaderWrapper>
          <Header>{headerCopy}</Header>
          {props.stateName && (
            <ChartLocationName>{props.stateName}</ChartLocationName>
          )}
        </HeaderWrapper>
      )}
      <LocationTable
        firstHeaderName={firstHeaderName}
        setSorter={setSorter}
        setSortDescending={setSortDescending}
        metrics={orderedMetrics}
        isModal={props.isModal}
        {...arrowContainerProps}
        pinnedLocation={currentLocation}
        sortedLocations={sortedLocations}
        numLocations={locationsViewable}
        stateName={props.stateName}
        setSortByPopulation={setSortByPopulation}
        sortByPopulation={sortByPopulation}
        isHomepage={props.isHomepage}
      />
      {!props.isModal && (
        <Fragment>
          <Footer isCounty={props.county}>
            <div>
              {locationsViewable !== sortedLocationsArr.length && (
                <span>
                  Displaying <strong>{amountDisplayed}</strong> of{' '}
                  <strong>{sortedLocationsArr.length}</strong>{' '}
                </span>
              )}
              <ViewAllLink onClick={() => props.setShowModal(true)}>
                {!props.isHomepage
                  ? `View all counties in ${props.stateName}`
                  : 'View all states'}
              </ViewAllLink>
            </div>
            {props.county && (
              <DisclaimerWrapper>
                <span>
                  Most states report contact tracing at the state-level only.
                  View {props.stateName}'s{' '}
                  <a
                    href={disclaimerRedirect}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    contact tracing{' '}
                  </a>
                  data.
                </span>
              </DisclaimerWrapper>
            )}
          </Footer>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default CompareTable;
