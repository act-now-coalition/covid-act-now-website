import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint } from 'assets/theme/sizes';
import LinkButton from 'components/LinkButton';

export const StyledDonateButton = styled(LinkButton).attrs(props => ({
  variant: 'outlined',
}))`
  background-color: white;
  margin: auto 0;
  display: inline-flex;
  border: 2px solid ${COLOR_MAP.GRAY.LIGHT};
  color: ${COLOR_MAP.PURPLE};
  box-shadow: none;
  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
    background-color: white;
  }
  @media (min-width: ${mobileBreakpoint}) {
    margin-left: 2rem;
  }
`;

export const DonateButtonWrapper = styled.div`
  display: flex;
`;

export const StyledDonateButtonHeart = styled(LinkButton)`
  text-transform: none;
  font-size: 16px;
  color: ${COLOR_MAP.PURPLE};
`;
