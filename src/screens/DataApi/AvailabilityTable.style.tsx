import { TableHead, Typography } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { InfoTooltip } from 'components/InfoTooltip';
import styled, { css } from 'styled-components';

export const StyledInfoTooltip = styled(InfoTooltip)`
  svg {
    margin-left: 0.1rem;
  }
`;

export const UnderlinedText = styled(Typography)`
  text-decoration-line: underline;
  text-decoration-style: dotted;
  text-underline-position: under;
  vertical-align: middle;
  font-size: 14px;
`;

export const StyledTableHead = styled(TableHead)`
  font-family: Roboto;
  font-weight: 500;
  font-size: 13px;
  text-transform: uppercase;
  background-color: white;
`;

export const MetricTableCellHeader = styled(TableCell).attrs(props => ({
  component: 'th',
  align: 'left',
  scope: 'row',
}))`
  width: 30%;

  @media (max-width: ${materialSMBreakpoint}) {
    padding: 8px;
    padding-left: 0px;
    width: 20%;
  }
`;

export const MetricTableCell = styled(TableCell).attrs(props => ({
  component: 'th',
  align: 'left',
  scope: 'row',
}))`
  width: 30%;
  font-weight: 500;
  size: 14px;

  @media (max-width: ${materialSMBreakpoint}) {
    padding: 8px;
    padding-left: 0px;
    width: 20%;
  }
`;

export const AvailabilityTableCell = styled(TableCell).attrs(props => ({
  align: 'center',
}))`
  width: 23%;

  @media (max-width: ${materialSMBreakpoint}) {
    padding: 8px;
  }
`;

export const MetricTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: #fafafa;
  }
`;
