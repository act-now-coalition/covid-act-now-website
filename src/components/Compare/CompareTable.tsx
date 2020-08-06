import React, { useState, Fragment } from 'react';
import { sortBy, findIndex, partition } from 'lodash';
import {
  Wrapper,
  Footer,
  ViewAllLink,
  Header,
  UnknownsDisclaimer,
} from 'components/Compare/Compare.style';
import {
  DisclaimerWrapper,
  DisclaimerBody,
} from 'components/Disclaimer/Disclaimer.style';

import { Metric } from 'common/metric';
import { COLOR_MAP } from 'common/colors';
import LocationTable from './LocationTable';
import { SummaryForCompare } from 'common/utils/compare';

const CompareTable = (props: {
  stateName?: string;
  county?: any | null;
  setShowModal: any;
  isModal: boolean;
  locationsViewable?: number;
  isHomepage?: Boolean;
  locations: any;
  currentCounty?: any;
}) => {
  const [sorter, setSorter] = useState(5);
  const [sortDescending, setSortDescending] = useState(true);

  const orderedMetrics = [
    Metric.CASE_DENSITY,
    Metric.CASE_GROWTH_RATE,
    Metric.POSITIVE_TESTS,
    Metric.HOSPITAL_USAGE,
    Metric.CONTACT_TRACING,
  ];

  const currentCounty = props.county && props.currentCounty;

  const currentCountyFips = currentCounty
    ? currentCounty.locationInfo.full_fips_code
    : 0;

  const partitionedLocations = partition(
    props.locations,
    location => location.metricsInfo.metrics[sorter].value !== null,
  );
  const sortedLocationsWithValue = sortBy(
    partitionedLocations[0],
    location => location.metricsInfo.metrics[sorter].value,
  );
  const locationsWithNull = partitionedLocations[1];
  let sortedLocationsArr = sortedLocationsWithValue.concat(locationsWithNull);

  if (sortDescending) {
    sortedLocationsWithValue.reverse();
    sortedLocationsArr = sortedLocationsWithValue.concat(locationsWithNull);
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
    ? `${COLOR_MAP.GRAY_BODY_COPY}`
    : `${COLOR_MAP.GRAY.BASE}`;

  const arrowContainerProps = {
    sortDescending,
    sorter,
    arrowColorSelected,
    arrowColorNotSelected,
  };

  const headerCopy = props.isHomepage
    ? 'Compare states'
    : props.county
    ? 'Compare to other counties'
    : 'Compare counties';

  // checks if there are less counties than the default amount shown (10):
  const amountDisplayed =
    props.locationsViewable &&
    sortedLocationsArr.length < props.locationsViewable
      ? sortedLocationsArr.length
      : props.locationsViewable;

  const firstHeaderName = props.isHomepage ? 'State' : 'County';

  const sortedLocations = sortedLocationsArr
    .slice(0, locationsViewable)
    .filter(location => location.metricsInfo !== null);

  return (
    <Wrapper isModal={props.isModal} isHomepage={props.isHomepage}>
      {!props.isModal && <Header>{headerCopy}</Header>}
      <LocationTable
        firstHeaderName={firstHeaderName}
        setSorter={setSorter}
        setSortDescending={setSortDescending}
        metrics={orderedMetrics}
        isModal={props.isModal}
        {...arrowContainerProps}
        pinnedLocation={props.county ? currentCounty : null}
        pinnedLocationRank={currentCountyRank}
        sortedLocations={sortedLocations}
      />
      {!props.isModal && (
        <Fragment>
          <Footer>
            <span>
              {props.isHomepage &&
              locationsViewable === sortedLocationsArr.length
                ? ''
                : `Displaying 1-${amountDisplayed} of ${sortedLocationsArr.length}`}
            </span>
            <ViewAllLink onClick={() => props.setShowModal(true)}>
              {!props.isHomepage
                ? `View all counties in ${props.stateName}`
                : 'View all states'}
            </ViewAllLink>
          </Footer>
          {!props.isHomepage && (
            <DisclaimerWrapper>
              <DisclaimerBody>
                {props.stateName} only reports contact tracing and positive test
                rate at the state level.
              </DisclaimerBody>
            </DisclaimerWrapper>
          )}
        </Fragment>
      )}
    </Wrapper>
  );
};

export default CompareTable;
