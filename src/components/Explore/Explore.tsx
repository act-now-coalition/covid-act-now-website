import React, { useState, FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { ParentSize } from '@vx/responsive';
import { Projection } from 'common/models/Projection';
import ShareImageButtonGroup from 'components/ShareButtons';
import ExploreTabs from './ExploreTabs';
import ExploreChart from './ExploreChart';
import Legend from './Legend';
import { ExploreMetric } from './interfaces';

import {
  getMetricLabels,
  getSeries,
  getMetricByChartId,
  getImageFilename,
  getExportImageUrl,
  getChartUrl,
  getSocialQuote,
} from './utils';
import * as Styles from './Explore.style';

const Explore: React.FunctionComponent<{
  projection: Projection;
  chartId?: string;
}> = ({ projection, chartId }) => {
  const [currentMetric, setCurrentMetric] = useState(
    (chartId && getMetricByChartId(chartId)) || ExploreMetric.CASES,
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onChangeTab = (event: React.ChangeEvent<{}>, newMetric: number) => {
    setCurrentMetric(newMetric);
  };

  const metricLabels = getMetricLabels();
  const series = getSeries(currentMetric, projection);
  const { locationName, fips } = projection;

  return (
    <Styles.Container>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Styles.Heading variant="h4">Trends</Styles.Heading>
          <Styles.Subtitle>
            cases since march 1st in {locationName}
          </Styles.Subtitle>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Styles.ShareBlock>
            <ShareImageButtonGroup
              imageUrl={getExportImageUrl(fips, currentMetric)}
              imageFilename={getImageFilename(fips, currentMetric)}
              url={getChartUrl(fips, currentMetric)}
              quote={getSocialQuote(fips, currentMetric)}
              hashtags={['COVIDActNow']}
            />
          </Styles.ShareBlock>
        </Grid>
      </Grid>
      <ExploreTabs
        activeTabIndex={currentMetric}
        labels={metricLabels}
        onChangeTab={onChangeTab}
      />
      <Styles.ChartControlsContainer>
        <Legend series={series} />
      </Styles.ChartControlsContainer>
      <Styles.ChartContainer>
        {/* The width is set to zero while the parent div is rendering */}
        <ParentSize>
          {({ width }) =>
            width < 10 ? null : (
              <ExploreChart
                series={series}
                isMobile={isMobile}
                width={width}
                height={400}
                tooltipSubtext={`in ${locationName}`}
              />
            )
          }
        </ParentSize>
      </Styles.ChartContainer>
    </Styles.Container>
  );
};

export default Explore;
