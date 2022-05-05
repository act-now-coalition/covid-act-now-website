import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import {
  materialSMBreakpoint,
  mobileBreakpoint,
  countyMapToFixedBreakpoint,
} from 'assets/theme/sizes';

export const MainWrapper = styled.div`
  padding: ${props => props.theme.spacingTheme.contentGutterMobile};
  background-color: ${COLOR_MAP.GREY_0};

  @media (min-width: ${mobileBreakpoint}) {
    padding: ${props => props.theme.spacingTheme.contentGutterDesktop};
  }
`;

export const ContentContainer = styled.div`
  margin: auto;
  display: flex;
  width: fit-content;

  @media (min-width: ${countyMapToFixedBreakpoint}) {
    width: ${props =>
      props.theme.spacingTheme.locationPage.widthContentWithStickyMap};
  }
`;

export const HeaderContainer = styled.div`
  padding-bottom: 0.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    align-items: center;
  }

  @media (min-width: ${countyMapToFixedBreakpoint}) {
    align-items: start;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  max-width: ${props => props.theme.spacingTheme.locationPage.maxWidthContent};
  row-gap: 1.25rem;
  grid-template-areas: 'header' 'overview' 'spark' 'map' 'masks' 'originalMetrics' 'alerts';

  @media (min-width: ${materialSMBreakpoint}) {
    grid-template-columns: 2fr 1fr;
    grid-gap: 2rem;
    grid-template-areas:
      'header header'
      'overview overview'
      'masks map'
      'originalMetrics map'
      'alerts map';
  }

  @media (min-width: ${countyMapToFixedBreakpoint}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'header header'
      'overview overview'
      'masks masks'
      'originalMetrics alerts';
    margin-right: 2rem;
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

  @media (min-width: ${materialSMBreakpoint}) {
    display: none;
  }
`;

export const GridItemAlerts = styled.div`
  grid-area: alerts;
`;

export const GridItemMap = styled.div`
  grid-area: map;
  align-self: start;

  @media (min-width: ${countyMapToFixedBreakpoint}) {
    display: none;
  }
`;

export const GridItemNote = styled.div`
  grid-area: note;
`;

// Need to remove the map from the grid container when it becomes position:fixed
// so there is no extra grid-gap for an empty grid item:
export const MapOutsideGrid = styled.div`
  display: none;
  @media (min-width: ${countyMapToFixedBreakpoint}) {
    display: inherit;
  }
`;

export const GridItemMasks = styled.div`
  grid-area: masks;
`;

export const GridItemOriginalMetrics = styled.div`
  grid-area: originalMetrics;
`;
