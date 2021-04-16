import { Grid } from '@material-ui/core';
import { Api, SnapshotVersion } from 'api';
import { snapshotUrl } from 'common/utils/snapshots';
import React, { useEffect, useState } from 'react';
import { parseDateString } from 'common/utils/time-utils';

export function SnapshotVersions({
  leftSnapshot,
  rightSnapshot,
}: {
  leftSnapshot: number;
  rightSnapshot: number;
}) {
  const leftVersion = useSnapshotVersion(leftSnapshot);
  const rightVersion = useSnapshotVersion(rightSnapshot);

  return (
    <Grid container spacing={8} style={{ margin: '1px' }}>
      <Grid item xs={6}>
        Left Snapshot: <b>{leftSnapshot}</b>
        <VersionInfo version={leftVersion} />
      </Grid>
      <Grid item xs={6}>
        Right Snapshot: <b>{rightSnapshot}</b>
        <VersionInfo version={rightVersion} />
      </Grid>
    </Grid>
  );
}

function VersionInfo({ version }: { version: SnapshotVersion | null }) {
  return (
    version && (
      <div style={{ fontSize: 'small' }}>
        <b>Build finished:</b> {parseDateString(version.timestamp).toString()}
        <br />
        <b>covid-data-model:</b>{' '}
        {JSON.stringify(version['covid-data-model']).replace(',', ', ')}
        <br />
        <b>covid-data-public:</b>{' '}
        {JSON.stringify(version['covid-data-public']).replace(',', ', ')}
        <br />
      </div>
    )
  );
}

export function useSnapshotVersion(
  snapshot: number | null,
): SnapshotVersion | null {
  const [version, setVersion] = useState<SnapshotVersion | null>(null);
  useEffect(() => {
    setVersion(null);
    if (snapshot !== null) {
      new Api(snapshotUrl(snapshot)).fetchVersionInfo().then(version => {
        setVersion(version);
      });
    }
  }, [snapshot]);

  return version;
}
