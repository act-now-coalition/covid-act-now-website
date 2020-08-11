import styled from 'styled-components';
import { isNumber } from 'lodash';
import { TableHead, TableCell, TableRow, Table } from '@material-ui/core';
import { COLOR_MAP, LEVEL_COLOR } from 'common/colors';
import { COLORS } from 'common';
import { Metric } from 'common/metric';
import { Level } from 'common/level';
import { ChartLocationName } from 'components/LocationPage/ChartsHolder.style';

export const locationNameCellWidth = 145;
export const metricCellWidth = 120;

const LEVEL_COLOR_CONTACT_TRACING = {
  [Level.LOW]: COLOR_MAP.RED.BASE,
  [Level.MEDIUM]: COLOR_MAP.ORANGE_DARK.BASE,
  [Level.HIGH]: COLOR_MAP.ORANGE.BASE,
  [Level.CRITICAL]: COLOR_MAP.GREEN.BASE,
  [Level.UNKNOWN]: COLOR_MAP.GRAY.BASE,
};

export const Wrapper = styled.div<{ isModal?: Boolean; isHomepage?: Boolean }>`
  max-width: ${({ isHomepage }) => (isHomepage ? '1000px' : '900px')};
  width: 100%;
  margin: ${({ isModal }) => (isModal ? '0 auto' : '1rem auto')};
  background: white;
  max-height: ${({ isModal }) => isModal && '100vh'};

  @media (min-width: 600px) {
    margin: ${({ isModal }) => (isModal ? '0 auto' : '3rem auto')};
    max-height: ${({ isModal }) => (isModal ? '80vh' : 'unset')};
  }

  @media (min-width: 1060px) {
    margin: ${({ isModal }) => (isModal ? '0 auto' : '3rem auto 2rem')};
  }

  @media (min-width: 1350px) {
    margin: ${({ isModal }) => (isModal ? '0 auto' : '3rem 445px 2rem auto')};
  }

  @media (min-width: 1750px) {
    margin: ${({ isModal }) => (isModal ? '0 auto' : '3rem auto 2rem')};
  }

  table {
    border-spacing: 0;

    th,
    td {
      &:first-child {
        width: 25%;
        min-width: ${locationNameCellWidth}px;
      }

      &:not(:first-child) {
        width: 15%;
        min-width: ${metricCellWidth}px;
      }
    }
  }

  ${ChartLocationName} {
    margin: 0.25rem 0;
  }
`;

export const StyledTable = styled(Table)<{ isModal?: Boolean }>`
  border: ${({ isModal }) => !isModal && `1px solid ${COLORS.LIGHTGRAY}`};
`;

// TODO (Chelsi): turn this background-color situation into a theme asap
export const Cell = styled(TableCell)<{
  locationHeaderCell?: Boolean;
  sorter?: any;
  metricInMap?: Metric;
  isModal: Boolean;
}>`
  cursor: ${({ locationHeaderCell }) => !locationHeaderCell && 'pointer'};
  text-transform: uppercase;
  font-size: 0.9rem;
  background-color: ${({ locationHeaderCell, sorter, metricInMap }) =>
    !locationHeaderCell && sorter === metricInMap && 'rgba(0,0,0,0.02)'};
  background-color: ${({ locationHeaderCell, sorter, metricInMap, isModal }) =>
    isModal && !locationHeaderCell && sorter === metricInMap && 'black'};
  background-color: ${({ locationHeaderCell, sorter, metricInMap, isModal }) =>
    isModal &&
    !locationHeaderCell &&
    sorter !== metricInMap &&
    `${COLOR_MAP.GRAY_BODY_COPY}`};
  background-color: ${({ locationHeaderCell, isModal }) =>
    isModal && locationHeaderCell && `${COLOR_MAP.GRAY_BODY_COPY}`};
`;

export const TableHeadContainer = styled(TableHead)<{ isModal?: Boolean }>`
  ${Cell} {
    vertical-align: bottom;
    line-height: 1.1rem;
    padding: 1rem 1rem 0.8rem;
    color: ${({ isModal }) => isModal && 'white'};
    border-bottom: ${({ isModal }) =>
      !isModal && `2px solid ${COLORS.LIGHTGRAY}`};

    &:nth-child(2) {
      border-left: ${({ isModal }) =>
        !isModal && `2px solid ${COLORS.LIGHTGRAY}`};
    }
  }
`;

export const MetricCell = styled.td<{
  countyName?: Boolean;
  iconColor?: Level;
  sorter?: any;
  metric?: Metric;
}>`
  text-align: left;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  cursor: pointer;

  &:first-child {
    min-width: ${locationNameCellWidth}px;
    &:hover {
      color: ${COLOR_MAP.BLUE};
    }
  }

  &:nth-child(2) {
    border-left: 2px solid ${COLORS.LIGHTGRAY};
  }

  &:not(:first-child) {
    min-width: ${metricCellWidth}px;
    font-family: Source Code Pro;
    color: ${({ sorter, metric }) =>
      sorter === metric ? 'black' : `${COLOR_MAP.GRAY_BODY_COPY}`};
    font-weight: ${({ sorter, metric }) => sorter === metric && '600'};
    background-color: ${({ sorter, metric }) =>
      sorter === metric && 'rgba(0,0,0,0.02)'};
  }

  svg {
    margin-right: 0.4rem;
    font-size: 0.75rem;
    color: ${({ iconColor }) =>
      iconColor !== undefined && `${LEVEL_COLOR[iconColor]}`};
  }

  span {
    font-family: Source Code Pro;
    color: ${COLOR_MAP.GRAY_BODY_COPY};
    margin-right: 0.75rem;
  }

  &:last-child {
    svg {
      color: ${({ iconColor }) =>
        iconColor !== undefined && `${LEVEL_COLOR_CONTACT_TRACING[iconColor]}`};
    }
  }
`;

export const MetricValue = styled.span`
  width: 48px;
  display: inline-block;
  text-align: right;
`;

export const Row = styled(TableRow)<{
  index?: number;
  isCurrentCounty?: boolean;
  isModal?: boolean;
}>`
  background-color: ${({ index }) =>
    !isNumber(index) ? 'white' : index % 2 === 0 ? '#fafafa' : 'white'};
  background-color: ${({ isModal }) =>
    isModal && `${COLOR_MAP.GRAY_BODY_COPY}`};
  background-color: ${({ isCurrentCounty }) => isCurrentCounty && '#FFEFD6'};
  border-bottom: none;

  th {
    border-bottom: none;
  }

  &:hover {
    color: ${COLOR_MAP.BLUE};
  }
`;

export const ArrowContainer = styled.div<{
  sortDescending: Boolean;
  sorter?: Metric;
  metric?: Metric;
  arrowColorSelected: string;
  arrowColorNotSelected: string;
  isLocationHeader?: Boolean;
  isModal?: Boolean;
}>`
  color: #bdbdbd;
  display: flex;
  font-family: Roboto;
  font-size: 0.875rem;
  transform: translate(-0.25rem, 0.15rem);
  margin-top: 0.25rem;

  span {
    margin: auto 0 auto 0.25rem;
  }

  svg {
    &:nth-child(2) {
      color: ${({
        sortDescending,
        sorter,
        metric,
        arrowColorSelected,
        arrowColorNotSelected,
        isLocationHeader,
      }) =>
        isLocationHeader && !sortDescending
          ? `${arrowColorSelected}`
          : !sortDescending && sorter === metric
          ? `${arrowColorSelected}`
          : `${arrowColorNotSelected}`};
    }
    &:first-child {
      transform: translatex(-0.1rem);
      color: ${({
        sortDescending,
        sorter,
        metric,
        arrowColorSelected,
        arrowColorNotSelected,
        isLocationHeader,
      }) =>
        isLocationHeader && sortDescending
          ? `${arrowColorSelected}`
          : sortDescending && sorter === metric
          ? `${arrowColorSelected}`
          : `${arrowColorNotSelected}`};
    }

    &:hover {
      color: ${({ isModal }) => (isModal ? 'white' : 'black')};
    }
  }
`;

export const Footer = styled.div<{ isCounty: any }>`
  display: flex;
  padding: 1.25rem 0.75rem;
  flex-direction: column;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;

  span {
    margin-right: 1rem;
  }

  div {
    &:first-child {
      display: flex;
      justify-content: ${({ isCounty }) =>
        isCounty ? 'center' : 'flex-start'};
      flex-wrap: wrap;
    }
  }

  //740px is when disclaimer is about to overlap with state name:
  @media (min-width: 740px) {
    flex-direction: row;

    div {
      &:first-child {
        justify-content: unset;
        flex-wrap: nowrap;
      }
    }
  }
`;

export const ViewAllLink = styled.div`
  font-family: Roboto;
  color: ${COLOR_MAP.BLUE};
  font-weight: 500;
  cursor: pointer;
`;

export const DisclaimerWrapper = styled.div`
  background: #fafafa;
  max-width: 345px;
  padding: 0.75rem;
  line-height: 1.4;
  margin: 1rem 1.25rem 0;
  display: flex;
  align-self: center;

  span {
    color: rgba(0, 0, 0, 0.7);
  }

  a {
    color: ${COLOR_MAP.BLUE};
    text-decoration: none;
  }

  //740px is when disclaimer is about to overlap with state name:
  @media (min-width: 740px) {
    margin: -0.25rem 0 0 auto;
    width: 100%;
    align-self: unset;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
`;

export const Header = styled.div`
  display: flex;
  font-family: Roboto;
  font-weight: bold;
  font-size: 1.5rem;
`;

export const ModalHeader = styled.div<{ isHomepage?: Boolean }>`
  background-color: ${COLOR_MAP.GRAY_BODY_COPY};
  color: white;
  font-family: Roboto;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem 1rem 1.25rem;
  font-weight: bold;
  align-items: center;
  max-width: ${({ isHomepage }) => (isHomepage ? '1000px' : '900px')};
  width: 100%;
  margin: 0 auto;
  height: 3.75rem;

  @media (min-width: 600px) {
    margin: 1rem auto 0;
  }

  svg {
    color: white;
    cursor: pointer;
    font-size: 1.75rem;
    margin-left: auto;
  }
`;

export const DivForRef = styled.div``;

export const StateName = styled.div`
  font-size: 1rem;
  line-height: 1.4;
`;
