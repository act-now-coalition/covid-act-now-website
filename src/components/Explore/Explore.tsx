import React, { useState, FunctionComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import { Projection } from 'common/models/Projection';
import ExploreTabs from './ExploreTabs';
import ExploreChart from './ExploreChart';
import * as Styles from './Explore.style';
import { ParentSize } from '@vx/responsive';
import { ExploreMetric } from './interfaces';
import { getMetricLabels, getSeries } from './utils';

const Explore: React.FunctionComponent<{ projection: Projection }> = ({
  projection,
}) => {
  const [currentMetric, setCurrentMetric] = useState(ExploreMetric.CASES);

  const onChangeTab = (event: React.ChangeEvent<{}>, newMetric: number) => {
    setCurrentMetric(newMetric);
  };

  const metricLabels = getMetricLabels();
  const series = getSeries(currentMetric, projection);

  return (
    <Styles.Container>
      <Styles.Header>
        <Typography variant="h4" component="h2">
          Trends
        </Typography>
        <Styles.Subtitle>
          cases since march 1st in {projection.locationName}
        </Styles.Subtitle>
      </Styles.Header>
      <ExploreTabs
        activeTabIndex={currentMetric}
        labels={metricLabels}
        onChangeTab={onChangeTab}
      />
      <Styles.ChartContainer>
        <ParentSize>
          {({ width }) => (
            <ExploreChart series={series} width={width} height={400} />
          )}
        </ParentSize>
      </Styles.ChartContainer>
    </Styles.Container>
  );
};

export default Explore;
