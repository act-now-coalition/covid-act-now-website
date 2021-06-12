import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import some from 'lodash/some';
import uniq from 'lodash/uniq';
import max from 'lodash/max';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { ParentSize } from '@vx/responsive';
import ShareButtonGroup from 'components/ShareButtons';
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
  Period,
  periodMap,
  getAllPeriodLabels,
  ORIGINAL_EXPLORE_METRICS,
  getMetricDataMeasure,
  getDateRange,
  getYFormat,
  getYAxisDecimalPlaces,
  getXTickTimeUnitForPeriod,
  getMaxYFromDefinition,
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
import { SectionHeader } from 'components/SharedComponents';
import NationalText from 'components/NationalText';
import Dropdown from 'components/Explore/Dropdown/Dropdown';
import { getLocationLabel } from 'components/AutocompleteRegions';

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
  title?: string;
  showNationalSummary?: boolean;
  currentMetric: ExploreMetric;
  setCurrentMetric: React.Dispatch<React.SetStateAction<ExploreMetric>>;
}> = React.memo(
  ({
    initialFipsList,
    title = 'Trends',
    showNationalSummary = false,
    currentMetric,
    setCurrentMetric,
  }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMobileXs = useMediaQuery(theme.breakpoints.down('xs'));

    const { sharedComponentId } = useParams<{
      sharedComponentId?: string;
    }>();

    // TODO (chris): Dont love the way of forcing a ''
    const region = useRegionFromParams();

    // Originally we had share URLs like /explore/cases instead of
    // /explore/<sharedComponentId> and so this code allows them to keep working.
    if (sharedComponentId && EXPLORE_CHART_IDS.includes(sharedComponentId)) {
      const sharedMetric = getMetricByChartId(sharedComponentId)!;
      setCurrentMetric(sharedMetric);
    }

    const onSelectCurrentMetric = (newMetric: number) => {
      const newMetricName = metricLabels[newMetric];
      setCurrentMetric(newMetric);
      trackExploreEvent(EventAction.SELECT, `Metric: ${newMetricName}`);
    };

    const currentMetricName = getMetricName(currentMetric);

    const dataMeasure = getMetricDataMeasure(currentMetric);
    const yAxisDecimalPlaces = getYAxisDecimalPlaces(currentMetric);
    const yTickFormat = getYFormat(dataMeasure, yAxisDecimalPlaces);
    const yTooltipFormat = getYFormat(dataMeasure, 1);
    const allPeriodLabels = getAllPeriodLabels();

    const initialLocations = useMemo(
      () => initialFipsList.map(fipsCode => regions.findByFipsCode(fipsCode)!),
      [initialFipsList],
    );

    const autocompleteLocations = useMemo(
      () => getExploreAutocompleteLocations(initialFipsList[0]),
      [initialFipsList],
    );

    const [chartSeries, setChartSeries] = useState<Series[]>([]);

    const [selectedLocations, setSelectedLocations] = useState<Region[]>(
      initialLocations,
    );

    const [period, setPeriod] = useState<Period>(Period.ALL);

    const multiLocation = selectedLocations.length > 1;

    // TODO (chelsi) - does this need to be state?
    const [normalizeData, setNormalizeData] = useState(
      multiLocation && ORIGINAL_EXPLORE_METRICS.includes(currentMetric),
    );

    const metricLabels = getMetricLabels(multiLocation);

    const dateRange = getDateRange(period);

    const onSelectTimePeriod = (newPeriod: Period) => {
      setPeriod(newPeriod);
      const newPeriodLabel = periodMap[newPeriod].label;
      trackExploreEvent(EventAction.SELECT, `Period: ${newPeriodLabel}`);
    };

    const onChangeSelectedLocations = (newLocations: Region[]) => {
      const changedLocations = uniq(newLocations);
      const eventLabel =
        selectedLocations.length < changedLocations.length
          ? 'Adding Location'
          : 'Removing Location';
      trackExploreEvent(
        EventAction.SELECT,
        eventLabel,
        changedLocations.length,
      );
      // make sure that the current location is always selected
      setSelectedLocations(changedLocations);
    };

    const exploreRef = useRef<HTMLDivElement>(null);
    const scrollToExplore = useCallback(() => {
      const scrollOffset = 200;
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

    const hasData = some(chartSeries, ({ data }) => data.length > 0);
    const hasMultipleLocations = selectedLocations.length > 1;

    const { pathname } = useLocation();

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

    const maxYFromDefinition = getMaxYFromDefinition(currentMetric);

    const sharedParams = useSharedComponentParams(SharedComponent.Explore);

    useEffect(() => {
      const fetchSeries = () =>
        getChartSeries(currentMetric, selectedLocations, normalizeData);
      fetchSeries().then(setChartSeries);
    }, [selectedLocations, currentMetric, normalizeData]);

    // Scrolls to explore if the url contains /explore (ie. if it's a share link)
    useEffect(() => {
      if (pathname.includes('/explore')) {
        const timeoutId = scrollToExplore();
        return () => clearTimeout(timeoutId);
      }
      setSelectedLocations(initialLocations);
      setNormalizeData(
        initialLocations.length > 1 &&
          ORIGINAL_EXPLORE_METRICS.includes(currentMetric),
      );
    }, [currentMetric, initialLocations, pathname, scrollToExplore]);

    // if the pathname changes (ie. if navigating between location pages via compare or minimap)-
    // resets metric, time period, and locations
    // (need to force the reset since the route doesnt change)
    useEffect(() => {
      setSelectedLocations(initialLocations);
      setCurrentMetric(ExploreMetric.CASES);
      setPeriod(Period.ALL);
    }, [pathname, region, initialLocations, setCurrentMetric]);

    // checks for shared parameters (ie. if arriving from a share link)
    // and sets state according to the shared params
    useEffect(() => {
      if (sharedParams) {
        setCurrentMetric(sharedParams.currentMetric);
        setNormalizeData(sharedParams.normalizeData);
        const locations = sharedParams.selectedFips.map(
          (fips: string) => regions.findByFipsCode(fips)!,
        );
        setSelectedLocations(locations);
      }
    }, [setCurrentMetric, sharedParams]);

    // keeps normalizeData current with location and metric selection
    useEffect(() => {
      setNormalizeData(
        selectedLocations.length > 1 &&
          ORIGINAL_EXPLORE_METRICS.includes(currentMetric),
      );
    }, [
      currentMetric,
      selectedLocations,
      metricLabels,
      allPeriodLabels,
      period,
    ]);

    const trackingLabel = hasMultipleLocations
      ? `Multiple Locations`
      : 'Single Location';
    const numLocations = selectedLocations.length;

    const showLegend =
      ORIGINAL_EXPLORE_METRICS.includes(currentMetric) && numLocations === 1;

    // menu labels for metric, time period, and selected locations:
    const metricMenuLabel = metricLabels[currentMetric];
    const regionsMenuLabel = selectedLocations.map(getLocationLabel).join('; ');
    const periodMenuLabel = allPeriodLabels[period];

    return (
      <div ref={exploreRef}>
        <SectionHeader>{title}</SectionHeader>
        {showNationalSummary && <NationalText />}
        <Styles.ChartControlsContainer>
          <Dropdown
            menuLabel="Metric"
            buttonSelectionLabel={metricMenuLabel}
            itemLabels={metricLabels}
            onSelect={onSelectCurrentMetric}
            maxWidth={250}
          />
          <Dropdown
            menuLabel="Past # of days"
            buttonSelectionLabel={periodMenuLabel}
            itemLabels={allPeriodLabels}
            onSelect={onSelectTimePeriod}
            maxWidth={150}
          />
          <LocationSelector
            regions={autocompleteLocations}
            selectedRegions={selectedLocations}
            onChangeSelectedRegions={onChangeSelectedLocations}
            maxWidth={400}
            regionNamesMenuLabel={regionsMenuLabel}
          />
        </Styles.ChartControlsContainer>
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
                    dateRange={dateRange}
                    yTickFormat={yTickFormat}
                    yTooltipFormat={yTooltipFormat}
                    xTickTimeUnit={getXTickTimeUnitForPeriod(period)}
                    maxYFromDefinition={maxYFromDefinition}
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
        <Styles.FooterContainer>
          {showLegend && <Legend seriesList={chartSeries} />}
          <Styles.ShareBlock>
            <ShareButtonGroup
              disabled={selectedLocations.length === 0 || !hasData}
              imageUrl={() => createSharedComponentId().then(getExportImageUrl)}
              imageFilename={getImageFilename(selectedLocations, currentMetric)}
              url={() =>
                createSharedComponentId().then(sharingId =>
                  getChartUrl(sharingId, region),
                )
              }
              quote={getSocialQuote(selectedLocations, currentMetric)}
              region={region ? region : undefined}
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
            />
          </Styles.ShareBlock>
        </Styles.FooterContainer>
      </div>
    );
  },
);

export default Explore;
