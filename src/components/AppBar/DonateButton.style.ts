import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint } from 'assets/theme/sizes';
import LinkButton from 'components/LinkButton';

export const StyledDonateButton = styled(LinkButton).attrs(props => ({
  variant: 'contained',
}))`
  margin: auto 0;
  display: inline-flex;
  box-shadow: none;
  background-color: ${COLOR_MAP.PURPLE};
  color: white;

  &:hover {
    background-color: ${COLOR_MAP.PURPLE};
    color: white;
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

export const StyledDonateButtonHeart = styled(LinkButton)`
  text-transform: none;
  color: ${COLOR_MAP.PURPLE};
`;
