import { createMuiTheme } from '@material-ui/core';
import palette from './palette';
import typography from './typography';
import overrides from './overrides';
import { COLOR_MAP } from 'common/colors';
import { megaMenuFooter } from './customThemeBlocks';
import buttons, { ButtonMap } from './buttons';
import fonts, { ThemeFonts } from './fonts';

export { megaMenuFooter };

// todo (chelsi) - remove these colors from theme
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

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    colors: ThemeColors;
    fonts: ThemeFonts;
    buttons: ButtonMap;
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
  buttons,
});

export default theme;
