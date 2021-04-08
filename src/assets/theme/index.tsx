import { createMuiTheme } from '@material-ui/core';
import palette from './palette';
import typography from './typography';
import overrides from './overrides';
import { megaMenuFooter } from './customThemeBlocks';
import buttons, { ButtonMap } from './buttons';
import { fonts, ThemeFonts } from './fonts';
import { megaMenu, MenuTheme } from './customThemeBlocks';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    fonts: ThemeFonts;
    buttons: ButtonMap;
    megaMenu: MenuTheme;
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
  fonts,
  buttons,
  megaMenu,
});

export { megaMenuFooter };
export default theme;
