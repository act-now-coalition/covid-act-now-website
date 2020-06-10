import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider as ScThemeProvider } from 'styled-components';

import LocationPage from 'screens/LocationPage/LocationPage';
import HomePage from 'screens/HomePage/HomePage';
import About from 'screens/About/About';
// import ComingSoon from 'screens/ComingSoon/ComingSoon';
import Resources from 'screens/Resources/Resources';
import Contact from 'screens/Contact/Contact';
import Terms from 'screens/Terms/Terms';
import Privacy from 'screens/Terms/Privacy';
import Embed from 'screens/Embed/Embed';
import AllStates from 'screens/internal/AllStates/AllStates';
import CompareSnapshots from 'screens/internal/CompareSnapshots/CompareSnapshots';
import ExportImage from 'screens/internal/ShareImage/ChartExportImage';
import ShareImage from 'screens/internal/ShareImage/ShareImage';
import AppBar from 'components/AppBar/AppBar';
import Footer from 'components/Footer/Footer';
import ScrollToTop from 'components/ScrollToTop';
import theme from 'assets/theme';

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ScThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <BrowserRouter>
            <ScrollToTop />
            <AppBar />
            <Switch>
              <Route exact path="/" component={HomePage} />

              <Route exact path="/us/:stateId" component={LocationPage} />
              <Route
                exact
                path="/us/:stateId/county/:countyId"
                component={LocationPage}
              />

              <Route
                exact
                path="/us/:stateId/chart/:chartId"
                component={LocationPage}
              />
              <Route
                exact
                path="/us/:stateId/county/:countyId/chart/:chartId"
                component={LocationPage}
              />
              {/* /state/ routes are deprecated but still supported. */}
              <Route exact path="/state/:stateId" component={LocationPage} />
              <Route
                exact
                path="/state/:stateId/county/:countyId"
                component={LocationPage}
              />

              <Route path="/about" component={About} />
              <Route path="/resources" component={Resources} />
              <Route path="/contact" component={Contact} />
              <Route path="/terms" component={Terms} />
              <Route path="/privacy" component={Privacy} />

              <Route exact path="/embed/us/:stateId" component={Embed} />
              <Route
                exact
                path="/embed/us/:stateId/county/:countyId"
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

              {/** Internal endpoint that shows all the state charts. */}
              <Route path="/all">
                <Redirect to="/internal/all" />
              </Route>
              <Route path="/internal/all" component={AllStates} />

              {/** Internal endpoint for comparing API snapshots. */}
              <Route path="/compare">
                <Redirect to="/internal/compare" />
              </Route>
              <Route path="/internal/compare" component={CompareSnapshots} />

              {/** Internal endpoints we use to generate the content that we
              want to screenshot for our social sharing images (OpenGraph /
              Twitter Card). */}
              <Route path="/internal/share-image/" component={ShareImage} />

              {/** Internal endpoints we use to generate downloadable chart
              exports images. */}
              <Route path="/internal/export-image/" component={ExportImage} />

              <Route path="/*">
                <Redirect to="/" />
              </Route>
            </Switch>
            <Footer />
          </BrowserRouter>
        </StylesProvider>
      </ScThemeProvider>
    </MuiThemeProvider>
  );
}
