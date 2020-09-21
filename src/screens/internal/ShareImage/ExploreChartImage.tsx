import React, { useContext, useEffect, useState } from 'react';

import { ThemeProvider, ThemeContext } from 'styled-components';
import { ParentSize } from '@vx/responsive';
import LogoDark from 'assets/images/logoDark';
import { chartDarkMode } from 'assets/theme/palette';
import { findLocationForFips } from 'common/locations';
import { ScreenshotWrapper } from './ShareImage.style';
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
} from 'components/Explore/utils';
import { Series } from 'components/Explore/interfaces';

const ExploreChartImage = ({ componentParams }: { componentParams: any }) => {
  const theme = useContext(ThemeContext);

  const currentMetric = componentParams.currentMetric;
  const currentMetricName = getMetricName(currentMetric);
  const normalizeData = componentParams.normalizeData;
  const [selectedLocations] = useState(
    componentParams.selectedFips.map((fips: string) =>
      findLocationForFips(fips),
    ),
  );
  const [chartSeries, setChartSeries] = useState<Series[]>([]);
  useEffect(() => {
    const fetchSeries = () =>
      getChartSeries(currentMetric, selectedLocations, normalizeData);
    fetchSeries().then(setChartSeries);
  }, [selectedLocations, currentMetric, normalizeData]);

  return (
    <ScreenshotWrapper className={SCREENSHOT_CLASS}>
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
                />
              )}
            </ParentSize>
          </ExploreChartWrapper>
        </ThemeProvider>
      </Wrapper>
    </ScreenshotWrapper>
  );
};

export default ExploreChartImage;
