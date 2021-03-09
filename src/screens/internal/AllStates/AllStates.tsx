import React from 'react';
import { LoadingScreen } from './AllStates.style';
import { useProjectionsFromRegion } from 'common/utils/model';
import { Metric } from 'common/metricEnum';
import { MetricChart } from 'components/Charts';
import regions, { State as StateType } from 'common/regions';
import * as QueryString from 'query-string';
import { useHistory } from 'react-router-dom';

function AllStates() {
  return (
    <>
      {regions.states.map(state => {
        return <State key={state.stateCode} state={state} />;
      })}
    </>
  );
}

function State({ state }: { state: StateType }) {
  const projections = useProjectionsFromRegion(state);
  const history = useHistory();
  const params = QueryString.parse(history.location.search);
  const width = Number(params['w'] || 280);
  const height = Number(params['h'] || 80);

  // Projections haven't loaded yet
  if (!projections) {
    return <LoadingScreen></LoadingScreen>;
  }
  const stateName = state.name;

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
        {[Metric.CASE_DENSITY].map(metric => (
          <div
            style={{
              width: `${width}px`,
              height: `${height}px`,
              border: '1px solid black',
            }}
          >
            <MetricChart
              metric={metric}
              projections={projections}
              height={height}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default AllStates;
