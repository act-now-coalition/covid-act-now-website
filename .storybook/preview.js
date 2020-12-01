import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import theme from 'assets/theme';
import { BrowserRouter } from 'react-router-dom';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const routeDecorator = Story => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);

const themeDecorator = Story => (
  <MuiThemeProvider theme={theme}>
    <ScThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <Story />
      </StylesProvider>
    </ScThemeProvider>
  </MuiThemeProvider>
);

export const decorators = [themeDecorator, routeDecorator];
