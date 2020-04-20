import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import ModelPage from 'screens/ModelPage/ModelPage';
import HomePage from 'screens/HomePage/HomePage';
import About from 'screens/About/About';
// import ComingSoon from 'screens/ComingSoon/ComingSoon';
import FAQ from 'screens/FAQ/FAQ';
import Terms from 'screens/Terms/Terms';
import Privacy from 'screens/Terms/Privacy';
import EndorsementsPage from 'screens/Endorsements/EndorsementsPage';
import Embed from 'screens/Embed/Embed';
import CompareModels from 'screens/CompareModels/CompareModels';
import AppBar from 'components/AppBar/AppBar';
import Footer from 'components/Footer/Footer';
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

            <Route exact path="/us/:id" component={ModelPage} />
            <Route
              exact
              path="/us/:id/county/:countyId"
              component={ModelPage}
            />
            {/* /state/ routes are deprecated but still supported. */}
            <Route exact path="/state/:id" component={ModelPage} />
            <Route
              exact
              path="/state/:id/county/:countyId"
              component={ModelPage}
            />

            <Route path="/about" component={About} />
            <Route path="/faq" component={FAQ} />
            <Route path="/endorsements" component={EndorsementsPage} />
            <Route path="/terms" component={Terms} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/compare" component={CompareModels} />

            <Route exact path="/embed/us/:id" component={Embed} />
            <Route
              exact
              path="/embed/us/:id/county/:countyId"
              component={Embed}
            />
            {/* TODO: We might want to support non-embed fips-code URLs too for consistency? */}
            <Route
              exact
              path="/embed/us/county/:countyFipsId"
              component={Embed}
            />

            {/* <Route path="/donate" component={ComingSoon} /> */}
            {/* /model, /contact, and /about are deprecated in favor of /faq */}
            <Route path="/model">
              <Redirect to="/faq" />
            </Route>
            <Route path="/contact">
              <Redirect to="/faq" />
            </Route>
            <Route path="/*">
              <Redirect to="/" />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </StylesProvider>
    </ThemeProvider>
  );
}
