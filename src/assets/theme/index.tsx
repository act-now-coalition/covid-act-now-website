import { createTheme } from '@material-ui/core';
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
import { spacingTheme, Spacing } from './sizes';

declare module '@material-ui/core/styles' {
  interface Theme {
    fonts: ThemeFonts;
    buttons: ButtonMap;
    megaMenu: MenuTheme;
    searchbar: SearchbarTheme;
    spacingTheme: Spacing;
  }
  interface ThemeOptions extends Theme {}
}

const theme = createTheme({
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
  spacingTheme,
});

export { megaMenuFooter, navSearchbar, navSearchbarLocPage };
export default theme;
