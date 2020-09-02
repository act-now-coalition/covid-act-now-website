import React from 'react';
import { ScreenshotReady } from 'components/Screenshot';
import ExternalLink from 'components/ExternalLink';
import { EmptyChart as EmtpyChartStyle } from './Explore.style';

const EmptyChart: React.FC<{
  height: number;
  metricName: string;
  locationName: string;
}> = ({ height, metricName, locationName }) => (
  <EmtpyChartStyle style={{ height }}>
    <p>
      We don't have {metricName} data for {locationName}. Learn more about{' '}
      <ExternalLink href="https://docs.google.com/document/d/1cd_cEpNiIl1TzUJBvw9sHLbrbUZ2qCxgN32IqVLa3Do/edit">
        our methodology
      </ExternalLink>{' '}
      and our{' '}
      <ExternalLink href="https://docs.google.com/presentation/d/1XmKCBWYZr9VQKFAdWh_D7pkpGGM_oR9cPjj-UrNdMJQ/edit">
        our data sources
      </ExternalLink>
      .
    </p>
    <ScreenshotReady />
  </EmtpyChartStyle>
);

export default EmptyChart;
