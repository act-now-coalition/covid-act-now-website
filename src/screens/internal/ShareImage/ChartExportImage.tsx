import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import urlJoin from 'url-join';
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
import { MetricChart } from '../../../components/Charts';
import { ALL_METRICS, getMetricNameExtended } from 'common/metric';
import { Metric } from 'common/metric';
import { findCountyByFips } from 'common/locations';
import { useProjections, useModelLastUpdatedDate } from 'common/utils/model';
import { Projection } from 'common/models/Projection';
import { formatUtcDate } from 'common/utils';
import { SCREENSHOT_CLASS } from 'components/Screenshot';
import { getStateByUrlName, getCanonicalUrl } from 'common/locations';

const ExportChartImage = () => {
  let { stateId, countyFipsId, metric: metricString } = useParams();
  const lastUpdated = useModelLastUpdatedDate();

  let projections: Projections | undefined;
  const [countyOption] = useState(
    countyFipsId && findCountyByFips(countyFipsId),
  );

  const stateInfo = getStateByUrlName(stateId);
  const stateCode =
    (stateInfo && stateInfo?.state_code) || countyOption.state_code;

  projections = useProjections(stateCode, countyOption, undefined) as any;
  if (!projections || !lastUpdated) {
    return null;
  }
  const projection = projections.primary as Projection;

  const metric = parseInt(metricString) as Metric;
  if (isNaN(metric) || !ALL_METRICS.includes(metric)) {
    return <h1>Unknown metric: {metricString}!</h1>;
  }

  const chartHeight = 415;
  let url = urlJoin(
    'https://covidactnow.org/',
    getCanonicalUrl(projection.fips),
  );

  return (
    <ScreenshotWrapper className={SCREENSHOT_CLASS}>
      <Content>
        <Headers>
          <Location>{projection.locationName}</Location>
          <MetricName>{getMetricNameExtended(metric)}</MetricName>
          <LastUpdated>Last updated {formatUtcDate(lastUpdated)} </LastUpdated>
        </Headers>
        <LogoHolder>
          Generated by
          <br />
          <LogoUrlLight height={15} />
        </LogoHolder>
        <ChartWrapper>
          <MetricChart
            metric={metric}
            projections={projections}
            height={chartHeight}
          />
        </ChartWrapper>
        <Url>{url}</Url>
      </Content>
    </ScreenshotWrapper>
  );
};

export default ExportChartImage;
