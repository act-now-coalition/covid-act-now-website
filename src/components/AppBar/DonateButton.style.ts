import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint } from 'assets/theme/sizes';
import LinkButton from 'components/LinkButton';

const DonateButtonBase = styled(LinkButton).attrs(props => ({
  variant: 'contained',
}))`
  margin: auto 0;
  display: inline-flex;
  box-shadow: none;

  @media (min-width: ${mobileBreakpoint}) {
    margin-left: 2rem;
  }
`;

export const StyledDonateButtonA = styled(DonateButtonBase)`
  background-color: white;
  color: ${COLOR_MAP.PURPLE};
  border: 2px solid ${COLOR_MAP.GRAY.LIGHT};

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  }
`;

export const StyledDonateButtonB = styled(DonateButtonBase)`
  background-color: ${COLOR_MAP.PURPLE};
  color: white;

  &:hover {
    background-color: ${COLOR_MAP.PURPLE};
    color: white;
  }
`;

export const DonateButtonWrapper = styled.div`
  a {
    display: flex;
    height: 100%;
    text-decoration: none;
  }
`;
