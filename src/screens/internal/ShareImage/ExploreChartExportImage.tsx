import React, { useEffect, useState } from 'react';
import { ParentSize } from '@vx/responsive';
import {
  ScreenshotWrapper,
  Content,
  Headers,
  LogoHolder,
  LastUpdated,
  Url,
  ExploreTitle,
  ExploreChartWrapper,
} from './ChartExportImage.style';
import LogoUrlLight from 'assets/images/logoUrlLight';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { formatUtcDate } from 'common/utils';
import { ExploreChart } from 'components/Explore';
import { SCREENSHOT_CLASS } from 'components/Screenshot';
import { Series } from 'components/Explore/interfaces';
import {
  getChartSeries,
  getLocationNames,
  getMetricName,
  getDateRange,
  Period,
  getMetricDataMeasure,
} from 'components/Explore/utils';
import regions, { Region } from 'common/regions';

const ExploreChartExportImage = ({
  componentParams,
}: {
  componentParams: any;
}) => {
  const lastUpdated = useModelLastUpdatedDate()!;
  const currentMetric = componentParams.currentMetric;
  const currentMetricName = getMetricName(currentMetric);
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

  if (chartSeries.length === 0) {
    return null;
  }

  const chartHeight = 415;

  const url = `https://covidactnow.org/`;

  const dateRange = chartSeries.map(series =>
    getDateRange(series.data, Period.ALL),
  );

  const dataMeasure = getMetricDataMeasure(currentMetric);

  return (
    <ScreenshotWrapper className={SCREENSHOT_CLASS}>
      <Content>
        <Headers>
          <ExploreTitle>
            {currentMetricName} {normalizeData ? 'per 100k population' : ''} in{' '}
            {getLocationNames(selectedLocations)}
          </ExploreTitle>
          <LastUpdated>Last updated {formatUtcDate(lastUpdated)} </LastUpdated>
        </Headers>
        <LogoHolder>
          Generated by
          <br />
          <LogoUrlLight height={15} />
        </LogoHolder>
        <ExploreChartWrapper>
          <ParentSize>
            {({ width }) => (
              <ExploreChart
                seriesList={chartSeries}
                width={width}
                height={chartHeight}
                isMobile={false}
                hasMultipleLocations={selectedLocations.length > 1}
                dateRange={dateRange[0]}
                dataMeasure={dataMeasure}
              />
            )}
          </ParentSize>
        </ExploreChartWrapper>
        <Url>{url}</Url>
      </Content>
    </ScreenshotWrapper>
  );
};

export default ExploreChartExportImage;
