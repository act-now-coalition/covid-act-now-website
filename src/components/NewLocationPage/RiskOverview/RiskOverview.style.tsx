import styled, { css } from 'styled-components';
import { materialSMBreakpoint, mobileBreakpoint } from 'assets/theme/sizes';

const ColumnToRow = css`
  flex-direction: column;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  ${ColumnToRow};
`;

export const Section = styled.div`
  ${ColumnToRow};
  border: dotted 1px black;
`;

export const MultiStatsWrapper = styled.div`
  display: flex;
  ${ColumnToRow};
`;

export const StatWrapper = styled.div`
  border: 1px solid blue;

  &:not(:last-child) {
    margin-bottom: 0.75rem;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    margin-right: 0.75rem;

    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
`;

export const Item = styled.div`
  border: 1px solid red;

  @media (min-width: ${materialSMBreakpoint}) {
    &:first-child {
      margin-bottom: 1.25rem;
    }
  }
`;

// Flat:
export const FlatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-wrap: wrap;
    flex-direction: row;
  }
`;

export const FlatItem = styled.div`
  border: 1px solid blue;
`;

export const StatItem = styled.div<{ index: number }>`
  flex: 1;
  border: 1px solid blue;

  @media (min-width: ${materialSMBreakpoint}) {
    flex: 1 1 20%;
    order: ${({ index }) => index + 2};
  }
`;

export const OverallRiskItem = styled.div`
  flex: 1;
  border: 1px solid blue;

  @media (min-width: ${materialSMBreakpoint}) {
    flex: 3 1 60%;
    order: 0;
  }
`;

export const ProgressBarItem = styled.div`
  flex: 1;
  border: 1px solid blue;

  @media (min-width: ${materialSMBreakpoint}) {
    flex: 2 1 40%;
    order: 1;
  }
`;

export const VaxStatItem = styled.div`
  flex: 1;
  border: 1px solid blue;

  @media (min-width: ${materialSMBreakpoint}) {
    flex: 2 1 40%;
    order: 5;
  }
`;

// Grid:
export const GridContainer = styled.div`
  display: grid;
  border: solid 1px black;

  grid-template-columns: auto;
  grid-template-rows: auto auto auto auto auto auto;
  grid-template-areas: 'header' 'm1' 'm2' 'm3' 'vp' 'v1';

  @media (min-width: ${materialSMBreakpoint}) {
    grid-template-columns: [vl-start] 20 [vl-1] 20 [vl-2] 20 [vl-3] auto [vl-end];
    grid-template-rows: [hl-start] 50 [hl-1] auto [hl-end];
    grid-template-areas:
      'header header v1 v1'
      'm1 m2 m3 vp';
  }

  @media (min-width: ${mobileBreakpoint}) {
    grid-template-areas:
      'header header header v1'
      'm1 m2 m3 vp';
  }
`;

const GridItemCss = css`
  background-color: lightblue;
  border: dashed 1px blue;
`;

export const GridItemHeader = styled.div`
  ${GridItemCss};
  grid-area: header;
`;

export const GridItemV1 = styled.div`
  ${GridItemCss};
  grid-area: v1;
`;

export const GridItemVP = styled.div`
  ${GridItemCss};
  grid-area: vp;
`;

export const GridItemM1 = styled.div`
  ${GridItemCss};
  grid-area: m1;
`;

export const GridItemM2 = styled.div`
  ${GridItemCss};
  grid-area: m2;
`;
export const GridItemM3 = styled.div`
  ${GridItemCss};
  grid-area: m3;
`;
