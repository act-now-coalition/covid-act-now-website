import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { some, uniq, max } from 'lodash';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ParentSize } from '@vx/responsive';
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
  getMetricName,
  getSeriesLabel,
  EXPLORE_CHART_IDS,
} from './utils';
import * as Styles from './Explore.style';
import {
  SharedComponent,
  storeSharedComponentParams,
  useSharedComponentParams,
} from 'common/sharing';
import {
  trackSaveImage,
  trackCopyLink,
  EventCategory,
} from 'components/Analytics';

const MARGIN_SINGLE_LOCATION = 20;
const MARGIN_STATE_CODE = 60;
const MARGIN_COUNTY = 120;

function getMarginRight(
  showLabels: boolean,
  shortLabels: boolean,
  seriesList: Series[],
) {
  const maxLabelLength =
    max(seriesList.map(series => getLabelLength(series, shortLabels))) || 0;

  // We only show the labels when multiple locations are selected. If only
  // states are selected, we only need space for the state code, if at least
  // one county is selected, we need more space.
  return showLabels
    ? maxLabelLength > 2
      ? MARGIN_COUNTY
      : MARGIN_STATE_CODE
    : MARGIN_SINGLE_LOCATION;
}

function getLabelLength(series: Series, shortLabel: boolean) {
  const label = getSeriesLabel(series, shortLabel);
  return label.length;
}

const Explore: React.FunctionComponent<{
  fips: string;
}> = ({ fips }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobileXs = useMediaQuery(theme.breakpoints.down('xs'));

  const { sharedComponentId } = useParams();
  let defaultMetric = ExploreMetric.CASES;
  // Originally we had share URLs like /explore/cases instead of
  // /explore/<sharedComponentId> and so this code allows them to keep working.
  if (sharedComponentId && EXPLORE_CHART_IDS.includes(sharedComponentId)) {
    defaultMetric = getMetricByChartId(sharedComponentId)!;
  }
  const [currentMetric, setCurrentMetric] = useState(defaultMetric);

  const [normalizeData, setNormalizeData] = useState(false);

  const onChangeTab = (newMetric: number) => setCurrentMetric(newMetric);

  const metricLabels = getMetricLabels();
  const currentMetricName = getMetricName(currentMetric);

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

  const exploreRef = useRef<HTMLDivElement>(null);
  const scrollToExplore = useCallback(() => {
    const scrollOffset = 180;
    return setTimeout(() => {
      if (exploreRef.current) {
        window.scrollTo({
          left: 0,
          top: exploreRef.current.offsetTop - scrollOffset,
          behavior: 'smooth',
        });
      }
    }, 200);
  }, [exploreRef]);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes('/explore')) {
      const timeoutId = scrollToExplore();
      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname, scrollToExplore]);

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

  const marginRight = useMemo(
    () => getMarginRight(hasMultipleLocations, isMobileXs, chartSeries),
    [hasMultipleLocations, isMobileXs, chartSeries],
  );

  const createSharedComponentId = async () => {
    return storeSharedComponentParams(SharedComponent.Explore, {
      currentMetric,
      normalizeData,
      selectedFips: selectedLocations.map(
        location => location.full_fips_code || location.state_fips_code,
      ),
    });
  };

  const sharedParams = useSharedComponentParams(SharedComponent.Explore);
  useEffect(() => {
    if (sharedParams) {
      setCurrentMetric(sharedParams.currentMetric);
      setNormalizeData(sharedParams.normalizeData);
      const locations = sharedParams.selectedFips.map((fips: string) =>
        findLocationForFips(fips),
      );
      setSelectedLocations(locations);
    }
  }, [sharedParams]);

  const trackingLabel = hasMultipleLocations
    ? `Multiple Locations`
    : 'Single Location';

  return (
    <Styles.Container ref={exploreRef}>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Styles.Heading variant="h4">Trends</Styles.Heading>
          <Styles.Subtitle>
            {currentMetricName} {normalizeData ? 'per 100k population' : ''} in{' '}
            {getLocationNames(selectedLocations)}.
          </Styles.Subtitle>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Styles.ShareBlock>
            <ShareImageButtonGroup
              imageUrl={() =>
                createSharedComponentId().then(id => getExportImageUrl(id))
              }
              imageFilename={getImageFilename(fips, currentMetric)}
              url={() =>
                createSharedComponentId().then(id => getChartUrl(fips, id))
              }
              quote={getSocialQuote(selectedLocations, currentMetric)}
              hashtags={['COVIDActNow']}
              onSaveImage={() => {
                trackSaveImage(EventCategory.EXPLORE, trackingLabel);
              }}
              onCopyLink={() => {
                trackCopyLink(EventCategory.EXPLORE, trackingLabel);
              }}
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
          Compare states or counties
        </Styles.TableAutocompleteHeader>
        <Grid container spacing={1}>
          <Grid key="location-selector" item sm={6} xs={6}>
            <LocationSelector
              locations={autocompleteLocations}
              selectedLocations={selectedLocations}
              onChangeSelectedLocations={onChangeSelectedLocations}
              {...modalNormalizeCheckboxProps}
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
                  tooltipSubtext={`in ${getLocationNames(selectedLocations)}`}
                  hasMultipleLocations={hasMultipleLocations}
                  isMobileXs={isMobileXs}
                  marginRight={marginRight}
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
          locationName={getLocationNames(selectedLocations)}
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
