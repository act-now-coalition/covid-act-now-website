import React from 'react';
import { addDecorator } from '@storybook/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import theme from '../src/assets/theme';

// Decorators are wrapper components for Storybook. Here, we are
// adding context wrappers that some components need so they can
// be rendered correctly.
//
// https://storybook.js.org/docs/addons/introduction/#1-decorators
export const withCANContext = storyFn => (
  <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>{storyFn()}</StylesProvider>
    </ThemeProvider>
  </Router>
);

addDecorator(withCANContext);
