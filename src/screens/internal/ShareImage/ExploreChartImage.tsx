import React, { useContext, useState } from 'react';
import { isUndefined } from 'lodash';

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
  getMetricByChartId,
} from 'components/Explore';
import {
  ChartWrapper,
  Wrapper,
  Headers,
  LogoHolder,
  Subtitle,
  Title,
} from './ChartShareImage.style';
import { SCREENSHOT_CLASS } from 'components/Screenshot';

const ExploreChartImage = () => {
  const theme = useContext(ThemeContext);
  let { stateId, countyFipsId, chartId } = useParams();

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
  const metric = getMetricByChartId(chartId);

  if (isUndefined(metric)) {
    return <h1>Unknown explore chart: {chartId}!</h1>;
  }

  return (
    <ScreenshotWrapper className={SCREENSHOT_CLASS}>
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
                  seriesList={getSeries(metric, projection)}
                  width={width}
                  height={225}
                  isMobile={false}
                  barOpacity={0.4}
                  barOpacityHover={0.8}
                  hasMultipleLocations={false}
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
