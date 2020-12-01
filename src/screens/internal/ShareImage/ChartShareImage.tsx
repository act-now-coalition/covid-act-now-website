import React, { useState, useContext } from 'react';
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
import { Projections } from 'common/models/Projections';
import { MetricChart } from '../../../components/Charts';
import { ALL_METRICS, getMetricNameExtended } from 'common/metric';
import { Metric } from 'common/metric';
import { findCountyByFips } from 'common/locations';
import { useProjections } from 'common/utils/model';
import { Projection } from 'common/models/Projection';
import { SCREENSHOT_CLASS } from 'components/Screenshot';

export default function ChartShareImage() {
  let { stateId, countyFipsId, metric: metricString } = useParams();
  const theme = useContext(ThemeContext);

  let projections: Projections | undefined;
  const [countyOption] = useState(
    countyFipsId && findCountyByFips(countyFipsId),
  );
  stateId = stateId || countyOption.state_code;
  projections = useProjections(stateId, countyOption) as any;
  if (!projections) {
    return null;
  }
  const projection = projections.primary as Projection;

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
          <Subtitle>{projection.locationName}</Subtitle>
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
