import React, { useContext, useState } from 'react';
import { ThemeProvider, ThemeContext } from 'styled-components';
import { useParams } from 'react-router-dom';
import { useProjections } from 'common/utils/model';
import { ParentSize } from '@vx/responsive';
import LogoDark from 'assets/images/logoDark';
import { chartDarkMode } from 'assets/theme/palette';
import { findCountyByFips } from 'common/locations';
import { Projections } from 'common/models/Projections';
import { Projection } from 'common/models/Projection';
import { ScreenshotWrapper } from './ShareImage.style';
import {
  ExploreChart,
  getSeries,
  getTitle,
  EXPLORE_METRICS,
  ExploreMetric,
} from 'components/Explore';
import {
  ChartWrapper,
  Wrapper,
  Headers,
  LogoHolder,
  Subtitle,
  Title,
} from './ChartShareImage.style';

const ExploreChartImage = () => {
  const theme = useContext(ThemeContext);
  let { stateId, countyFipsId, metric: metricString } = useParams();

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
  const metric = parseInt(metricString) as ExploreMetric;

  if (isNaN(metric) || !EXPLORE_METRICS.includes(metric)) {
    return <h1>Unknown metric: {metricString}!</h1>;
  }

  return (
    <ScreenshotWrapper className={'screenshot'}>
      <Wrapper>
        <Headers>
          <Title>{getTitle(metric)}</Title>
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
            <ParentSize>
              {({ width }) => (
                <ExploreChart
                  series={getSeries(metric, projection)}
                  width={width}
                  height={225}
                  isMobile={false}
                />
              )}
            </ParentSize>
          </ChartWrapper>
        </ThemeProvider>
      </Wrapper>
    </ScreenshotWrapper>
  );
};

export default ExploreChartImage;
