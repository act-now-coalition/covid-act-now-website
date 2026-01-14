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
import ExploreChart from './ExploreChart';
import Legend from './Legend';
import { ExploreMetric, Series } from './interfaces';
import LocationSelector from './LocationSelector';
import {
  getMetricLabels,
  getMetricByChartId,
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
  EXPLORE_METRICS,
} from './utils';
import * as Styles from './Explore.style';
import { SectionHeader } from 'components/SharedComponents/SharedComponents.style';
import { SharedComponent, useSharedComponentParams } from 'common/sharing';
import { ScreenshotReady } from 'components/Screenshot';
import { EventCategory, EventAction, trackEvent } from 'components/Analytics';
import regions, { Region, useRegionFromParams } from 'common/regions';
import Dropdown from 'components/Explore/Dropdown/Dropdown';
import { getLocationLabel } from 'components/AutocompleteRegions';
import { EmptyPanel } from 'components/Charts/Charts.style';
import { useChartHeightForBreakpoint } from 'common/hooks';
import { assert } from '@actnowcoalition/assert';

const MARGIN_SINGLE_LOCATION = 20;
const MARGIN_STATE_CODE = 60;
const MARGIN_COUNTY = 120;

function trackExploreEvent(action: EventAction, label: string, value?: number) {
  trackEvent(EventCategory.EXPLORE, action, label, value);
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
  nationalSummary?: React.ReactNode;
  currentMetric: ExploreMetric;
  setCurrentMetric: React.Dispatch<React.SetStateAction<ExploreMetric>>;
}> = React.memo(
  ({
    initialFipsList,
    title = 'Trends',
    currentMetric,
    setCurrentMetric,
    nationalSummary,
  }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMobileXs = useMediaQuery(theme.breakpoints.down('xs'));

    const chartHeight = useChartHeightForBreakpoint();

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

    const onSelectCurrentMetric = (newMetricIndex: number) => {
      const newMetricName = metricLabels[newMetricIndex];
      const metric = EXPLORE_METRICS[newMetricIndex];
      setCurrentMetric(metric);
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
    const numLocations = selectedLocations.length;

    const { pathname } = useLocation();

    const marginRight = useMemo(
      () => getMarginRight(hasMultipleLocations, isMobileXs, chartSeries),
      [hasMultipleLocations, isMobileXs, chartSeries],
    );

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
    }, [pathname, scrollToExplore]);

    const defaultTimePeriod = isMobile ? Period.DAYS_180 : Period.ALL;

    // Resets time period state variable when pathname changes (need to force the reset since the route doesn't change):
    useEffect(() => {
      setPeriod(defaultTimePeriod);
    }, [pathname, defaultTimePeriod]);

    // Resets locations+current metric state variables when pathname changes (need to force the reset since the route doesn't change):
    useEffect(() => {
      setSelectedLocations(initialLocations);
      setCurrentMetric(ExploreMetric.HOSPITALIZATIONS);
    }, [pathname, region, initialLocations, setCurrentMetric]);

    // checks for shared parameters (ie. if arriving from a share link)
    // and sets state according to the shared params
    useEffect(() => {
      if (sharedParams) {
        setCurrentMetric(sharedParams.currentMetric);
        setNormalizeData(sharedParams.normalizeData);
        setPeriod(sharedParams.period);
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
    }, [currentMetric, selectedLocations]);

    const showLegend =
      ORIGINAL_EXPLORE_METRICS.includes(currentMetric) && numLocations === 1;

    // menu labels for metric, time period, and selected locations:
    const selectedMetricIndex = EXPLORE_METRICS.indexOf(currentMetric);
    assert(selectedMetricIndex >= 0);
    const metricMenuLabel = metricLabels[selectedMetricIndex];
    const regionsMenuLabel = selectedLocations.map(getLocationLabel).join('; ');
    const periodMenuLabel = allPeriodLabels[period];

    const isHomepage = nationalSummary !== undefined;

    return (
      <div ref={exploreRef}>
        <SectionHeader $isHomepage={isHomepage}>{title}</SectionHeader>
        {nationalSummary && nationalSummary}
        <Styles.ChartControlsContainer $isHomepage={isHomepage}>
          <Dropdown
            menuLabel="Metric"
            buttonSelectionLabel={metricMenuLabel}
            itemLabels={metricLabels}
            onSelect={onSelectCurrentMetric}
            maxWidth={336}
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
            maxWidth={314}
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
                    height={chartHeight}
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
                  <div style={{ height: chartHeight }} />
                )
              }
            </ParentSize>
          </Styles.ChartContainer>
        )}
        {selectedLocations.length > 0 && !hasData && (
          <EmptyPanel $height={chartHeight}>
            {getNoDataCopy(
              currentMetricName,
              getLocationNames(selectedLocations),
            )}
            <ScreenshotReady />
          </EmptyPanel>
        )}
        {selectedLocations.length === 0 && (
          <EmptyPanel $height={chartHeight}>
            <p>Please select states or counties to explore trends.</p>
            <ScreenshotReady />
          </EmptyPanel>
        )}
        <Styles.FooterContainer>
          {showLegend && <Legend seriesList={chartSeries} />}
        </Styles.FooterContainer>
      </div>
    );
  },
);

export default Explore;
