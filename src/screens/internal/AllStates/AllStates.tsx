import React, { useEffect, useState } from 'react';

import { LoadingScreen } from './AllStates.style';
import { fetchAllStateProjections } from 'common/utils/model';
import { Metric } from 'common/metricEnum';
import { MetricChart } from 'components/Charts';
import { State } from 'common/regions';
import { Projections } from 'common/models/Projections';
import { sortBy } from 'lodash';
import { ExploreChart, ExploreMetric } from 'components/Explore';
import { getProjectionsChartSeries } from 'components/Explore/utils';

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
        <div style={{ width: '48%' }}>
          <MetricChart metric={Metric.CASE_DENSITY} projections={projections} />
        </div>
        <div style={{ width: '48%' }}>
          <ExploreChart
            hasMultipleLocations={true}
            height={350}
            isMobile={false}
            width={600}
            seriesList={getProjectionsChartSeries(
              ExploreMetric.HOSPITALIZATIONS,
              projections,
              true,
            )}
          />
        </div>
      </div>
    </>
  );
}

export default AllStates;
