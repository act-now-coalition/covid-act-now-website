import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from 'styled-components';
import {
  ChartWrapper,
  Wrapper,
  Headers,
  LogoHolder,
  Subtitle,
  Title,
} from './ChartShareImage.style';
import { DarkScreenshotWrapper } from './ShareImage.style';
import LogoDark from 'assets/images/logoDark';
import { chartDarkMode } from 'assets/theme/palette';
import { MetricChart } from '../../../components/Charts';
import { ALL_METRICS, getMetricNameExtended } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { useProjectionsFromRegion } from 'common/utils/model';
import { SCREENSHOT_CLASS } from 'components/Screenshot';
import { useRegionFromParams } from 'common/regions';

export default function ChartShareImage() {
  let { metric: metricString } = useParams<{ metric: string }>();
  const region = useRegionFromParams();

  const theme = useContext(ThemeContext);
  const projections = useProjectionsFromRegion(region);
  if (!region || !projections) {
    return null;
  }

  const metric = parseInt(metricString) as Metric;
  if (isNaN(metric) || !ALL_METRICS.includes(metric)) {
    return <h1>Unknown metric: {metricString}!</h1>;
  }

  const chartHeight = 225;

  return (
    <DarkScreenshotWrapper className={SCREENSHOT_CLASS}>
      <Wrapper>
        <Headers>
          <Title>{getMetricNameExtended(metric)}</Title>
          <Subtitle>{region.fullName}</Subtitle>
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
          <ChartWrapper>
            <MetricChart
              metric={metric}
              projections={projections}
              height={chartHeight}
            />
          </ChartWrapper>
        </ThemeProvider>
      </Wrapper>
    </DarkScreenshotWrapper>
  );
}
