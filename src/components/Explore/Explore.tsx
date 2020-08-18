import React, { useState, FunctionComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { ParentSize } from '@vx/responsive';
import { Projection } from 'common/models/Projection';
import ExploreTabs from './ExploreTabs';
import ExploreChart from './ExploreChart';
import Legend from './Legend';
import { ExploreMetric } from './interfaces';
import { getMetricLabels, getSeries } from './utils';
import * as Styles from './Explore.style';

const Explore: React.FunctionComponent<{ projection: Projection }> = ({
  projection,
}) => {
  const [currentMetric, setCurrentMetric] = useState(ExploreMetric.CASES);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
      <Styles.ChartControlsContainer>
        <Legend series={series} />
      </Styles.ChartControlsContainer>
      <Styles.ChartContainer>
        <ParentSize>
          {({ width }) =>
            width < 10 ? null : (
              <ExploreChart
                series={series}
                isMobile={isMobile}
                width={width}
                height={400}
              />
            )
          }
        </ParentSize>
      </Styles.ChartContainer>
    </Styles.Container>
  );
};

export default Explore;
