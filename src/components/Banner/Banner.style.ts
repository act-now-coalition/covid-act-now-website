import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import theme from 'assets/theme';
import MuiButton from '@material-ui/core/Button';
import { mobileBreakpoint } from 'assets/theme/sizes';
import { COLOR_MAP } from 'common/colors';

const colorButton = `${COLOR_MAP.PURPLE}`;
const bannerBackgroundColor = `${COLOR_MAP.PURPLE}`;

export const MainContainer = styled(Grid)`
  background-color: ${bannerBackgroundColor};
  padding: ${theme.spacing(2)}px;
  margin: 0;

  /* TODO(pablo): Get from theme */
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  color: #fff;

  font-size: 18px;
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
