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
  getSubtitle,
  METHODOLOGY_URL,
  DATA_SOURCES_URL,
} from './utils';
import * as Styles from './Explore.style';
import {
  SharedComponent,
  storeSharedComponentParams,
  useSharedComponentParams,
} from 'common/sharing';
import { findFipsByUrlParams } from 'common/locations';
import { ScreenshotReady } from 'components/Screenshot';
import { EventCategory, EventAction, trackEvent } from 'components/Analytics';

const MARGIN_SINGLE_LOCATION = 20;
const MARGIN_STATE_CODE = 60;
const MARGIN_COUNTY = 120;

function trackExploreEvent(action: EventAction, label: string, value?: number) {
  trackEvent(EventCategory.EXPLORE, action, label, value);
}

function getNoDataCopy(metricName: string, locationNames: string) {
  return (
    <p>
      We don't have {metricName} data for {locationNames}. Learn more about{' '}
      <ExternalLink href={METHODOLOGY_URL}>our methodology</ExternalLink> and
      our <ExternalLink href={DATA_SOURCES_URL}>our data sources</ExternalLink>.
    </p>
  );
}

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
  initialFipsList: string[];
  title?: string;
}> = ({ initialFipsList, title = 'Trends' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobileXs = useMediaQuery(theme.breakpoints.down('xs'));
  const metricLabels = getMetricLabels();

  const { sharedComponentId, stateId, countyId } = useParams<{
    sharedComponentId?: string;
    stateId?: string;
    countyId?: string;
  }>();

  const locationFips = findFipsByUrlParams(stateId, countyId);

  let defaultMetric = ExploreMetric.CASES;
  // Originally we had share URLs like /explore/cases instead of
  // /explore/<sharedComponentId> and so this code allows them to keep working.
  if (sharedComponentId && EXPLORE_CHART_IDS.includes(sharedComponentId)) {
    defaultMetric = getMetricByChartId(sharedComponentId)!;
  }
  const [currentMetric, setCurrentMetric] = useState(defaultMetric);

  const [normalizeData, setNormalizeData] = useState(
    initialFipsList.length > 1,
  );

  const onChangeTab = (newMetric: number) => {
    const newMetricName = metricLabels[newMetric];
    setCurrentMetric(newMetric);
    trackExploreEvent(EventAction.SELECT, `Metric: ${newMetricName}`);
  };

  const onClickNormalize = () => {
    const newNormalizeData = !normalizeData;
    setNormalizeData(newNormalizeData);
    trackExploreEvent(
      EventAction.SELECT,
      'Normalize Data',
      newNormalizeData ? 1 : 0,
    );
  };

  const currentMetricName = getMetricName(currentMetric);

  const currentLocations = useMemo(
    () => initialFipsList.map(findLocationForFips),
    [initialFipsList],
  );
  const autocompleteLocations = useMemo(
    () => getAutocompleteLocations(initialFipsList[0]),
    [initialFipsList],
  );

  const [selectedLocations, setSelectedLocations] = useState<Location[]>(
    currentLocations,
  );

  const onChangeSelectedLocations = (newLocations: Location[]) => {
    const changedLocations = uniq(newLocations);
    if (selectedLocations.length > 1 && changedLocations.length === 1) {
      // if switching from multiple to a single location, disable normalization
      setNormalizeData(false);
    } else if (selectedLocations.length === 1 && changedLocations.length > 1) {
      // if switching from single to multiple locations, enable normalization
      setNormalizeData(true);
    }

    const eventLabel =
      selectedLocations.length < changedLocations.length
        ? 'Adding Location'
        : 'Removing Location';
    trackExploreEvent(EventAction.SELECT, eventLabel, changedLocations.length);

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

  // We need to reset the selected locations and the default metric when
  // the user clicks a location on the Compare table or on the mini map so
  // they are not carried over to the new location page.
  useEffect(() => {
    setSelectedLocations(currentLocations);
    setCurrentMetric(defaultMetric);
  }, [currentLocations, defaultMetric]);

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
      const locations = sharedParams.selectedFips.map(findLocationForFips);
      setSelectedLocations(locations);
    }
  }, [sharedParams]);

  const trackingLabel = hasMultipleLocations
    ? `Multiple Locations`
    : 'Single Location';

  return (
    <Styles.Container ref={exploreRef}>
      <Grid container spacing={1}>
        <Grid item sm={9} xs={12}>
          <Styles.Heading variant="h4">{title}</Styles.Heading>
        </Grid>
        <Grid item sm xs={12}>
          <Styles.ShareBlock>
            <ShareImageButtonGroup
              disabled={selectedLocations.length === 0 || !hasData}
              imageUrl={() => createSharedComponentId().then(getExportImageUrl)}
              imageFilename={getImageFilename(selectedLocations, currentMetric)}
              url={() =>
                createSharedComponentId().then(sharingId =>
                  getChartUrl(sharingId, locationFips),
                )
              }
              quote={getSocialQuote(selectedLocations, currentMetric)}
              hashtags={['COVIDActNow']}
              onSaveImage={() => {
                trackExploreEvent(
                  EventAction.SAVE_IMAGE,
                  trackingLabel,
                  selectedLocations.length,
                );
              }}
              onCopyLink={() => {
                trackExploreEvent(
                  EventAction.COPY_LINK,
                  trackingLabel,
                  selectedLocations.length,
                );
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
          <Grid key="location-selector" item sm={9} xs={12}>
            <LocationSelector
              locations={autocompleteLocations}
              selectedLocations={selectedLocations}
              onChangeSelectedLocations={onChangeSelectedLocations}
              {...modalNormalizeCheckboxProps}
            />
          </Grid>
          {!hasMultipleLocations && (
            <Grid key="legend" item sm={3} xs={12}>
              <Legend seriesList={chartSeries} />
            </Grid>
          )}
          {hasMultipleLocations && !isMobileXs && (
            <Grid key="legend" item sm={3} xs={12}>
              <Styles.NormalizeDataContainer>
                <FormControlLabel
                  control={
                    <Styles.NormalizeCheckbox
                      checked={normalizeData}
                      onChange={onClickNormalize}
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
              </Styles.NormalizeDataContainer>
            </Grid>
          )}
        </Grid>
      </Styles.ChartControlsContainer>
      <Styles.Subtitle>
        {getSubtitle(currentMetricName, normalizeData, selectedLocations)}
      </Styles.Subtitle>
      {selectedLocations.length > 0 && hasData && (
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
      )}
      {selectedLocations.length > 0 && !hasData && (
        <Styles.EmptyPanel style={{ height: 400 }}>
          {getNoDataCopy(
            currentMetricName,
            getLocationNames(selectedLocations),
          )}
        </Styles.EmptyPanel>
      )}
      {selectedLocations.length === 0 && (
        <Styles.EmptyPanel style={{ height: 400 }}>
          <p>Please select states or counties to explore trends.</p>
          <ScreenshotReady />
        </Styles.EmptyPanel>
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
