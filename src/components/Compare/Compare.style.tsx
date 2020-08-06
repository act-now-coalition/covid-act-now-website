import styled from 'styled-components';
import { isNumber } from 'lodash';
import { TableHead, TableCell, TableRow, Table } from '@material-ui/core';
import { COLOR_MAP, LEVEL_COLOR } from 'common/colors';
import { COLORS } from 'common';
import { Metric } from 'common/metric';
import { Level } from 'common/level';

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
      }

      &:not(:first-child) {
        width: 15%;
      }
    }
  }
`;

export const StyledTable = styled(Table)<{ isModal?: Boolean }>`
  border: ${({ isModal }) => !isModal && `1px solid ${COLORS.LIGHTGRAY}`};
`;

export const Cell = styled(TableCell)<{ locationHeaderCell?: Boolean }>`
  cursor: ${({ locationHeaderCell }) => !locationHeaderCell && 'pointer'};
  text-transform: uppercase;
  font-size: 0.9rem;
`;

export const TableHeadContainer = styled(TableHead)<{ isModal?: Boolean }>`
  ${Cell} {
    vertical-align: bottom;
    line-height: 1.1rem;
    padding: 1rem 1rem 0.8rem;
    background-color: ${({ isModal }) => isModal && 'black'};
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
    &:hover {
      color: ${COLOR_MAP.BLUE};
    }
  }

  &:nth-child(2) {
    border-left: 2px solid ${COLORS.LIGHTGRAY};
  }

  &:not(:first-child) {
    font-family: Source Code Pro;
    color: ${({ sorter, metric }) =>
      sorter === metric ? 'black' : `${COLOR_MAP.GRAY_BODY_COPY}`};
    font-weight: ${({ sorter, metric }) => sorter === metric && '600'};
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

export const Row = styled(TableRow)<{
  index?: number;
  isCurrentCounty?: Boolean;
}>`
  background-color: ${({ index }) =>
    !isNumber(index) ? 'white' : index % 2 === 0 ? '#fafafa' : 'white'};
  background-color: ${({ isCurrentCounty }) => isCurrentCounty && '#FFEFD6'};
  border-bottom: none;

  th {
    border-bottom: none;
  }

  ${MetricCell} {
    border-bottom: ${({ isCurrentCounty }) =>
      isCurrentCounty && '2px solid #CEBFAC'};
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
  transform: translate(-0.3rem, 0.15rem);
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

export const Footer = styled.div`
  display: flex;
  padding: 1.25rem 1rem;

  span {
    margin-right: 1.875rem;
    color: ${COLOR_MAP.GRAY_BODY_COPY};
  }
`;

export const ViewAllLink = styled.div`
  font-family: Roboto;
  color: ${COLOR_MAP.BLUE};
  font-weight: 500;
  cursor: pointer;
`;

export const Header = styled.div`
  display: flex;
  padding: 0.75rem;
  font-family: Roboto;
  font-weight: bold;
  font-size: 1.5rem;
`;

export const ModalHeader = styled.div<{ isHomepage?: Boolean }>`
  background-color: black;
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

  @media (min-width: 600px) {
    margin: 1rem auto 0;
  }

  svg {
    color: white;
    cursor: pointer;
    font-size: 1.75rem;
  }
`;

export const UnknownsDisclaimer = styled.div`
  background-color: #fafafa;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  padding: 1rem;
`;
