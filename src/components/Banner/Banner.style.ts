import Grid from '@material-ui/core/Grid';
import styled, { css } from 'styled-components';
import theme from 'assets/theme';
import MuiButton from '@material-ui/core/Button';
import { materialSMBreakpoint, mobileBreakpoint } from 'assets/theme/sizes';
import { COLOR_MAP } from 'common/colors';
import Box from '@material-ui/core/Box';

const colorButton = `${COLOR_MAP.PURPLE}`;
const bannerBackgroundColor = `${COLOR_MAP.PURPLE}`;

export const MainContainerStyles = css`
  background-color: ${bannerBackgroundColor};
  padding: ${theme.spacing(2)}px;
  margin: 0;

  /* TODO(pablo): Get from theme */
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  line-height: 1.4;
  color: #fff;

  font-size: 16px;
  text-align: center;
  justify-content: center;
  border-radius: 0;
  align-items: center;

  @media (min-width: 600px) {
    text-align: left;
  }

  @media (min-width: ${mobileBreakpoint}) {
    border-radius: ${theme.spacing(1)}px;
    font-weight: 500;
  }
`;

export const MainContainer = styled(Grid)`
  ${MainContainerStyles}
`;

export const ButtonContainer = styled(Grid)`
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;

  a {
    text-decoration: none;
  }

  @media (min-width: 600px) {
    margin-top: 0;
  }
`;

// High-emphasis buttons, distinguished by elevation and fill
// https://material-ui.com/components/buttons/#contained-buttons
export const ContainedButton = styled(MuiButton).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
  variant: 'contained',
}))`
  &.MuiButton-containedPrimary {
    display: inline-block;
    color: ${colorButton};
  }
`;

export const FeatureBannerButton = styled(MuiButton)`
  min-width: fit-content;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  box-shadow: none;
  text-transform: none;

  &:first-child {
    color: white;
    background-color: ${COLOR_MAP.BLUE};
    border: none;
  }

  &:last-child {
    color: ${COLOR_MAP.BLUE};
    background-color: white;
    border: 1px solid ${COLOR_MAP.GREY_200};
    margin-left: 0.5rem;
  }

  &:hover {
    box-shadow: none;
  }

  @media (min-width: 600px) {
    &:first-child {
      margin-left: 0.5rem;
    }
  }
`;

export const FeatureBannerContainer = styled(Grid)`
  ${MainContainerStyles}
  background-color: white;
  color: black;
  border: 1px solid ${COLOR_MAP.GREY_200};
  border-top: none;
  font-weight: normal;

  @media (min-width: ${mobileBreakpoint}) {
    border-top: 1px solid ${COLOR_MAP.GREY_200};
  }
`;

export const MessageContainer = styled(Grid)`
  font-weight: normal;
  font-size: 15px;
  line-height: 1.4;
  color: ${COLOR_MAP.GRAY_BODY_COPY};

  strong {
    color: black;
  }
`;

export const CondensedBannerWrapperHomepage = styled(Box)`
  margin: ${({ theme }) => `0 ${theme.spacing(2)}px`};
  padding: ${({ theme }) => `${theme.spacing(2)}px 0`};

  @media (min-width: ${materialSMBreakpoint}) {
    padding: ${({ theme }) => `${theme.spacing(6)}px 0 ${theme.spacing(2)}px`};
  }
`;

export const CondensedBannerWrapperLocationPage = styled(Box)`
  padding-bottom: ${({ theme }) => theme.spacing(3.5)}px;

  @media (min-width: ${materialSMBreakpoint}) {
    padding: ${({ theme }) => `${theme.spacing(2)}px 0 ${theme.spacing(4)}px`};
  }

  @media (min-width: ${mobileBreakpoint}) {
    padding: ${({ theme }) => `${theme.spacing(2)}px 0 ${theme.spacing(6)}px`};
  }
`;

export const CondensedBanner = styled(Box)`
  background-color: ${bannerBackgroundColor};
  padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(3)}px`};
  width: fit-content;
  border-radius: 4px;
  color: white;
  margin: auto;
  text-align: center;
  max-width: 800px;

  a {
    color: white;
  }
`;
