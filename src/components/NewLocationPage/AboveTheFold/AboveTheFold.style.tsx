import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { maxContentWidth } from 'components/NewLocationPage/Shared/Shared.style';
import { materialSMBreakpoint, mobileBreakpoint } from 'assets/theme/sizes';
import { mapToFixedBreakpoint } from '../CountyMap';

export const MainWrapper = styled.div`
  background-color: ${COLOR_MAP.GREY_0};
  padding: 2rem 1rem 1rem; //change this
`;

export const HeaderContainer = styled.div`
  padding-bottom: 0.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.5rem;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  max-width: ${maxContentWidth};
  margin: auto;
  row-gap: 1.25rem;
  grid-template-areas: 'header' 'overview' 'spark' 'map' 'note' 'alerts';

  @media (min-width: ${materialSMBreakpoint}) {
    grid-template-columns: 2fr 1fr;
    grid-gap: 1.75rem;
    grid-template-areas:
      'header header'
      'overview overview'
      'spark map'
      'alerts alerts'
      'note note';
  }

  @media (min-width: ${mobileBreakpoint}) {
    grid-template-areas:
      'header header'
      'overview overview'
      'spark map'
      'alerts map'
      'note note';
  }

  @media (min-width: ${mapToFixedBreakpoint}px) {
    margin: 0 350px 0 auto;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'header header'
      'overview overview'
      'spark alerts'
      'note note';
  }

  @media (min-width: 1750px) {
    margin: auto;
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
  grid-area: map;
  align-self: start;
`;

export const GridItemNote = styled.div`
  grid-area: note;
`;
