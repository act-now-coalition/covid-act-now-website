import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface TableProps {
  rows: MetricAvailability[];
}

enum DataAvailiabilityStatus {
  NONE = '--',
  PARTIAL = 'Partial',
  FULL = 'Full',
}

interface MetricAvailability {
  name: string;
  state: DataAvailiabilityStatus;
  county: DataAvailiabilityStatus;
  metro: DataAvailiabilityStatus;
}

const AvailabilityTable = ({ rows }: TableProps) => {
  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">States</TableCell>
            <TableCell align="right">Counties</TableCell>
            <TableCell align="right">Metro areas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.state}</TableCell>
              <TableCell align="right">{row.county}</TableCell>
              <TableCell align="right">{row.metro}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AvailabilityTable;
