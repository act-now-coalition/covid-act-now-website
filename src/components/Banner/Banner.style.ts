import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import theme from 'assets/theme';
import MuiButton from '@material-ui/core/Button';
import { mobileBreakpoint } from 'assets/theme/sizes';

const colorButton = '#00BFEA';
const bannerBackgroundColor = '#5900ea';

export const MainContainer = styled(Grid)`
  background-color: ${bannerBackgroundColor};
  padding: ${theme.spacing(2)}px;
  margin: 0;

  /* TODO(pablo): Get from theme */
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  color: #fff;

  font-size: 13px;
  text-align: center;
  justify-content: center;
  border-radius: 0;

  @media (min-width: ${mobileBreakpoint}) {
    font-size: 15px;
    text-align: left;
    border-radius: ${theme.spacing(1)}px;
  }
`;

export const ButtonContainer = styled(Grid)`
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0.5rem;
  @media (min-width: 600px) {
    margin-top: 0;
  }
`;

export const SurveyButton = styled(MuiButton)`
  &.MuiButton-containedPrimary {
    display: inline-block;
    color: ${colorButton};
  }
`;
