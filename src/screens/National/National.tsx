import React, { Fragment, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import ShareBlock from 'components/ShareBlock/ShareBlock';
import { Heading1, Heading2, Heading3, Paragraph } from 'components/Markdown';
import Map from 'components/Map/Map';
import CompareMain from 'components/Compare/CompareMain';
import ExploreChart from 'components/Explore/ExploreChart';
import { Placeholder, PageContent } from './National.style';
import { findLocationForFips } from 'common/locations';
import { getChartSeries } from 'components/Explore/utils';
import { ExploreMetric, Series } from 'components/Explore/interfaces';
import { ParentSize } from '@vx/responsive';

const noop = () => {};

const National: React.FC = () => {
  const locationUsa = findLocationForFips('00001');
  const [seriesCases, setSeriesCases] = useState<Series[]>([]);
  const [seriesDeaths, setSeriesDeaths] = useState<Series[]>([]);

  useEffect(() => {
    const fetchSeries = () =>
      getChartSeries(ExploreMetric.CASES, [locationUsa], false);
    fetchSeries().then(setSeriesCases);
  }, [setSeriesCases, locationUsa]);

  useEffect(() => {
    const fetchSeries = () =>
      getChartSeries(ExploreMetric.DEATHS, [locationUsa], false);
    fetchSeries().then(setSeriesDeaths);
  }, [setSeriesDeaths, locationUsa]);

  return (
    <Fragment>
      {/* Meta tags */}
      <PageContent>
        <Heading1>COVID in the US</Heading1>
        <Paragraph>Intro paragraph</Paragraph>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <Heading3>Daily new cases</Heading3>
            <Placeholder>
              {seriesCases && (
                <ParentSize>
                  {({ width }) => (
                    <ExploreChart
                      seriesList={seriesCases}
                      isMobile={false}
                      width={width}
                      height={300}
                      tooltipSubtext={`in US`}
                      hasMultipleLocations={false}
                      isMobileXs={false}
                      marginRight={20}
                    />
                  )}
                </ParentSize>
              )}
            </Placeholder>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Heading3>Daily deaths</Heading3>
            <Placeholder>
              {seriesDeaths && (
                <ParentSize>
                  {({ width }) => (
                    <ExploreChart
                      seriesList={seriesDeaths}
                      isMobile={false}
                      width={width}
                      height={300}
                      tooltipSubtext={`in US`}
                      hasMultipleLocations={false}
                      isMobileXs={false}
                      marginRight={20}
                    />
                  )}
                </ParentSize>
              )}
            </Placeholder>
          </Grid>
        </Grid>
        <Heading2>State by state</Heading2>
        <Paragraph>Intro paragraph</Paragraph>
        <Placeholder>
          <Map setMobileMenuOpen={noop} setMapOption={noop} />
        </Placeholder>
        <Heading2>Compare key indicators</Heading2>
        <Paragraph>Intro paragraph</Paragraph>
        <Placeholder>
          <CompareMain locationsViewable={8} isHomepage county={null} />
        </Placeholder>
      </PageContent>
      <ShareBlock />
    </Fragment>
  );
};

export default National;
