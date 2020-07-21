import React, { useState } from 'react';
import { TableBody } from '@material-ui/core';
import {
  Wrapper,
  StyledTable,
  ArrowContainer,
  TableHeadContainer,
  Row,
  Cell,
  Footer,
  ViewAllLink,
  Header,
} from 'components/Compare/Compare.style';
import CompareTableRow from 'components/Compare/CompareTableRow';
import HeaderCell from 'components/Compare/HeaderCell';
import { getLocationNames, Location } from 'common/locations';
import {
  stateSummary,
  countySummary,
  LocationSummary,
} from 'common/location_summaries';
import { Metric } from 'common/metric';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { COLOR_MAP } from 'common/colors';
import { fail } from 'common/utils';

const locations: any = getLocationNames();

export interface SummaryForCompare {
  locationInfo: Location;
  metricsInfo: LocationSummary;
}

const CompareTable = (props: {
  stateId?: string;
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

  const statesArr = locations
    .filter((location: Location) => !location.county)
    .map((stateInfo: Location) => {
      if (stateInfo.state_code) {
        return {
          locationInfo: stateInfo,
          metricsInfo: stateSummary(stateInfo.state_code),
        };
      } else {
        fail('No state code');
      }
    });

  const countiesArr = locations
    .filter(
      (location: Location) =>
        location.county && location.state_code === props.stateId,
    )
    .map((countyInfo: Location) => {
      if (countyInfo.full_fips_code) {
        return {
          locationInfo: countyInfo,
          metricsInfo: countySummary(countyInfo.full_fips_code),
        };
      } else {
        fail('No county fips');
      }
    });

  const locationsArr = props.isHomepage ? statesArr : countiesArr;

  locationsArr.sort((a: any, b: any) => {
    if (a.metricsInfo.metrics && b.metricsInfo.metrics) {
      if (
        a.metricsInfo.metrics[sorter].value >
        b.metricsInfo.metrics[sorter].value
      ) {
        return 1;
      } else {
        return -1;
      }
    }
  });

  if (sortDescending) {
    locationsArr.reverse();
  }

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

  const handleOpenModal = () => {
    props.setShowModal(true);
  };

  const useStickyHeader = props.isModal ? true : false;

  const finalLocationsViewable = props.locationsViewable || locationsArr.length;

  const headerCopy = props.isHomepage
    ? 'Compare states'
    : props.county
    ? 'Compare to other counties'
    : 'Compare counties';

  return (
    <Wrapper isModal={props.isModal}>
      {!props.isModal && <Header>{headerCopy}</Header>}
      <StyledTable isModal={props.isModal} stickyHeader={useStickyHeader}>
        <TableHeadContainer isModal={props.isModal}>
          <Row tableHeader={true}>
            <Cell>
              {props.isHomepage ? 'State' : 'County'}
              <ArrowContainer {...arrowContainerProps}>
                <ExpandLessIcon onClick={() => setSortDescending(false)} />
                <ExpandMoreIcon onClick={() => setSortDescending(true)} />
                <span>A-Z</span>
              </ArrowContainer>
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
          {locationsArr &&
            locationsArr
              .slice(0, finalLocationsViewable)
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
          <span>Displaying 1-{props.locationsViewable}</span>
          <ViewAllLink onClick={handleOpenModal}>
            {props.isHomepage
              ? 'View all states'
              : `View all counties in ${props.stateName} (${locationsArr.length})`}
          </ViewAllLink>
        </Footer>
      )}
    </Wrapper>
  );
};

export default CompareTable;
