import React, { useState, FunctionComponent } from 'react';
import { some, uniq } from 'lodash';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { ParentSize } from '@vx/responsive';
import { Projection } from 'common/models/Projection';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { findLocationForFips, Location } from 'common/locations';
import {
  DisclaimerWrapper,
  DisclaimerBody,
} from 'components/Disclaimer/Disclaimer.style';
import ExternalLink from 'components/ExternalLink';
import ShareImageButtonGroup from 'components/ShareButtons';
import ExploreTabs from './ExploreTabs';
import ExploreChart from './ExploreChart';
import Legend from './Legend';
import { ExploreMetric } from './interfaces';
import EmptyChart from './EmptyChart';
import LocationSelector from './LocationSelector';
import {
  getMetricLabels,
  getSeries,
  getMetricByChartId,
  getImageFilename,
  getExportImageUrl,
  getChartUrl,
  getSocialQuote,
  getLocationNames,
  getAutocompleteLocations,
} from './utils';
import * as Styles from './Explore.style';

const Explore: React.FunctionComponent<{
  projection: Projection;
  chartId?: string;
}> = ({ projection, chartId }) => {
  const { locationName, fips } = projection;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [currentMetric, setCurrentMetric] = useState(
    (chartId && getMetricByChartId(chartId)) || ExploreMetric.CASES,
  );

  const onChangeTab = (event: React.ChangeEvent<{}>, newMetric: number) => {
    setCurrentMetric(newMetric);
  };

  const metricLabels = getMetricLabels();

  const currentLocation = findLocationForFips(fips);
  const autocompleteLocations = getAutocompleteLocations(fips);

  const [selectedLocations, setSelectedLocations] = useState<Location[]>([
    currentLocation,
  ]);

  const onChangeSelectedLocations = (newLocations: Location[]) => {
    // make sure that the current location is always selected
    setSelectedLocations(uniq([currentLocation, ...newLocations]));
  };
  const currentMetricName = metricLabels[currentMetric];

  const series = getSeries(currentMetric, projection);

  const hasData = some(series, ({ data }) => data.length > 0);

  const lastUpdatedDate: Date | null = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate !== null ? lastUpdatedDate.toLocaleDateString() : '';

  return (
    <Styles.Container>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Styles.Heading variant="h4">Trends</Styles.Heading>
          <Styles.Subtitle>
            {currentMetricName} since march 1st in{' '}
            {getLocationNames(selectedLocations)}
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
        <Grid container spacing={1}>
          <Grid key="location-selector" item sm={6} xs={6}>
            <LocationSelector
              locations={autocompleteLocations}
              selectedLocations={selectedLocations}
              onChangeSelectedLocations={onChangeSelectedLocations}
            />
          </Grid>
          <Grid key="legend" item sm xs={12}>
            <Legend series={series} />
          </Grid>
        </Grid>
      </Styles.ChartControlsContainer>
      {hasData ? (
        <Styles.ChartContainer>
          {/* The width is set to zero while the parent div is rendering */}
          <ParentSize>
            {({ width }) => (
              <ExploreChart
                series={series}
                isMobile={isMobile}
                width={width}
                height={400}
                tooltipSubtext={`in ${locationName}`}
              />
            )}
          </ParentSize>
        </Styles.ChartContainer>
      ) : (
        <EmptyChart height={400}>
          <p>
            We don't have {currentMetricName} data for {locationName}. Learn
            more about{' '}
            <ExternalLink href="https://docs.google.com/document/d/1cd_cEpNiIl1TzUJBvw9sHLbrbUZ2qCxgN32IqVLa3Do/edit">
              our methodology
            </ExternalLink>{' '}
            and our{' '}
            <ExternalLink href="https://docs.google.com/presentation/d/1XmKCBWYZr9VQKFAdWh_D7pkpGGM_oR9cPjj-UrNdMJQ/edit">
              our data sources
            </ExternalLink>
            .
          </p>
        </EmptyChart>
      )}
      <DisclaimerWrapper>
        <DisclaimerBody>
          Last updated {lastUpdatedDateString}. Learn more about{' '}
          <ExternalLink href="https://docs.google.com/presentation/d/1XmKCBWYZr9VQKFAdWh_D7pkpGGM_oR9cPjj-UrNdMJQ/edit">
            our data sources
          </ExternalLink>
          .
        </DisclaimerBody>
      </DisclaimerWrapper>
    </Styles.Container>
  );
};

export default Explore;
