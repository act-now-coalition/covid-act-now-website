import React, { Fragment, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Wrapper } from './CompareSnapshots.style';
import { SnapshotVersion, Api } from 'api';
import moment from 'moment';
import { snapshotUrl } from 'common/utils/snapshots';
import { reenableDisabledMetrics } from 'common/models/Projection';
import { ComparisonList } from './ComparisonList';
import { CompareOptions, useProjectionsSet } from './utils';
import { OptionsSelector } from './OptionsSelector';

export function CompareSnapshots() {
  // We want to force all metrics to be reenabled so we can evaluate whether they're fixed.
  useEffect(() => {
    reenableDisabledMetrics(true);
    return () => reenableDisabledMetrics(false);
  }, []);

  const [options, setOptions] = useState<CompareOptions | null>(null);
  return (
    <Wrapper>
      <OptionsSelector onNewOptions={setOptions} />
      {options && <CompareSnapshotsBody options={options} />}
    </Wrapper>
  );
}

function CompareSnapshotsBody({ options }: { options: CompareOptions }) {
  // Load projections for all states or counties.
  const { leftSnapshot, rightSnapshot, locations, metric, sortType } = options;
  let { projectionsSet, loadingText } = useProjectionsSet(
    leftSnapshot,
    rightSnapshot,
    locations,
    metric,
  );
  projectionsSet = projectionsSet.sortBy(sortType, metric);

  const leftVersion = useSnapshotVersion(leftSnapshot);
  const rightVersion = useSnapshotVersion(rightSnapshot);

  return (
    <Fragment>
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

      <ComparisonList
        metric={metric}
        projectionsSet={projectionsSet}
        loadingText={loadingText}
      />
    </Fragment>
  );
}

const VersionInfo = function ({
  version,
}: {
  version: SnapshotVersion | null;
}) {
  return (
    version && (
      <div style={{ fontSize: 'small' }}>
        <b>Build finished:</b>{' '}
        {moment.utc(version.timestamp).local().toDate().toString()}
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
};

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

export default CompareSnapshots;
