import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import theme from 'assets/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
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
