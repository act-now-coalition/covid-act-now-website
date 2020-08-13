import React, { useState, FunctionComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import { Projection } from 'common/models/Projection';
import ExploreTabs from './ExploreTabs';
import ExploreChart from './ExploreChart';
import * as Styles from './Explore.style';
import { ParentSize } from '@vx/responsive';
import { ChartType, Series } from './interfaces';

// TODO(pablo): Create enums and unify with metrics
const tabLabels = [
  'Cases',
  'Deaths',
  'Hospitalizations',
  'ICU Hospitalizations',
];

const Explore: React.FunctionComponent<{ projection: Projection }> = ({
  projection,
}) => {
  const [tabIndex, setTabIndex] = useState(1);

  const onChangeTab = (event: React.ChangeEvent<{}>, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const rawData: Series = {
    data: projection.getDataset('cumulativeDeaths'),
    type: ChartType.LINE,
  };

  const smoothedData: Series = {
    data: projection.getDataset('cumulativeDeaths'),
    type: ChartType.BAR,
  };

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
        activeTabIndex={tabIndex}
        labels={tabLabels}
        onChangeTab={onChangeTab}
      />
      <Styles.ChartContainer>
        <ParentSize>
          {({ width }) => (
            <ExploreChart
              series={[rawData, smoothedData]}
              width={width}
              height={400}
            />
          )}
        </ParentSize>
      </Styles.ChartContainer>
    </Styles.Container>
  );
};

export default Explore;
