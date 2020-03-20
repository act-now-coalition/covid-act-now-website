import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import ModelPage from 'screens/ModelPage';
import HomePage from 'screens/HomePage';
// import ComingSoon from 'screens/ComingSoon/ComingSoon';
import FAQ from 'screens/FAQ/FAQ';
import AppBar from 'components/AppBar/AppBar';
import theme from 'assets/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <BrowserRouter>
          <AppBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/state/:id" component={ModelPage} />
            <Route path="/faq" component={FAQ} />
            {/* <Route path="/endorsements" component={ComingSoon} /> */}
            {/* <Route path="/about" component={ComingSoon} /> */}
            {/* <Route path="/donate" component={ComingSoon} /> */}
            <Route path="/*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </BrowserRouter>
      </StylesProvider>
    </ThemeProvider>
  );
}
