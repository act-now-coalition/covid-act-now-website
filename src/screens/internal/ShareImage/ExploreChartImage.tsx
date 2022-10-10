import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider, ThemeContext } from 'styled-components';
import { ParentSize } from '@vx/responsive';
import LogoDark from 'assets/images/logoDark';
import { chartDarkMode } from 'assets/theme/palette';
import { DarkScreenshotWrapper } from './ShareImage.style';
import { ExploreChart } from 'components/Explore';
import {
  ExploreChartWrapper,
  Wrapper,
  Headers,
  LogoHolder,
  ExploreTitle,
} from './ChartShareImage.style';
import { SCREENSHOT_CLASS } from 'components/Screenshot';
import {
  getChartSeries,
  getLocationNames,
  getMetricName,
  Period,
  getMetricDataMeasure,
  getDateRange,
  getYFormat,
  getMaxYFromDefinition,
} from 'components/Explore/utils';
import { Series } from 'components/Explore/interfaces';
import regions, { Region } from 'common/regions';
import { TimeUnit } from '@actnowcoalition/time-utils';

const ExploreChartImage = ({ componentParams }: { componentParams: any }) => {
  const theme = useContext(ThemeContext);

  const currentMetric = componentParams.currentMetric;
  const currentMetricName = getMetricName(currentMetric);
  const currentPeriod = componentParams.period;
  const normalizeData = componentParams.normalizeData;

  const [selectedLocations] = useState<Region[]>(
    (componentParams.selectedFips as string[]).flatMap((fips: string) => {
      const region = regions.findByFipsCode(fips);
      return region ? [region] : [];
    }),
  );
  const [chartSeries, setChartSeries] = useState<Series[]>([]);
  useEffect(() => {
    const fetchSeries = () =>
      getChartSeries(currentMetric, selectedLocations, normalizeData);
    fetchSeries().then(setChartSeries);
  }, [selectedLocations, currentMetric, normalizeData]);

  const dataMeasure = getMetricDataMeasure(currentMetric);
  const yTickFormat = getYFormat(dataMeasure, 0);
  const yTooltipFormat = getYFormat(dataMeasure, 1);
  const maxYFromDefinition = getMaxYFromDefinition(currentMetric);

  const dateRange = getDateRange(currentPeriod);

  return (
    <DarkScreenshotWrapper className={SCREENSHOT_CLASS}>
      <Wrapper>
        <Headers>
          <ExploreTitle>
            {currentMetricName} {normalizeData ? 'per 100k population' : ''} in{' '}
            {getLocationNames(selectedLocations)}
          </ExploreTitle>
          <LogoHolder>
            <LogoDark height={35} />
          </LogoHolder>
        </Headers>
        <ThemeProvider
          theme={{
            ...theme,
            palette: { ...theme.palette, chart: chartDarkMode },
          }}
        >
          <ExploreChartWrapper>
            <ParentSize>
              {({ width }) => (
                <ExploreChart
                  seriesList={chartSeries}
                  width={width}
                  height={225}
                  isMobile={false}
                  barOpacity={0.4}
                  barOpacityHover={0.8}
                  hasMultipleLocations={selectedLocations.length > 1}
                  dateRange={dateRange}
                  yTickFormat={yTickFormat}
                  yTooltipFormat={yTooltipFormat}
                  xTickTimeUnit={
                    currentPeriod === Period.ALL
                      ? TimeUnit.MONTHS
                      : TimeUnit.WEEKS
                  }
                  maxYFromDefinition={maxYFromDefinition}
                />
              )}
            </ParentSize>
          </ExploreChartWrapper>
        </ThemeProvider>
      </Wrapper>
    </DarkScreenshotWrapper>
  );
};

export default ExploreChartImage;
