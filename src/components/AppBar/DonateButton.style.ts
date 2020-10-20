import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint } from 'assets/theme/sizes';

export const StyledDonateButton = styled(MuiButton)`
  color: white;
  background-color: ${COLOR_MAP.PURPLE};
  margin: auto 0;
  display: inline-flex;

  &:hover {
    background-color: ${COLOR_MAP.PURPLE};
  }

  @media (min-width: ${mobileBreakpoint}) {
    margin-left: 2rem;
  }
`;

export const DonateButtonWrapper = styled.div`
  a {
    display: flex;
    height: 100%;
    text-decoration: none;
  }
`;
