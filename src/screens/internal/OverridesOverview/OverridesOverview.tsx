import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import jsonOverrides from '../../../cms-content/region-overrides/region-overrides.json';
import {
  nullHandlingSortComparator,
  parseOverrides,
  RegionOverride,
} from './utils';
import { Stack } from '@mui/material';
import { Tooltip } from '@material-ui/core';

function OverridesOverview() {
  const regionOverriedes = parseOverrides(jsonOverrides.overrides);
  const activeOverrides = regionOverriedes.filter(
    override =>
      override.endDate === null || new Date(override.endDate) > new Date(),
  );

  const renderToolTip = (params: any) => (
    <Tooltip title={params.value}>
      <span>{params.value}</span>
    </Tooltip>
  );
  const columns: GridColDef[] = [
    {
      field: 'region',
      headerName: 'Region',
      width: 200,
      renderCell: renderToolTip,
    },
    {
      field: 'metric',
      headerName: 'Metric',
      width: 150,
      renderCell: renderToolTip,
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
      headerName: 'Blocked',
      width: 75,
      renderCell: renderToolTip,
    },
    {
      field: 'scope',
      headerName: 'Scope',
      width: 150,
      renderCell: renderToolTip,
    },
    {
      field: 'population',
      headerName: 'Population',
      width: 100,
      renderCell: renderToolTip,
    },
    {
      field: 'context',
      headerName: 'Context',
      width: 600,
      renderCell: renderToolTip,
    },
  ];

  return (
    <>
      <Stack alignItems={'center'} p={4}>
        <div style={{ height: 800, width: '80%' }}>
          <DataGrid
            rows={activeOverrides}
            columns={columns}
            getRowId={() => Math.random()}
          />
        </div>
      </Stack>
    </>
  );
}

export default OverridesOverview;
