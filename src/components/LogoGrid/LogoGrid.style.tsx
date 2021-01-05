import styled from 'styled-components';
import theme from 'assets/theme';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Logo = styled.img`
  width: 100%;
  max-width: 216px;
  margin: 0 auto;

  @media (min-width: ${theme.breakpoints.down('sm')}) {
    max-width: 240px;
  }
`;

export const GovLogo = styled.img`
  max-height: 100px;
  max-width: 90px;

  @media (min-width: ${materialSMBreakpoint}) {
    max-width: 120px;
  }
`;
