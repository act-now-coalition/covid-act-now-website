import React, { useState, useRef } from 'react';
import { TableBody } from '@material-ui/core';
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
import { Location } from 'common/locations';
import { countySummary, LocationSummary } from 'common/location_summaries';
import { Metric } from 'common/metric';
import { COLOR_MAP } from 'common/colors';
import { sortBy, findIndex } from 'lodash';
import { getStatesArr, getCountiesArr } from 'common/utils/compare';

export interface SummaryForCompare {
  locationInfo: Location;
  metricsInfo: LocationSummary;
}

const scrollTo = (div: null | HTMLDivElement) =>
  div &&
  window.scrollTo({
    left: 0,
    top: div.offsetTop - 75,
    behavior: 'smooth',
  });

const CompareTable = (props: {
  stateId: string;
  stateName?: string;
  county?: any | null;
  setShowModal: any;
  isModal?: Boolean;
  locationsViewable?: number;
  isLocationPage?: Boolean;
  isHomepage?: Boolean;
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

  const statesArr = getStatesArr();
  const countiesArr = getCountiesArr(props.stateId);

  const currentCounty: any = props.county
    ? {
        locationInfo: props.county,
        metricsInfo: countySummary(props.county.full_fips_code),
      }
    : {};

  const currentCountyFips = props.county
    ? currentCounty.locationInfo.full_fips_code
    : 0;

  const locationsArr = props.isHomepage ? statesArr : countiesArr;

  const sortedLocationsArr = sortBy(
    locationsArr,
    location => location.metricsInfo.metrics[sorter].value,
  );

  if (sortDescending) {
    sortedLocationsArr.reverse();
  }

  const currentCountyRank = findIndex(
    sortedLocationsArr,
    (location: SummaryForCompare) =>
      location.locationInfo.full_fips_code === currentCountyFips,
  );

  const [locationsViewable, setLocationsViewable] = useState(
    props.locationsViewable || sortedLocationsArr.length,
  );

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

  const tableRef = useRef<HTMLDivElement>(null);

  const scrollToTable = () => {
    if (tableRef.current) {
      scrollTo(tableRef.current);
    }
  };

  // delay allows page to scroll back up to the table header before collpasing to 10 rows
  // makes table collpasing look smoother
  const viewLess = () => {
    const timeoutId = setTimeout(() => {
      setLocationsViewable(10);
    }, 400);
    return () => clearTimeout(timeoutId);
  };

  const viewAllOnClick = () => {
    if (props.isHomepage) {
      if (locationsViewable === sortedLocationsArr.length) {
        scrollToTable();
        viewLess();
      } else {
        setLocationsViewable(sortedLocationsArr.length);
      }
    } else {
      props.setShowModal(true);
    }
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
    <Wrapper isModal={props.isModal} ref={tableRef}>
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
          <ViewAllLink onClick={viewAllOnClick}>
            {!props.isHomepage
              ? `View all counties in ${props.stateName}`
              : locationsViewable === sortedLocationsArr.length
              ? 'View less'
              : 'View all states'}
          </ViewAllLink>
        </Footer>
      )}
    </Wrapper>
  );
};

export default CompareTable;
