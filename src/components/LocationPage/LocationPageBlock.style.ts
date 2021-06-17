import styled from 'styled-components';
import {
  materialSMBreakpoint,
  countyMapToFixedBreakpoint,
} from 'assets/theme/sizes';

export const BlockContainer = styled.div`
  margin: 0 auto 4.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    max-width: ${props =>
      props.theme.spacingTheme.locationPage.maxWidthContent};
  }

  @media (min-width: ${countyMapToFixedBreakpoint}) {
    margin-left: 0;
  }

  @media print {
    margin: 0 auto;
    padding: 0 1rem;
  }
`;

export const WidthContainer = styled.div`
  margin: auto;

  @media (min-width: ${countyMapToFixedBreakpoint}) {
    width: ${props =>
      props.theme.spacingTheme.locationPage.widthContentWithStickyMap};
  }
`;
