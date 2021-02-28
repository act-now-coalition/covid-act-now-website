import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useLocation, useParams } from 'common/utils/router';
import some from 'lodash/some';
import uniq from 'lodash/uniq';
import max from 'lodash/max';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ParentSize } from '@vx/responsive';
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
  getExploreAutocompleteLocations,
  getChartSeries,
  getMetricName,
  getSeriesLabel,
  EXPLORE_CHART_IDS,
  getSubtitle,
} from './utils';
import * as Styles from './Explore.style';
import {
  SharedComponent,
  storeSharedComponentParams,
  useSharedComponentParams,
} from 'common/sharing';
import { ScreenshotReady } from 'components/Screenshot';
import { EventCategory, EventAction, trackEvent } from 'components/Analytics';
import regions, { Region, useRegionFromParams } from 'common/regions';
import { LocationPageSectionHeader } from 'components/LocationPage/ChartsHolder.style';
import NationalText from 'components/NationalText';

const MARGIN_SINGLE_LOCATION = 20;
const MARGIN_STATE_CODE = 60;
const MARGIN_COUNTY = 120;

function trackExploreEvent(action: EventAction, label: string, value?: number) {
  trackEvent(EventCategory.EXPLORE, action, label, value);
}

function trackShare(label: string, value?: number) {
  trackExploreEvent(EventAction.SHARE, label, value);
}

function getNoDataCopy(metricName: string, locationNames: string) {
  return (
    <p>
      We don't have {metricName} data for {locationNames}.
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
    ? maxLabelLength > 4
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
  initialChartIndigenousPopulations?: boolean;
  title?: string;
  defaultMetric?: ExploreMetric;
  nationalSummaryText?: React.ReactElement;
}> = ({
  initialFipsList,
  initialChartIndigenousPopulations,
  defaultMetric = ExploreMetric.CASES,
  title = 'Trends',
  nationalSummaryText,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobileXs = useMediaQuery(theme.breakpoints.down('xs'));
  const metricLabels = getMetricLabels();

  const { sharedComponentId } = useParams<{
    sharedComponentId?: string;
  }>();

  // TODO (chris): Dont love the way of forcing a ''
  const region = useRegionFromParams();

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

  const initialLocations = useMemo(
    () => initialFipsList.map(fipsCode => regions.findByFipsCode(fipsCode)!),
    [initialFipsList],
  );

  const indigeneousPopulationsLocations = useMemo(
    () => ['00001', '00002'].map(fips => regions.findByFipsCode(fips)!),
    [],
  );
  const autocompleteLocations = useMemo(
    () => getExploreAutocompleteLocations(initialFipsList[0]),
    [initialFipsList],
  );

  const [selectedLocations, setSelectedLocations] = useState<Region[]>(
    initialLocations,
  );

  const onChangeSelectedLocations = (newLocations: Region[]) => {
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
    if (initialChartIndigenousPopulations) {
      setSelectedLocations(indigeneousPopulationsLocations);
      setNormalizeData(true);
    } else {
      setSelectedLocations(initialLocations);
      setNormalizeData(initialLocations.length > 1);
    }
    setCurrentMetric(defaultMetric);
  }, [
    initialLocations,
    initialChartIndigenousPopulations,
    defaultMetric,
    indigeneousPopulationsLocations,
  ]);

  const [chartSeries, setChartSeries] = useState<Series[]>([]);
  useEffect(() => {
    const fetchSeries = () =>
      getChartSeries(currentMetric, selectedLocations, normalizeData);
    fetchSeries().then(setChartSeries);
  }, [selectedLocations, currentMetric, normalizeData]);

  const hasData = some(chartSeries, ({ data }) => data.length > 0);
  const hasMultipleLocations = selectedLocations.length > 1;

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
      selectedFips: selectedLocations.map(location => location.fipsCode),
    });
  };

  const sharedParams = useSharedComponentParams(SharedComponent.Explore);
  useEffect(() => {
    if (sharedParams) {
      setCurrentMetric(sharedParams.currentMetric);
      setNormalizeData(sharedParams.normalizeData);
      const locations = sharedParams.selectedFips.map(
        (fips: string) => regions.findByFipsCode(fips)!,
      );
      setSelectedLocations(locations);
    }
  }, [sharedParams]);

  const trackingLabel = hasMultipleLocations
    ? `Multiple Locations`
    : 'Single Location';
  const numLocations = selectedLocations.length;

  return (
    <Styles.Container ref={exploreRef}>
      <Grid container spacing={1}>
        <Grid container item sm={9} xs={12} alignContent="center">
          <LocationPageSectionHeader>{title}</LocationPageSectionHeader>
        </Grid>
        <Grid item sm xs={12}>
          <Styles.ShareBlock>
            <ShareImageButtonGroup
              disabled={selectedLocations.length === 0 || !hasData}
              imageUrl={() => createSharedComponentId().then(getExportImageUrl)}
              imageFilename={getImageFilename(selectedLocations, currentMetric)}
              url={() =>
                createSharedComponentId().then(sharingId =>
                  getChartUrl(sharingId, region),
                )
              }
              quote={getSocialQuote(selectedLocations, currentMetric)}
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
              onShareOnFacebook={() =>
                trackShare(`Facebook: ${trackingLabel}`, numLocations)
              }
              onShareOnTwitter={() =>
                trackShare(`Twitter: ${trackingLabel}`, numLocations)
              }
              onShareOnLinkedin={() =>
                trackShare(`Linkedin: ${trackingLabel}`, numLocations)
              }
            />
          </Styles.ShareBlock>
        </Grid>
      </Grid>
      {nationalSummaryText && (
        <NationalText nationalSummaryText={nationalSummaryText} />
      )}
      <ExploreTabs
        activeTabIndex={currentMetric}
        labels={metricLabels}
        onChangeTab={onChangeTab}
      />
      <Styles.ChartControlsContainer>
        <Styles.TableAutocompleteHeader>
          Compare states, counties, or metro areas
        </Styles.TableAutocompleteHeader>
        <Grid container spacing={1}>
          <Grid key="location-selector" item sm={9} xs={12}>
            <LocationSelector
              regions={autocompleteLocations}
              selectedRegions={selectedLocations}
              onChangeSelectedRegions={onChangeSelectedLocations}
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
        <Styles.ChartContainer>
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
    </Styles.Container>
  );
};

export default Explore;
