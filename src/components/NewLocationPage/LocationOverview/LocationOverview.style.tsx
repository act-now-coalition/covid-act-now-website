import styled, { css } from 'styled-components';
import { materialSMBreakpoint, mobileBreakpoint } from 'assets/theme/sizes';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto auto auto auto;
  grid-template-areas: 'level' 'metric1' 'metric2' 'metric3' 'metricVax' 'progress';

  @media (min-width: ${materialSMBreakpoint}) {
    grid-template-columns: [vl-start] 20 [vl-1] 20 [vl-2] 20 [vl-3] auto [vl-end];
    grid-template-rows: [hl-start] 50 [hl-1] auto [hl-end];
    grid-template-areas:
      'level level progress progress'
      'metric1 metric2 metric3 metricVax';
  }

  @media (min-width: ${mobileBreakpoint}) {
    grid-template-columns: [vl-start] 20 [vl-1] 20 [vl-2] 20 [vl-3] auto [vl-end];
    grid-template-rows: [hl-start] 50 [hl-1] auto [hl-end];
    grid-template-areas:
      'level level level progress'
      'metric1 metric2 metric3 metricVax';
  }
`;

export const GridItemLevel = styled.div`
  grid-area: level;
  justify-self: center;
  margin-bottom: 2rem;

  @media (min-width: ${materialSMBreakpoint}) {
    justify-self: inherit;
  }
`;

export const GridItemProgress = styled.div`
  grid-area: progress;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid gray;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-bottom: 2rem;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const NonVaxMetricStyles = css`
  margin-bottom: 1.75rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-bottom: 0;
    margin-right: 1rem;
  }
`;

export const GridItemMetric1 = styled.div`
  grid-area: metric1;
  ${NonVaxMetricStyles};
`;

export const GridItemMetric2 = styled.div`
  grid-area: metric2;
  ${NonVaxMetricStyles};
`;

export const GridItemMetric3 = styled.div`
  grid-area: metric3;
  ${NonVaxMetricStyles};
`;

export const GridItemMetricVax = styled.div`
  grid-area: metricVax;
  padding-top: 1.5rem;
  border-top: 1px solid gray;
  margin-bottom: 1.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-bottom: 0;
    padding-top: 0;
    border-top: none;
  }
`;
