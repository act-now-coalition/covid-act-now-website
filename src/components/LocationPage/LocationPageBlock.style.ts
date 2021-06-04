import styled from 'styled-components';
import {
  materialSMBreakpoint,
  countyMapToFixedBreakpoint,
} from 'assets/theme/sizes';

export const BlockContainer = styled.div`
  margin: auto;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-bottom: 5rem;
  }

  @media (min-width: 932px) {
    max-width: ${props => props.theme.spacingTheme.maxWidthLocationPageContent};
    width: 100%;
    margin: 0 auto 5rem;
  }

  @media (min-width: ${countyMapToFixedBreakpoint}) {
    margin: 0 350px 5rem auto;
  }

  @media (min-width: 1750px) {
    margin: 0 auto 5rem;
  }

  @media print {
    margin: 0 auto;
    padding: 0 1rem;
  }
`;
