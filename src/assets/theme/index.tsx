import { createMuiTheme } from '@material-ui/core';
import palette from './palette';
import typography from './typography';
import overrides from './overrides';
import buttons, { ButtonMap } from './buttons';
import fonts, { ThemeFonts } from './fonts';
import { megaMenu, MenuTheme, megaMenuFooter } from './megaMenu';
import {
  SearchbarTheme,
  searchbar,
  navSearchbar,
  navSearchbarLocPage,
} from './searchbar';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    fonts: ThemeFonts;
    buttons: ButtonMap;
    megaMenu: MenuTheme;
    searchbar: SearchbarTheme;
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
  searchbar,
});

export { megaMenuFooter, navSearchbar, navSearchbarLocPage };
export default theme;
