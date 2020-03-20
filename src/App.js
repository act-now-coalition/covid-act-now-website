import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ModelPage from 'screens/ModelPage';
import HomePage from 'screens/HomePage';
import ComingSoon from 'screens/ComingSoon/ComingSoon';
import AppBar from 'components/AppBar/AppBar';
import Footer from 'components/Footer/Footer';
import theme from 'assets/theme';
import { STATES } from 'utils/constants';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <BrowserRouter>
          <AppBar />
          <Switch>
            <Route path="/faq" component={ComingSoon} />
            <Route path="/about" component={ComingSoon} />
            <Route path="/donate" component={ComingSoon} />
            {Object.keys(STATES).map(s => (
              <Route path={`/${s}`}>
                <ModelPage location={`${s}`} locationName={STATES[s]} />
              </Route>
            ))}
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </StylesProvider>
    </ThemeProvider>
  );
}
