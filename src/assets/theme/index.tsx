import { createMuiTheme } from '@material-ui/core';
import { css, FlattenSimpleInterpolation } from 'styled-components';
import palette from './palette';
import typography from './typography';
import overrides from './overrides';
import { COLOR_MAP } from 'common/colors';

interface ThemeColors {
  green: string;
  greenDark: string;
  lightBlue: string;
}

const colors: ThemeColors = {
  green: COLOR_MAP.GREEN.BASE,
  greenDark: COLOR_MAP.GREEN.DARK,
  lightBlue: COLOR_MAP.BLUE,
};

interface ThemeFonts {
  heading1: FlattenSimpleInterpolation;
  subtitle1: FlattenSimpleInterpolation;
  disclaimer: FlattenSimpleInterpolation;
  link: FlattenSimpleInterpolation;
}

/**
 * High-level typography groups
 */
const fonts: ThemeFonts = {
  subtitle1: css`
    color: ${COLOR_MAP.GRAY_BODY_COPY};
    text-transform: uppercase;
    letter-spacing: 0.01em;
    font-size: 0.875rem;
    line-height: 1.125;
    margin-bottom: 0.75rem;
  `,
  heading1: css`
    font-size: 1.8125rem;
    line-height: 1.25;
    margin-bottom: 1.25rem;
    margin-top: 1.25rem;
  `,
  disclaimer: css`
    font-size: 0.875rem;
    line-height: 1.6;
  `,
  link: css`
    color: ${colors.lightBlue};
  `,
};

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    colors: ThemeColors;
    fonts: ThemeFonts;
  }
  interface ThemeOptions extends Theme {}
}

const theme = createMuiTheme({
  palette,
  overrides,
  typography,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
  colors,
  fonts,
});

export default theme;
