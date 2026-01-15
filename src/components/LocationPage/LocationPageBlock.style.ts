import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const BlockContainer = styled.div`
  margin: 0 auto 4.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    max-width: ${props =>
      props.theme.spacingTheme.locationPage.maxWidthContent};
  }

  @media print {
    margin: 0 auto;
    padding: 0 1rem;
  }
`;

export const WidthContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: ${props => props.theme.spacingTheme.locationPage.maxWidthContent};
`;
