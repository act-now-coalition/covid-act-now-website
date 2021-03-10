import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import CheckIcon from '@material-ui/icons/Check';

import {
  StyledInfoTooltip,
  UnderlinedText,
  StyledTableHead,
  MetricTableCell,
  AvailabilityTableCell,
  MetricTableRow,
  MetricTableCellHeader,
} from './AvailabilityTable.style';
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
  { displayName: 'Vaccinat', field: 'metrics.vaccinationsInitiatedRatio' },
  { displayName: 'Cases', field: 'actuals.cases' },
  { displayName: 'Deaths', field: 'actuals.deaths' },
  { displayName: 'Total testing volume', field: 'actuals.positiveTests' },
  { displayName: 'Hospitaliz usage', field: 'metrics.icuCapacityRatio' },
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
      <UnderlinedText align="center" display="inline">
        {text}
      </UnderlinedText>

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

const AvailabilityRow: React.FC<{ row: MetricAvailability }> = ({ row }) => {
  return (
    <MetricTableRow key={row.name}>
      <MetricTableCell>{row.name}</MetricTableCell>
      <AvailabilityTableCell>
        <Status status={row.state} />
      </AvailabilityTableCell>
      <AvailabilityTableCell>
        <Status status={row.county} />
      </AvailabilityTableCell>
      <AvailabilityTableCell>
        <Status status={row.metro} />
      </AvailabilityTableCell>
    </MetricTableRow>
  );
};

const AvailabilityTable = ({ rows }: TableProps) => {
  return (
    <TableContainer>
      <Table aria-label="Data Coverage Table">
        <StyledTableHead>
          <TableRow>
            <MetricTableCellHeader>Metric</MetricTableCellHeader>
            <AvailabilityTableCell>States</AvailabilityTableCell>
            <AvailabilityTableCell>Counties</AvailabilityTableCell>
            <AvailabilityTableCell>Metros</AvailabilityTableCell>
          </TableRow>
        </StyledTableHead>
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
