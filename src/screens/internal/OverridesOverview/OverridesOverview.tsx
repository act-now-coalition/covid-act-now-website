import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import jsonOverrides from '../../../cms-content/region-overrides/region-overrides.json';
import { nullHandlingSortComparator, parseOverrides } from './utils';
import { Stack } from '@mui/material';
import { Box, Tooltip, Typography } from '@material-ui/core';

const renderDataGridToolTip = (params: any) => (
  <Tooltip title={params.value}>
    <span>{params.value}</span>
  </Tooltip>
);

function OverridesOverview() {
  const regionOverriedes = parseOverrides(jsonOverrides.overrides);
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
      sortComparator: nullHandlingSortComparator,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 150,
      sortComparator: nullHandlingSortComparator,
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
      width: 100,
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
      <Stack p={4} spacing={2}>
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
        <Box style={{ height: 600, width: '80%' }}>
          <DataGrid
            rows={activeOverrides}
            columns={columns}
            getRowId={() => Math.random()}
            initialState={{
              sorting: {
                sortModel: [{ field: 'startDate', sort: 'desc' }],
              },
            }}
          />
        </Box>
      </Stack>
    </>
  );
}

export default OverridesOverview;
