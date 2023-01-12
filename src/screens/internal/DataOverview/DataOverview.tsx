import React from 'react';
import { Container, Typography } from '@material-ui/core';
import {
  VersionInfo,
  useSnapshotVersion,
} from '../CompareSnapshots/SnapshotVersions';
import * as regionOverridesJson from 'cms-content/region-overrides/region-overrides.json';
import { parseOverrides } from './utils';
import { EnhancedTable } from './table';

function AnomaliesPage() {
  const snapshot = useSnapshotVersion(4470);
  const overridesJson = regionOverridesJson as any;
  const overrides = parseOverrides(overridesJson.default.overrides);
  const activeOverrides = overrides.filter(
    override => override.endDate === null || override.endDate > new Date(),
  );

  return (
    <Container>
      <Typography style={{ paddingTop: '20px' }}>
        Snapshot {4470} Info:
      </Typography>
      <VersionInfo version={snapshot}></VersionInfo>
      <EnhancedTable />
    </Container>
  );
}

export default AnomaliesPage;
