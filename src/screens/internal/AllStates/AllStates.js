import React from 'react';
import { LoadingScreen } from './AllStates.style';
import { useProjectionsFromRegion } from 'common/utils/model';
import { Metric } from 'common/metricEnum';
import { MetricChart } from 'components/Charts';
import regions from 'common/regions';

function AllStates() {
  return regions.states.map(state => {
    return <State key={state.stateCode} state={state} />;
  });
}

function State({ state }) {
  const projections = useProjectionsFromRegion(state);

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
