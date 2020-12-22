import styled from 'styled-components';
import theme from 'assets/theme';
import Grid from '@material-ui/core/Grid';
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

export const PressLogoWrapper = styled(Grid)`
  height: 3.5rem;
  display: flex;

  img {
    object-fit: contain;
    width: 100%;
    margin: auto;
    max-width: 100%;
    max-width: 240px;
    max-height: 100%;
    margin: 0.5rem auto;
  }

  @media (min-width: ${theme.breakpoints.down('sm')}) {
    min-width: 34%;
    width: 100%;
    margin-top: 2.5rem;
  }
`;
