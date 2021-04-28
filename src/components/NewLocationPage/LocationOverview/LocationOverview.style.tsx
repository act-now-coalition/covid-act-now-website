import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

// adding 100px to the large mobile breakpoint to minimize the wrapping of metric names:
const gridBreakpoint = '900px';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-areas: 'level' 'metric1' 'metric2' 'metric3' 'metricVax' 'progress';
  row-gap: 1.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      'level level progress progress'
      'metric1 metric2 metric3 metricVax';
    grid-gap: 2rem;
  }

  @media (min-width: ${gridBreakpoint}) {
    grid-template-columns: 1fr 1fr 1fr 2fr;
    grid-template-areas:
      'level level level progress'
      'metric1 metric2 metric3 metricVax';
  }
`;

export const GridItemLevel = styled.div`
  grid-area: level;
  padding-bottom: 0.5rem;
  justify-self: center;

  @media (min-width: ${materialSMBreakpoint}) {
    justify-self: inherit;
  }
`;

export const GridItemProgress = styled.div`
  grid-area: progress;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${COLOR_MAP.GREY_1};

  @media (min-width: ${materialSMBreakpoint}) {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const GridItemMetric1 = styled.div`
  grid-area: metric1;
`;

export const GridItemMetric2 = styled.div`
  grid-area: metric2;
`;

export const GridItemMetric3 = styled.div`
  grid-area: metric3;
`;

export const GridItemMetricVax = styled.div`
  grid-area: metricVax;
  padding-top: 1.5rem;
  border-top: 1px solid ${COLOR_MAP.GREY_1};

  @media (min-width: ${materialSMBreakpoint}) {
    padding-top: 0;
    border-top: none;
  }
`;
