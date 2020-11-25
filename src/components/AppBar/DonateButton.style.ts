import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint } from 'assets/theme/sizes';

export const StyledDonateButton = styled(MuiButton)`
  color: white;
  background-color: white;
  margin: auto 0;
  display: inline-flex;
  border: 2px solid ${COLOR_MAP.GRAY.LIGHT};
  color: ${COLOR_MAP.PURPLE};
  box-shadow: none;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
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
