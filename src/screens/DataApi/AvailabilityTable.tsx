import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Grid, Tooltip, Typography } from '@material-ui/core';
import { InfoTooltip } from 'components/InfoTooltip';
import { StyledInfoTooltip } from './AvailabilityTable.style';
import availabilitySnapshot from './availabilitySnapshot.json';
import { formatPercent } from 'common/utils';

export const AVAILABILITY_SNAPSHOT = availabilitySnapshot as MetricAvailability[];

interface TableProps {
  rows: MetricAvailability[];
}

interface AvailabilityDetails {
  totalRegions: number;
  regionsAvailable: number;
  totalStates: number;
  statesAvailable: number;
}

export interface MetricAvailability {
  name: string;
  state: AvailabilityDetails;
  county: AvailabilityDetails;
  metro: AvailabilityDetails;
}

const TextWithTooltip: React.FC<{ text: string; tooltipContent: string }> = ({
  text,
  tooltipContent,
}) => {
  return (
    <div>
      <Typography
        align="center"
        display="inline"
        style={{
          textDecorationLine: 'underline',
          textDecorationStyle: 'dotted',
          verticalAlign: 'middle',
        }}
      >
        {text}
      </Typography>

      <StyledInfoTooltip
        trackOpenTooltip={() => {}}
        trackCloseTooltip={() => {}}
        title={tooltipContent}
        mainCopy={"Hey i'm some useful content"}
      />
    </div>
  );
};

const Status: React.FC<{ status: AvailabilityDetails }> = ({ status }) => {
  const availableRatio = status.regionsAvailable / status.totalRegions;
  if (status.regionsAvailable >= status.totalRegions * 0.95) {
    return <CheckIcon color="secondary" />;
  }

  const totalAvailability = `${status.regionsAvailable} / ${status.totalRegions} regions - ${status.statesAvailable} / ${status.totalStates} states`;
  if (status.regionsAvailable === 0) {
    return (
      <TextWithTooltip text="No data" tooltipContent="No data available." />
    );
  }

  if (availableRatio >= 0.6) {
    return (
      <TextWithTooltip
        text={`~${formatPercent(availableRatio, 0)}`}
        tooltipContent={totalAvailability}
      />
    );
  }
  if (status.statesAvailable > 0) {
    return (
      <TextWithTooltip
        text={`${status.statesAvailable} States`}
        tooltipContent={totalAvailability}
      />
    );
  }
  return <div></div>;
};

const AvailabilityRow: React.FC<{ row: MetricAvailability }> = ({ row }) => {
  // grid based centering, hopefully won't need
  // <Grid container style={{ width: '100%' }} justify="center">
  // <Grid item>
  // <Status status={row.state} />
  //</Grid>
  // </Grid>
  return (
    <TableRow key={row.name}>
      <TableCell component="th" align="left" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="center">
        <Status status={row.state} />
      </TableCell>
      <TableCell align="center">
        <Status status={row.county} />
      </TableCell>
      <TableCell align="center">
        <Status status={row.metro} />
      </TableCell>
    </TableRow>
  );
};

const AvailabilityTable = ({ rows }: TableProps) => {
  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">States</TableCell>
            <TableCell align="center">Counties</TableCell>
            <TableCell align="center">Metro areas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <AvailabilityRow row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AvailabilityTable;
