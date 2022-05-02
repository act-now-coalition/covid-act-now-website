import React, { Fragment, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Metric } from 'common/metricEnum';
import { ProjectionsSet } from 'common/models/ProjectionsSet';
import { ProjectionsPair } from 'common/models/ProjectionsPair';
import { formatInteger } from 'common/utils';
import { Grid } from '@material-ui/core';
import { Level } from 'common/level';
import { MetricChart } from 'components/Charts';
import { Projections } from 'common/models/Projections';
import AnomaliesButton from './AnomaliesButton';

export const ComparisonList = function ({
  metric,
  projectionsSet,
}: {
  metric: Metric;
  projectionsSet: ProjectionsSet;
}) {
  const [visible, setVisible] = useState<number>(5);

  // Reset to only 5 visible whenever the metric or projection set changes.
  useEffect(() => {
    setVisible(5);
  }, [metric, projectionsSet]);

  if (projectionsSet.loadingText) {
    return <h1>{projectionsSet.loadingText}</h1>;
  } else if (projectionsSet.isEmpty) {
    return <h1>No locations match your criteria.</h1>;
  }

  const visibleSet = projectionsSet.top(visible);
  const fetchData = () => {
    setVisible(visible + 10);
  };

  return (
    <InfiniteScroll
      dataLength={visibleSet.length}
      next={fetchData}
      hasMore={visibleSet.length < projectionsSet.length}
      style={{ height: undefined, overflow: undefined }}
      loader={<h4>Loading...</h4>}
      endMessage={<h4>All done!</h4>}
    >
      {visibleSet.map(pair => (
        <ProjectionsCompare
          key={pair.locationName}
          metric={metric}
          pair={pair}
        />
      ))}
    </InfiniteScroll>
  );
};

const ProjectionsCompare = React.memo(
  ({ metric, pair }: { metric: Metric; pair: ProjectionsPair }) => {
    const localUrl = pair.locationURL.replace(/^.*covidactnow\.org/, '');
    return (
      <>
        <hr />
        <div style={{ marginLeft: '40px' }}>
          <h2>
            {pair.locationName}
            {pair.left.primary.isMetricDisabledIgnoreOverride(metric) &&
              ' [BLOCKED]'}
            :{' '}
            <small>
              <ProjectionsGradeChange pair={pair} /> | population{' '}
              {formatInteger(pair.population)} | fips {pair.fips} |{' '}
              <a href={pair.locationURL}>prod</a> <a href={localUrl}>local</a>
              <span> | </span>
              <AnomaliesButton pair={pair} metric={metric}></AnomaliesButton>
            </small>
          </h2>
          <br />
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <ProjectionsChart metric={metric} projections={pair.left} />
            </Grid>
            <Grid item xs={6}>
              <ProjectionsChart metric={metric} projections={pair.right} />
            </Grid>
          </Grid>
        </div>
      </>
    );
  },
);

function ProjectionsGradeChange({ pair }: { pair: ProjectionsPair }) {
  if (pair.left.getAlarmLevel() !== pair.right.getAlarmLevel()) {
    return (
      <Fragment>
        <ProjectionsGrade projections={pair.left} />
        ➔
        <ProjectionsGrade projections={pair.right} />
      </Fragment>
    );
  } else {
    return <ProjectionsGrade projections={pair.left} />;
  }
}

function ProjectionsGrade({ projections }: { projections: Projections }) {
  const color = projections.getAlarmLevelColor();
  const level = Level[projections.getAlarmLevel()];
  return <span style={{ color }}>{level}</span>;
}

const ProjectionsChart = React.memo(function ProjectionsChart({
  metric,
  projections,
}: {
  metric: Metric;
  projections: Projections;
}) {
  return <MetricChart metric={metric} projections={projections} />;
});
