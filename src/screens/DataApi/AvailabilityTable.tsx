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

interface MetricField {
  displayName: string;
  field: string;
}

export const FIELDS: MetricField[] = [
  { displayName: 'Overall risk level', field: 'riskLevels.overall' },
  { displayName: 'Daily new cases', field: 'metrics.caseDensity' },
  { displayName: 'Infection rate', field: 'metrics.infectionRate' },
  { displayName: 'Test positivity', field: 'metrics.testPositivityRatio' },
  { displayName: 'Vaccinations', field: 'metrics.vaccinationsInitiatedRatio' },
  { displayName: 'Cases', field: 'actuals.cases' },
  { displayName: 'Deaths', field: 'actuals.deaths' },
  { displayName: 'Total testing volume', field: 'actuals.positiveTests' },
  { displayName: 'Hospitalization usage', field: 'metrics.icuCapacityRatio' },
  { displayName: 'ICU usage', field: 'metrics.icuCapacityRatio' },
];

export const FIELDS_PRETTY_NAMES = FIELDS.map(field => {
  const record = AVAILABILITY_SNAPSHOT.find(
    record => field.field === record.name,
  );
  if (record) {
    return {
      ...record,
      ...{ name: field.displayName },
    };
  }

  return null;
}).filter((record): record is MetricAvailability => record !== null);

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
          textUnderlinePosition: 'under',
          verticalAlign: 'middle',
          fontSize: 14,
        }}
      >
        {text}
      </Typography>

      <StyledInfoTooltip
        trackOpenTooltip={() => {}}
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

const useRowStyles = makeStyles({
  row: {
    '&:nth-of-type(even)': {
      backgroundColor: '#fafafa',
    },
  },
  rowName: {
    fontWeight: 500,
    size: 14,
  },
});
const AvailabilityRow: React.FC<{ row: MetricAvailability }> = ({ row }) => {
  const classes = useRowStyles();
  // grid based centering, hopefully won't need
  // <Grid container style={{ width: '100%' }} justify="center">
  // <Grid item>
  // <Status status={row.state} />
  //</Grid>
  // </Grid>
  return (
    <TableRow className={classes.row} key={row.name}>
      <TableCell
        className={classes.rowName}
        style={{ width: '31%' }}
        component="th"
        align="left"
        scope="row"
      >
        {row.name}
      </TableCell>
      <TableCell align="center" style={{ width: '23%' }}>
        <Status status={row.state} />
      </TableCell>
      <TableCell align="center" style={{ width: '23%' }}>
        <Status status={row.county} />
      </TableCell>
      <TableCell align="center" style={{ width: '23%' }}>
        <Status status={row.metro} />
      </TableCell>
    </TableRow>
  );
};

const useTableStyles = makeStyles({
  headerText: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 13,
    textTransform: 'uppercase',
    backgroundColor: 'white',
  },
});

const AvailabilityTable = ({ rows }: TableProps) => {
  const classes = useTableStyles();
  return (
    <TableContainer>
      <Table aria-label="Data Coverage Table">
        <TableHead className={classes.headerText}>
          <TableRow>
            <TableCell style={{ width: '31%' }}>Metric</TableCell>
            <TableCell align="center" style={{ width: '23%' }}>
              States
            </TableCell>
            <TableCell align="center" style={{ width: '23%' }}>
              Counties
            </TableCell>
            <TableCell align="center" style={{ width: '23%' }}>
              Metros
            </TableCell>
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
