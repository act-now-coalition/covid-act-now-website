import styled, { css } from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { maxContentWidth } from 'components/NewLocationPage/Shared/Shared.style';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const MainWrapper = styled.div`
  background-color: ${COLOR_MAP.GREY_0};
  max-width: 900px;
  padding: 20px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: ${maxContentWidth};
`;

export const GridContainer = styled.div`
  display: grid;
  max-width: 880px;
  grid-gap: 1rem;
  grid-template-columns: auto;
  grid-template-areas: 'header' 'overview' 'spark' 'map' 'note' 'alerts';

  @media (min-width: ${materialSMBreakpoint}) {
    grid-template-columns: 2fr 1fr;
    grid-gap: 1rem;
    grid-template-areas:
      'header header'
      'overview overview'
      'spark map'
      'alerts map'
      'note note';
  }
`;

const AllItems = css`
  // border-left: 1px dotted red;
  // border-right: 1px dotted red;
  // border-top: 1px dotted black;
  // border-bottom: 1px dotted black;
`;

export const GridItemHeader = styled.div`
  ${AllItems};
  grid-area: header;
`;

export const GridItemOverview = styled.div`
  ${AllItems};
  // grid-column: 1/3;
  grid-area: overview;
`;

export const GridItemSparkLines = styled.div`
  ${AllItems};
  grid-area: spark;
`;

export const GridItemAlerts = styled.div`
  ${AllItems};
  grid-area: alerts;
`;

export const GridItemMap = styled.div`
  ${AllItems};
  align-self: start;
  grid-area: map;
  background-color: white;
`;

export const GridItemNote = styled.div`
  ${AllItems};
  grid-area: note;
`;
