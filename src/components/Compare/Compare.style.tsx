import styled from 'styled-components';
import { TableHead, TableCell, TableRow, Table } from '@material-ui/core';
import { COLOR_MAP, LEVEL_COLOR } from 'common/colors';
import { Metric } from 'common/metric';
import { Level } from 'common/level';

export const Wrapper = styled.div<{ isModal?: Boolean }>`
  max-width: 900px;
  width: 100%;
  margin: ${({ isModal }) => (isModal ? '0 auto' : '3rem auto')};
  background: white;
  max-height: 100vh;
  overflow-y: scroll;

  @media (min-width: 600px) {
    max-height: ${({ isModal }) => (isModal ? '90vh' : 'unset')};
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
  border: ${({ isModal }) => !isModal && '1px solid #f2f2f2'};
`;

export const Cell = styled(TableCell)``;

export const TableHeadContainer = styled(TableHead)<{ isModal?: Boolean }>`
  ${Cell} {
    cursor: pointer;
    vertical-align: bottom;
    line-height: 1.2rem;
    padding: 1rem 1rem 0.8rem;
    background-color: ${({ isModal }) => isModal && 'black'};
    color: ${({ isModal }) => isModal && 'white'};

    &:nth-child(2) {
      border-left: ${({ isModal }) => !isModal && '2px solid #f2f2f2'};
    }
  }
`;

export const Row = styled(TableRow)<{ index?: number; tableHeader?: Boolean }>`
  background-color: ${({ index, tableHeader }) =>
    tableHeader ? 'white' : index && index % 2 ? 'white' : '#fafafa'};
  border-bottom: none;

  th {
    border-bottom: none;
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

  &:first-child {
    font-weight: 500;
    cursor: pointer;
  }

  &:nth-child(2) {
    border-left: 2px solid #f2f2f2;
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
`;

export const ArrowContainer = styled.div<{
  sortDescending: Boolean;
  sorter?: Metric;
  metric?: Metric;
  arrowColorSelected: string;
  arrowColorNotSelected: string;
}>`
  color: #bdbdbd;
  display: flex;
  font-family: Roboto;
  font-size: 0.875rem;

  span {
    margin-left: 0.25rem;
  }

  svg {
    &:first-child {
      color: ${({
        sortDescending,
        sorter,
        metric,
        arrowColorSelected,
        arrowColorNotSelected,
      }) =>
        !sortDescending && sorter === metric
          ? `${arrowColorSelected}`
          : `${arrowColorNotSelected}`};
    }
    &:last-child {
      color: ${({
        sortDescending,
        sorter,
        metric,
        arrowColorSelected,
        arrowColorNotSelected,
      }) =>
        sortDescending && sorter === metric
          ? `${arrowColorSelected}`
          : `${arrowColorNotSelected}`};
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  padding: 1.5rem 1rem;

  span {
    margin-right: 1.875rem;
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

export const ModalHeader = styled.div`
  background-color: black;
  color: white;
  font-family: Roboto;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem 1rem 1.25rem;
  font-weight: bold;
  align-items: center;
  max-width: 900px;
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
