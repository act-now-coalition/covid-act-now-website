import styled, { css } from 'styled-components';
import { materialSMBreakpoint, mobileBreakpoint } from 'assets/theme/sizes';

export const GridContainer = styled.div`
  display: grid;
  border: solid 1px black;

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
    grid-template-areas:
      'level level level progress'
      'metric1 metric2 metric3 metricVax';
  }
`;

const GridItemCss = css`
  background-color: lightblue;
  border: dashed 1px blue;
`;

export const GridItemLevel = styled.div`
  ${GridItemCss};
  grid-area: level;
`;

export const GridItemProgress = styled.div`
  ${GridItemCss};
  grid-area: progress;
`;

export const GridItemMetricVax = styled.div`
  ${GridItemCss};
  grid-area: metricVax;
`;

export const GridItemMetric1 = styled.div`
  ${GridItemCss};
  grid-area: metric1;
`;

export const GridItemMetric2 = styled.div`
  ${GridItemCss};
  grid-area: metric2;
`;
export const GridItemMetric3 = styled.div`
  ${GridItemCss};
  grid-area: metric3;
`;
