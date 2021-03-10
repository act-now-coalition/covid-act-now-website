import React from 'react';
import { LoadingScreen } from './AllStates.style';
import { useProjectionsFromRegion } from 'common/utils/model';
import { Metric } from 'common/metricEnum';
import { MetricChart } from 'components/Charts';
import regions, { Region } from 'common/regions';
import * as QueryString from 'query-string';
import { useHistory } from 'react-router-dom';

function AllStates() {
  const fips = ['48117', '48063', '48109', '48405'];
  const counties = regions.counties.filter(r => fips.includes(r.fipsCode));
  const all: Region[] = [...counties, ...regions.states];
  return (
    <>
      {all.map(region => {
        return <State key={region.fipsCode} state={region} />;
      })}
    </>
  );
}

function State({ state }: { state: Region }) {
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
