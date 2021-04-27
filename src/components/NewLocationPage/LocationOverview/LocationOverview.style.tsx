import styled, { css } from 'styled-components';
import { materialSMBreakpoint, mobileBreakpoint } from 'assets/theme/sizes';

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
