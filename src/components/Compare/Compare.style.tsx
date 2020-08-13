import styled, { css } from 'styled-components';
import { isNumber } from 'lodash';
import { TableHead, TableCell, TableRow } from '@material-ui/core';
import { COLOR_MAP, LEVEL_COLOR } from 'common/colors';
import { COLORS } from 'common';
import { Metric } from 'common/metric';
import { Level } from 'common/level';
import { ChartLocationName } from 'components/LocationPage/ChartsHolder.style';

export const locationNameCellWidth = 170;
export const metricCellWidth = 115;

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
  background: ${({ isModal }) => isModal && `${COLOR_MAP.GRAY_BODY_COPY}`};
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

export const StyledTable = styled.div<{ isModal?: Boolean }>`
  border: ${({ isModal }) => !isModal && `1px solid ${COLORS.LIGHTGRAY}`};
`;

export const ArrowContainer = styled.div<{
  arrowColorNotSelected: string;
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
    color: ${({ arrowColorNotSelected }) => arrowColorNotSelected};

    &:hover {
      color: ${({ isModal }) => (isModal ? 'white' : 'black')};
    }
  }
`;

export const CellStyles = css`
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.9rem;
`;

// TODO (Chelsi): turn this background-color situation into a theme asap:
export const LocationHeaderCell = styled(TableCell)<{
  isModal: Boolean;
  sortByPopulation: boolean;
  arrowColorSelected: string;
  arrowColorNotSelected: string;
  sortDescending: boolean;
}>`
  ${CellStyles}

  background-color: ${({ sortByPopulation }) =>
    sortByPopulation && 'rgba(0,0,0,0.02)'};
  background-color: ${({ isModal }) =>
    isModal && `${COLOR_MAP.GRAY_BODY_COPY}`};
  background-color: ${({ sortByPopulation, isModal }) =>
    isModal && sortByPopulation && 'black'};
  border-radius: ${({ isModal, sortByPopulation }) =>
    isModal && sortByPopulation && '4px 4px 0 0'};

  ${ArrowContainer} {
    svg{
      &:first-child {
        transform: translatex(-0.1rem);
        color: ${({ arrowColorSelected, sortDescending, sortByPopulation }) =>
          sortDescending && sortByPopulation && `${arrowColorSelected}`};
      }
      &:nth-child(2) {
        color: ${({ arrowColorSelected, sortDescending, sortByPopulation }) =>
          !sortDescending && sortByPopulation && `${arrowColorSelected}`};
      }
    }
  }

  span{
    color: ${COLOR_MAP.GRAY.DARK};
    font-weight: normal;
  }
`;

// TODO (Chelsi): turn this background-color situation into a theme asap:
export const MetricHeaderCell = styled(TableCell)<{
  isModal: Boolean;
  sortByPopulation: boolean;
  arrowColorSelected: string;
  sortDescending: boolean;
  isSelectedMetric: boolean;
}>`
  ${CellStyles}

  background-color: ${({ isSelectedMetric, sortByPopulation }) =>
    !sortByPopulation && isSelectedMetric && 'rgba(0,0,0,0.02)'};
  background-color: ${({ isSelectedMetric, isModal, sortByPopulation }) =>
    isModal && isSelectedMetric && !sortByPopulation && 'black'};
  background-color: ${({ isSelectedMetric, isModal }) =>
    isModal && !isSelectedMetric && `${COLOR_MAP.GRAY_BODY_COPY}`};
  border-radius: ${({ isModal, sortByPopulation, isSelectedMetric }) =>
    isModal && !sortByPopulation && isSelectedMetric && '4px 4px 0 0'};

    ${ArrowContainer} {
      svg{
        &:first-child {
          transform: translatex(-0.1rem);
          color: ${({
            arrowColorSelected,
            sortDescending,
            sortByPopulation,
            isSelectedMetric,
          }) =>
            sortDescending &&
            !sortByPopulation &&
            isSelectedMetric &&
            `${arrowColorSelected}`};
        }
        &:nth-child(2) {
          color: ${({
            arrowColorSelected,
            sortDescending,
            sortByPopulation,
            isSelectedMetric,
          }) =>
            !sortDescending &&
            !sortByPopulation &&
            isSelectedMetric &&
            `${arrowColorSelected}`};
        }
      }
    }
`;

export const TableHeadContainer = styled(TableHead)<{ isModal?: Boolean }>`
  ${MetricHeaderCell}, ${LocationHeaderCell} {
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
  sortByPopulation: boolean;
}>`
  text-align: left;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  cursor: pointer;

  &:first-child {
    min-width: ${locationNameCellWidth}px;
    background-color: ${({ sortByPopulation }) =>
      sortByPopulation && 'rgba(0,0,0,0.02)'};
    font-weight: 500;
    line-height: 1.2;
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
    background-color: ${({ sorter, metric, sortByPopulation }) =>
      !sortByPopulation && sorter === metric && 'rgba(0,0,0,0.02)'};
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

  div {
    display: inline-block;

    &:first-child {
      vertical-align: top;
    }
  }
`;

export const MetricValue = styled.span<{ valueUnknown: boolean }>`
  width: 48px;
  display: inline-block;
  text-align: right;
  opacity: ${({ valueUnknown }) => valueUnknown && '.5'};
`;

export const Row = styled(TableRow)<{
  index?: number;
  isCurrentCounty?: boolean;
  isModal?: boolean;
  headerRowBackground?: string;
}>`
  background-color: ${({ index, headerRowBackground }) =>
    !isNumber(index)
      ? `${headerRowBackground}`
      : index % 2 === 0
      ? '#fafafa'
      : 'white'};
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
  font-size: 0.9rem;
  line-height: 1.2;
`;

export const Population = styled.span`
  font-family: Source Code Pro;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;
