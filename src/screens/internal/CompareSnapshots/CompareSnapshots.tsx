import React, { Fragment, useEffect, useState } from 'react';
import { Wrapper } from './CompareSnapshots.style';
import { reenableDisabledMetrics } from 'common/models/Projection';
import { ComparisonList } from './ComparisonList';
import { CompareOptions, useProjectionsSet } from './utils';
import { OptionsSelector } from './OptionsSelector';
import { SnapshotVersions } from './SnapshotVersions';

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

  return (
    <Fragment>
      <SnapshotVersions
        leftSnapshot={leftSnapshot}
        rightSnapshot={rightSnapshot}
      />
      <ComparisonList
        metric={metric}
        projectionsSet={projectionsSet}
        loadingText={loadingText}
      />
    </Fragment>
  );
}

export default CompareSnapshots;
