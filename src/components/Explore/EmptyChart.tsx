import React from 'react';
import ExternalLink from 'components/ExternalLink';
import { ScreenshotReady } from 'components/Screenshot';
import { EmptyChart as EmtpyChartStyle } from './Explore.style';

const METHODOLOGY_URL =
  'https://docs.google.com/document/d/1cd_cEpNiIl1TzUJBvw9sHLbrbUZ2qCxgN32IqVLa3Do/edit';
const DATA_SOURCES_URL =
  'https://docs.google.com/presentation/d/1XmKCBWYZr9VQKFAdWh_D7pkpGGM_oR9cPjj-UrNdMJQ/edit';
const EmptyChart: React.FC<{
  height: number;
  metricName: string;
  locationName: string;
}> = ({ height, metricName, locationName }) => (
  <EmtpyChartStyle style={{ height }}>
    <p>
      We don't have {metricName} data for {locationName}. Learn more about{' '}
      <ExternalLink href={METHODOLOGY_URL}>our methodology</ExternalLink> and
      our <ExternalLink href={DATA_SOURCES_URL}>our data sources</ExternalLink>.
    </p>
    <ScreenshotReady />
  </EmtpyChartStyle>
);

export default EmptyChart;
