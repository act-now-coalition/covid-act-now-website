import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import jsonOverrides from '../../../cms-content/region-overrides/region-overrides.json';
import { parseOverrides } from './utils';
import { Box, Tooltip, Typography } from '@material-ui/core';

const renderDataGridToolTip = (params: any) => (
  <Tooltip title={params.value}>
    <span>{params.value}</span>
  </Tooltip>
);

function OverridesOverview() {
  const regionOverriedes = parseOverrides(jsonOverrides.overrides);
  // Filter out overrides that block a timeframe in the past.
  const activeOverrides = regionOverriedes.filter(
    override =>
      override.endDate === null || new Date(override.endDate) > new Date(),
  );

  const columns: GridColDef[] = [
    {
      field: 'region',
      headerName: 'Region',
      width: 200,
      renderCell: renderDataGridToolTip,
    },
    {
      field: 'metric',
      headerName: 'Metric',
      width: 150,
      renderCell: renderDataGridToolTip,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 150,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 150,
    },
    {
      field: 'blocked',
      headerName: 'Blocking Data',
      width: 125,
      renderCell: renderDataGridToolTip,
    },
    {
      field: 'scope',
      headerName: 'Scope',
      width: 150,
      renderCell: renderDataGridToolTip,
    },
    {
      field: 'population',
      headerName: 'Population',
      width: 150,
      renderCell: renderDataGridToolTip,
    },
    {
      field: 'context',
      headerName: 'Context',
      width: 600,
      renderCell: renderDataGridToolTip,
    },
    {
      field: 'disclaimer',
      headerName: 'Site Disclaimer',
      width: 600,
      renderCell: renderDataGridToolTip,
    },
  ];

  return (
    <>
      <Box p={4}>
        <Typography variant="h2">
          <Tooltip title="Active overrides include overrides with no end date, or an end date in the future.">
            <Typography variant="inherit">Active</Typography>
          </Tooltip>{' '}
          Region Overrides
        </Typography>
        <Typography variant="body1">
          Update, add, or remove overrides via the{' '}
          <a href="https://covidactnow-cms.netlify.app/admin-overrides/#/collections/regionOverrides/entries/regionOverrides">
            Region Overrides CMS
          </a>
        </Typography>
        <Box style={{ height: 600, width: '90%' }}>
          <DataGrid
            rows={activeOverrides}
            columns={columns}
            getRowId={() => Math.random()}
          />
        </Box>
      </Box>
    </>
  );
}

export default OverridesOverview;
