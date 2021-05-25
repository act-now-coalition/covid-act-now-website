import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import theme from 'assets/theme';
import palette from 'assets/theme/palette';
import { StyledShareButtonStyles } from 'components/ShareBlock/ShareBlock.style';

export const ShareButton = styled(Button).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
  disableTouchRipple: true,
}))`
  border-color: ${palette.lightGray};
  color: ${palette.lightBlue};
  text-transform: none;

  &:focus-visible {
    outline: rgb(0, 95, 204) 1px auto;
  }
`;

export const Container = styled.div`
  position: relative;
  border: solid 1px red;
`;

export const SocialButtonsContainer = styled.div<{
  isHeader?: boolean;
}>`
  display: flex;
  transform: translate(0, 42px);
  z-index: 100;
  position: absolute;
  right: ${({ isHeader }) => (isHeader ? '0.5rem' : '0')};
  top: ${({ isHeader }) => (isHeader ? '0.5rem' : '0')};
  margin-top: ${theme.spacing(1)}px;
  box-shadow: 0px ${theme.spacing(1)}px ${theme.spacing(4)}px rgba(0, 0, 0, 0.2);
  background-color: ${palette.white};
  border-radius: ${theme.spacing(1) / 2}px;
  width: fit-content;
`;

export const SocialButton = styled(Button).attrs(props => ({
  disableElevation: true,
  disableRipple: true,
  disableFocusRipple: true,
  disableTouchRipple: true,
}))`
  width: 60px;
  height: 42px;
  text-transform: none;
  font-size: 0.75rem;
  line-height: 1.2;
  text-transform: none;
  color: rgba(0, 0, 0, 0.7);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: normal;

  &:focus-visible {
    outline: rgb(0, 95, 204) 1px auto;
  }

  @media (min-width: 600px) {
    font-size: 0.875rem;
    width: 80px;
    height: 56px;
  }
`;

export const SocialShareButton = styled.div`
  ${StyledShareButtonStyles};
  border-right: 1px solid ${palette.lightGray};
  display: 'block';
  width: 60px;
  height: 42px;

  &:last-child {
    border-right: none;
  }

  @media (min-width: 600px) {
    width: 80px;
    height: 56px;
  }

  button {
    align-items: center;
  }
`;

export const ShareButtonWrapper = styled.div<{
  isMobile?: boolean;
}>`
  position: relative;
  width: ${({ isMobile }) => (isMobile ? '100%' : 'fit-content')};
`;
