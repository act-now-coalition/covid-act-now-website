import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { maxContentWidth } from 'components/NewLocationPage/Shared/Shared.style';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { mapToFixedBreakpoint } from '../CountyMap';

export const MainWrapper = styled.div`
  background-color: ${COLOR_MAP.GREY_0};
  padding: 15px; //remove
`;

export const HeaderContainer = styled.div`
  padding-bottom: 0.75rem;

  @media (min-width: ${materialSMBreakpoint}) {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.5rem;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  max-width: ${maxContentWidth};
  row-gap: 1rem;
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

  @media (min-width: ${mapToFixedBreakpoint}px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'header header'
      'overview overview'
      'spark alerts'
      'note note';
  }
`;

export const GridItemHeader = styled.div`
  grid-area: header;
`;

export const GridItemOverview = styled.div`
  grid-area: overview;
`;

export const GridItemSparkLines = styled.div`
  grid-area: spark;
`;

export const GridItemAlerts = styled.div`
  grid-area: alerts;
`;

export const GridItemMap = styled.div`
  align-self: start;
  grid-area: map;
  background-color: white;
`;

export const GridItemNote = styled.div`
  grid-area: note;
`;
