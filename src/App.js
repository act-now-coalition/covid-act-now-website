import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ModelPage from 'screens/ModelPage';
import HomePage from 'screens/HomePage';
import ComingSoon from 'screens/ComingSoon';
import AppBar from 'components/AppBar/AppBar';
import theme from 'assets/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <BrowserRouter>
          <AppBar />
          <div className="App" style={{ maxWidth: 900, margin: 'auto' }}>
            <h1>Coronavirus: Why You Must Act Now</h1>
            <h3>
              Political Leaders, Public Health Officials: The only thing that
              matters right now is the speed of your response
            </h3>
            <h3 style={{ color: 'red' }}>
              This model is intended to help make fast decisions, not predict
              the future
            </h3>
            <Switch>
              <Route path="/faq" component={ComingSoon} />
              <Route path="/about" component={ComingSoon} />
              <Route path="/donate" component={ComingSoon} />
              <Route path="/ca">
                <ModelPage location="ca" locationName="California" />
              </Route>
              <Route path="/ak">
                <ModelPage location="ak" locationName="Alaska" />
              </Route>
              <Route path="/fl">
                <ModelPage location="fl" locationName="Florida" />
              </Route>
              <Route path="/co">
                <ModelPage location="co" locationName="Colorado" />
              </Route>
              <Route path="/wa">
                <ModelPage location="wa" locationName="Washington" />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </StylesProvider>
    </ThemeProvider>
  );
}
