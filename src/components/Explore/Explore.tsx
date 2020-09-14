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
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Explore: React.FunctionComponent<{
  projection: Projection;
  chartId?: string;
  compareCopy: string;
}> = ({ projection, chartId, compareCopy }) => {
  const { locationName, fips } = projection;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobileXs = useMediaQuery(theme.breakpoints.down('xs'));

  const defaultMetric =
    (chartId && getMetricByChartId(chartId)) || ExploreMetric.CASES;
  const [currentMetric, setCurrentMetric] = useState(defaultMetric);

  const [normalizeData, setNormalizeData] = useState(false);

  const onChangeTab = (newMetric: number) => setCurrentMetric(newMetric);

  const metricLabels = getMetricLabels();
  const currentMetricName = metricLabels[currentMetric];

  const currentLocation = useMemo(() => findLocationForFips(fips), [fips]);
  const autocompleteLocations = useMemo(() => getAutocompleteLocations(fips), [
    fips,
  ]);

  const [selectedLocations, setSelectedLocations] = useState<Location[]>([
    currentLocation,
  ]);

  const onChangeSelectedLocations = (newLocations: Location[]) => {
    const changedLocations = uniq([currentLocation, ...newLocations]);

    if (selectedLocations.length > 1 && changedLocations.length === 1) {
      // if switching from multiple to a single location, disable normalization
      setNormalizeData(false);
    } else if (selectedLocations.length === 1 && changedLocations.length > 1) {
      // if switching from single to multiple locations, enable normalization
      setNormalizeData(true);
    }

    // make sure that the current location is always selected
    setSelectedLocations(changedLocations);
  };

  // Resets the state when navigating locations
  useEffect(() => {
    setSelectedLocations([currentLocation]);
    setCurrentMetric(defaultMetric);
  }, [currentLocation, defaultMetric]);

  const [chartSeries, setChartSeries] = useState<Series[]>([]);
  useEffect(() => {
    const fetchSeries = () =>
      getChartSeries(currentMetric, selectedLocations, normalizeData);
    fetchSeries().then(setChartSeries);
  }, [selectedLocations, currentMetric, normalizeData]);

  const hasData = some(chartSeries, ({ data }) => data.length > 0);
  const hasMultipleLocations = selectedLocations.length > 1;

  const lastUpdatedDate: Date | null = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate !== null ? lastUpdatedDate.toLocaleDateString() : '';

  const modalNormalizeCheckboxProps = {
    hasMultipleLocations,
    normalizeData,
    setNormalizeData,
  };

  return (
    <Styles.Container>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Styles.Heading variant="h4">Trends</Styles.Heading>
          <Styles.Subtitle>
            {currentMetricName} {normalizeData ? 'per 100k population' : ''}{' '}
            since march 1st in {getLocationNames(selectedLocations)}
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
              disabled={hasMultipleLocations}
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
        <Styles.TableAutocompleteHeader>
          {compareCopy}
        </Styles.TableAutocompleteHeader>
        <Grid container spacing={1}>
          <Grid key="location-selector" item sm={6} xs={6}>
            <LocationSelector
              locations={autocompleteLocations}
              selectedLocations={selectedLocations}
              onChangeSelectedLocations={onChangeSelectedLocations}
              {...modalNormalizeCheckboxProps}
              compareCopy={compareCopy}
            />
          </Grid>
          {!hasMultipleLocations && (
            <Grid key="legend" item sm xs={12}>
              <Legend seriesList={chartSeries} />
            </Grid>
          )}
          {hasMultipleLocations && (
            <Styles.NormalizeDataContainer hideNormalizeControl={isMobileXs}>
              <Grid key="legend" item sm xs={12}>
                <FormControlLabel
                  control={
                    <Styles.NormalizeCheckbox
                      checked={normalizeData}
                      onChange={() => {
                        setNormalizeData(!normalizeData);
                      }}
                      name="normalize data"
                      disableRipple
                      id="normalize-data-control"
                    />
                  }
                  label="Normalize Data"
                />
                <Styles.NormalizeSubLabel>
                  Per 100k population
                </Styles.NormalizeSubLabel>
              </Grid>
            </Styles.NormalizeDataContainer>
          )}
        </Grid>
      </Styles.ChartControlsContainer>
      {hasData ? (
        <Styles.ChartContainer adjustContainerWidth={hasMultipleLocations}>
          {/**
           * The width is set to zero while the parent div is rendering, the
           * placeholder div below prevents the page from jumping.
           */}
          <ParentSize>
            {({ width }) =>
              width > 0 ? (
                <ExploreChart
                  seriesList={chartSeries}
                  isMobile={isMobile}
                  width={width}
                  height={400}
                  tooltipSubtext={`in ${locationName}`}
                  hasMultipleLocations={hasMultipleLocations}
                  isMobileXs={isMobileXs}
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
