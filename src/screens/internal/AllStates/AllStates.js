import React from 'react';
import { LoadingScreen } from './AllStates.style';
import { useProjections } from 'common/utils/model';
import { STATES } from 'common';
import { Metric } from 'common/metric';
import { MetricChart } from 'components/Charts';

function AllStates() {
  return Object.keys(STATES).map(stateId => (
    <State key={stateId} stateId={stateId} />
  ));
}

function State({ stateId }) {
  const projections = useProjections(stateId);

  // Projections haven't loaded yet
  if (!projections) {
    return <LoadingScreen></LoadingScreen>;
  }
  const stateName = projections.stateName;

  return (
    <>
      <h3>{stateName}</h3>
      <div
        style={{
          marginLeft: '50px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {[
          Metric.CASE_GROWTH_RATE,
          Metric.POSITIVE_TESTS,
          Metric.HOSPITAL_USAGE,
        ].map(metric => (
          <div style={{ width: '31%' }}>
            <MetricChart metric={metric} projections={projections} />
          </div>
        ))}
      </div>
    </>
  );
}

export default AllStates;
