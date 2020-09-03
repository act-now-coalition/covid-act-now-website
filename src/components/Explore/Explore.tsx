import React, { useState, useMemo, useEffect } from 'react';
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
import { ExploreMetric, Series } from './interfaces';
import EmptyChart from './EmptyChart';
import LocationSelector from './LocationSelector';
import {
  getMetricLabels,
  getMetricByChartId,
  getImageFilename,
  getExportImageUrl,
  getChartUrl,
  getSocialQuote,
  getLocationNames,
  getAutocompleteLocations,
  getChartSeries,
} from './utils';
import * as Styles from './Explore.style';

const Explore: React.FunctionComponent<{
  projection: Projection;
  chartId?: string;
}> = ({ projection, chartId }) => {
  const { locationName, fips } = projection;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const initialMetric =
    (chartId && getMetricByChartId(chartId)) || ExploreMetric.CASES;
  const [currentMetric, setCurrentMetric] = useState(initialMetric);

  const onChangeTab = (event: React.ChangeEvent<{}>, newMetric: number) => {
    setCurrentMetric(newMetric);
  };

  const metricLabels = getMetricLabels();
  const currentMetricName = metricLabels[currentMetric];

  const [chartSeries, setChartSeries] = useState<Series[]>([]);

  const currentLocation = useMemo(() => findLocationForFips(fips), [fips]);
  const autocompleteLocations = useMemo(() => getAutocompleteLocations(fips), [
    fips,
  ]);

  const [selectedLocations, setSelectedLocations] = useState<Location[]>([
    currentLocation,
  ]);

  const onChangeSelectedLocations = (newLocations: Location[]) => {
    // make sure that the current location is always selected
    setSelectedLocations(uniq([currentLocation, ...newLocations]));
  };

  useEffect(() => {
    const fetchSeries = () => getChartSeries(currentMetric, selectedLocations);
    fetchSeries().then(series => setChartSeries(series));
  }, [selectedLocations, currentMetric]);

  const hasData = some(chartSeries, ({ data }) => data.length > 0);
  const hasMultipleLocations = selectedLocations.length > 1;

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
          {!hasMultipleLocations && (
            <Grid key="legend" item sm xs={12}>
              <Legend series={chartSeries} />
            </Grid>
          )}
        </Grid>
      </Styles.ChartControlsContainer>
      {hasData ? (
        <Styles.ChartContainer>
          {/**
           * The width is set to zero while the parent div is rendering, the
           * placeholder div below prevents the page from jumping.
           */}
          <ParentSize>
            {({ width }) =>
              width > 0 ? (
                <ExploreChart
                  series={chartSeries}
                  isMobile={isMobile}
                  width={width}
                  height={400}
                  tooltipSubtext={`in ${locationName}`}
                  showLabels={hasMultipleLocations}
                  marginRight={hasMultipleLocations ? 100 : 10}
                />
              ) : (
                <div style={{ height: 400 }} />
              )
            }
          </ParentSize>
        </Styles.ChartContainer>
      ) : (
        <EmptyChart
          height={400}
          metricName={currentMetricName}
          locationName={locationName}
        />
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
