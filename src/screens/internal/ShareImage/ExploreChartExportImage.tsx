import React, { useState } from 'react';
import { isUndefined } from 'lodash';
import { useParams } from 'react-router-dom';
import { ParentSize } from '@vx/responsive';
import {
  ScreenshotWrapper,
  ChartWrapper,
  Content,
  Headers,
  LogoHolder,
  Location,
  MetricName,
  LastUpdated,
  Url,
} from './ChartExportImage.style';
import LogoUrlLight from 'assets/images/logoUrlLight';
import { Projections } from 'common/models/Projections';
import { findCountyByFips } from 'common/locations';
import { useProjections, useModelLastUpdatedDate } from 'common/utils/model';
import { Projection } from 'common/models/Projection';
import { formatUtcDate } from 'common/utils';
import {
  ExploreChart,
  getSeries,
  getTitle,
  getMetricByChartId,
} from 'components/Explore';
import { SCREENSHOT_CLASS } from 'components/Screenshot';

const ExploreChartExportImage = () => {
  let { stateId, countyFipsId, chartId } = useParams();
  const lastUpdated = useModelLastUpdatedDate();

  let projections: Projections | undefined;
  const [countyOption] = useState(
    countyFipsId && findCountyByFips(countyFipsId),
  );
  stateId = stateId || countyOption.state_code;
  projections = useProjections(stateId, countyOption) as any;
  if (!projections || !lastUpdated) {
    return null;
  }
  const projection = projections.primary as Projection;
  const metric = getMetricByChartId(chartId);

  if (isUndefined(metric)) {
    return <h1>Unknown explore chart: {chartId}!</h1>;
  }

  const chartHeight = 415;

  let url = `https://covidactnow.org/us/${stateId}`;
  if (countyOption) {
    url += `/county/${countyOption.county_url_name}`;
  }

  return (
    <ScreenshotWrapper className={SCREENSHOT_CLASS}>
      <Content>
        <Headers>
          <Location>{projection.locationName}</Location>
          <MetricName>{getTitle(metric)}</MetricName>
          <LastUpdated>Last updated {formatUtcDate(lastUpdated)} </LastUpdated>
        </Headers>
        <LogoHolder>
          Generated by
          <br />
          <LogoUrlLight height={15} />
        </LogoHolder>
        <ChartWrapper>
          <ParentSize>
            {({ width }) => (
              <ExploreChart
                seriesList={getSeries(metric, projection)}
                width={width}
                height={chartHeight}
                isMobile={false}
                hasMultipleLocations={false}
              />
            )}
          </ParentSize>
        </ChartWrapper>
        <Url>{url}</Url>
      </Content>
    </ScreenshotWrapper>
  );
};

export default ExploreChartExportImage;
