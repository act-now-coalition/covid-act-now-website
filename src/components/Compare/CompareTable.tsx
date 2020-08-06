import React, { useState } from 'react';
import { TableBody } from '@material-ui/core';
import { sortBy, findIndex, partition } from 'lodash';
import {
  Wrapper,
  StyledTable,
  TableHeadContainer,
  Row,
  Cell,
  Footer,
  ViewAllLink,
  Header,
} from 'components/Compare/Compare.style';
import CompareTableRow from 'components/Compare/CompareTableRow';
import HeaderCell from 'components/Compare/HeaderCell';
import { Metric } from 'common/metric';
import { COLOR_MAP } from 'common/colors';
import { SummaryForCompare } from 'common/utils/compare';

const CompareTable = (props: {
  stateId: string;
  stateName?: string;
  county?: any | null;
  setShowModal: any;
  isModal?: Boolean;
  locationsViewable?: number;
  isLocationPage?: Boolean;
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

  const useStickyHeader = props.isModal ? true : false;

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

  return (
    <Wrapper isModal={props.isModal}>
      {!props.isModal && <Header>{headerCopy}</Header>}
      <StyledTable isModal={props.isModal} stickyHeader={useStickyHeader}>
        <TableHeadContainer isModal={props.isModal}>
          <Row>
            <Cell locationHeaderCell={true}>
              <span>{props.isHomepage ? 'State' : 'County'}</span>
            </Cell>
            {orderedMetrics.map((metricInMap: any, i: number) => {
              return (
                <HeaderCell
                  metricInMap={metricInMap}
                  setSorter={setSorter}
                  setSortDescending={setSortDescending}
                  {...arrowContainerProps}
                  isModal={props.isModal}
                />
              );
            })}
          </Row>
        </TableHeadContainer>
        <TableBody>
          {props.county && (
            <CompareTableRow
              isCurrentCounty
              location={currentCounty}
              sorter={sorter}
              index={currentCountyRank}
            />
          )}
          {sortedLocationsArr &&
            sortedLocationsArr
              .slice(0, locationsViewable)
              .map((location: any, i: number) => {
                if (
                  location.metricsInfo === null ||
                  location.metricsInfo === null
                ) {
                  return;
                }
                return (
                  <CompareTableRow
                    sorter={sorter}
                    location={location}
                    index={i}
                  />
                );
              })}
        </TableBody>
      </StyledTable>
      {!props.isModal && (
        <Footer>
          <span>
            {props.isHomepage && locationsViewable === sortedLocationsArr.length
              ? ''
              : `Displaying 1-${amountDisplayed} of ${sortedLocationsArr.length}`}
          </span>
          <ViewAllLink onClick={() => props.setShowModal(true)}>
            {!props.isHomepage
              ? `View all counties in ${props.stateName}`
              : 'View all states'}
          </ViewAllLink>
        </Footer>
      )}
    </Wrapper>
  );
};

export default CompareTable;
