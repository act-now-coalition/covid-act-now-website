import React, { useEffect, useState } from 'react';
import { LoadingScreen } from './AllStates.style';
import {
  fetchAllStateProjections,
  useProjectionsFromRegion,
} from 'common/utils/model';
import { Metric } from 'common/metricEnum';
import { MetricChart } from 'components/Charts';
import regions, { State, State as StateType } from 'common/regions';
import { Projections } from 'common/models/Projections';
import { sortBy } from 'lodash';

export function useStateProjections(): Array<Projections> | null {
  const [projections, setProjections] = useState<Array<Projections> | null>(
    null,
  );

  useEffect(() => {
    async function fetchData() {
      const projections = await fetchAllStateProjections();
      setProjections(projections);
    }

    fetchData();
  });

  return projections;
}

function AllStates() {
  const stateProjections = useStateProjections();
  return (
    stateProjections && (
      <>
        {sortBy(
          stateProjections,
          p => -(p.getMetricValue(Metric.CASE_GROWTH_RATE) || 0),
        ).map(projections => {
          return (
            <StateEntry
              key={projections.region.fipsCode}
              projections={projections}
            />
          );
        })}
      </>
    )
  );
}

function StateEntry({ projections }: { projections: Projections }) {
  // Projections haven't loaded yet
  if (!projections) {
    return <LoadingScreen></LoadingScreen>;
  }
  const stateName = (projections.region as State).name;

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
        {[Metric.CASE_DENSITY, Metric.CASE_GROWTH_RATE].map(metric => (
          <div style={{ width: '48%' }}>
            <MetricChart metric={metric} projections={projections} />
          </div>
        ))}
      </div>
    </>
  );
}

export default AllStates;
