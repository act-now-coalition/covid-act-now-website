import React, { useState, useEffect } from 'react';
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
  const [sortOverallRisk, setSortOverallRisk] = useState(false);
  const [currentCountyIndex, setCurrentCountyIndex] = useState(0);

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

  const currentCounty: any = props.county
    ? {
        locationInfo: props.county,
        metricsInfo: countySummary(props.county.full_fips_code),
      }
    : {};

  const currentCountyFips = props.county
    ? currentCounty.locationInfo.full_fips_code
    : 0;

  useEffect(() => {
    if (props.county) {
      countiesArr.forEach((county: any, i: number) => {
        if (
          county.locationInfo.full_fips_code &&
          county.locationInfo.full_fips_code === currentCountyFips
        ) {
          setCurrentCountyIndex(i);
        }
      });
    }
  }, [sorter, sortDescending, props.county, countiesArr, currentCountyFips]);

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

  if (sortOverallRisk) {
    sortByOverallRisk();
  }

  if (sortDescending) {
    locationsArr.reverse();
  }

  const [locationsViewable, setLocationsViewable] = useState(
    props.locationsViewable || locationsArr.length,
  );

  const arrowColorSelected = props.isModal ? 'white' : 'black';
  const arrowColorNotSelected = props.isModal
    ? `${COLOR_MAP.GRAY_BODY_COPY}`
    : `${COLOR_MAP.GRAY.BASE}`;

  const arrowContainerProps = {
    sortDescending,
    sorter,
    arrowColorSelected,
    arrowColorNotSelected,
    sortOverallRisk,
  };

  const viewAllOnClick = () => {
    if (props.isHomepage) {
      if (locationsViewable === locationsArr.length) {
        setLocationsViewable(25);
      } else {
        setLocationsViewable(locationsArr.length);
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

  function alph(a: SummaryForCompare, b: SummaryForCompare) {
    const aToCompare = a.locationInfo.county
      ? a.locationInfo.county.toUpperCase()
      : a.locationInfo.state_code;
    const bToCompare = b.locationInfo.county
      ? b.locationInfo.county.toUpperCase()
      : b.locationInfo.state_code;
    if (sortDescending) {
      return aToCompare > bToCompare ? -1 : aToCompare < bToCompare ? 1 : 0;
    } else {
      return aToCompare < bToCompare ? -1 : aToCompare > bToCompare ? 1 : 0;
    }
  }

  function sortByOverallRisk() {
    locationsArr.sort((a: any, b: any) => {
      if (a.metricsInfo.level > b.metricsInfo.level) {
        return 1;
      }
      if (a.metricsInfo.level < b.metricsInfo.level) {
        return -1;
      } else {
        return alph(a, b);
      }
    });
  }

  return (
    <Wrapper isModal={props.isModal}>
      {!props.isModal && <Header>{headerCopy}</Header>}
      <StyledTable isModal={props.isModal} stickyHeader={useStickyHeader}>
        <TableHeadContainer isModal={props.isModal}>
          <Row tableHeader={true}>
            <Cell onClick={() => setSortOverallRisk(true)}>
              <span
                onClick={() => {
                  setSortDescending(!sortDescending);
                }}
              >
                {props.isHomepage ? 'State' : 'County'}
              </span>
              <ArrowContainer {...arrowContainerProps} isLocationHeader>
                <ExpandLessIcon onClick={() => setSortDescending(false)} />
                <ExpandMoreIcon onClick={() => setSortDescending(true)} />
                <span>OVERALL RISK LEVEL</span>
              </ArrowContainer>
            </Cell>
            {orderedMetrics.map((metricInMap: any, i: number) => {
              return (
                <HeaderCell
                  metricInMap={metricInMap}
                  setSorter={setSorter}
                  setSortDescending={setSortDescending}
                  {...arrowContainerProps}
                  setSortOverallRisk={setSortOverallRisk}
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
              index={currentCountyIndex}
            />
          )}
          {locationsArr &&
            locationsArr
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
            {props.isHomepage && locationsViewable === locationsArr.length
              ? ''
              : `Displaying 1-${props.locationsViewable}`}
          </span>
          <ViewAllLink onClick={viewAllOnClick}>
            {!props.isHomepage
              ? `View all counties in ${props.stateName} (${locationsArr.length})`
              : locationsViewable === locationsArr.length
              ? 'View less'
              : 'View all states'}
          </ViewAllLink>
        </Footer>
      )}
    </Wrapper>
  );
};

export default CompareTable;
