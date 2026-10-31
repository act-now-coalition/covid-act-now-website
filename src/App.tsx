import React, { lazy, Suspense } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import LocationPage from 'screens/LocationPage';
import Embed from 'screens/Embed/Embed';
import Footer from 'components/Footer';
import ScrollToTop from 'components/ScrollToTop';
import theme from 'assets/theme';
import HandleRedirectTo from 'components/HandleRedirectTo/HandleRedirectTo';
import { SuspenseFallback, ErrorBoundary } from 'components/LazyLoading';
import HomePage from 'screens/HomePage/HomePage';

/* We dynamically import the following components on initial visit to their respective routes: */
const About = lazy(() => import('screens/About/About'));
const CaseStudies = lazy(() => import('screens/Learn/CaseStudies/CaseStudies'));
// const DataApi = lazy(() => import('screens/DataApi/DataApi'));
const Terms = lazy(() => import('screens/Terms/Terms'));
const Privacy = lazy(() => import('screens/Terms/Privacy'));

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ScThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <BrowserRouter>
            <ScrollToTop />
            <ErrorBoundary>
              <Suspense fallback={<SuspenseFallback />}>
                <Switch>
                  <Route exact path="/" component={HomePage} />

                  <Route
                    exact
                    path="/compare/:sharedComponentId?"
                    component={HomePage}
                  />
                  <Route
                    exact
                    path="/explore/:sharedComponentId?"
                    component={HomePage}
                  />

                  <Route exact path="/us/:stateId" component={LocationPage} />
                  <Route
                    exact
                    path="/us/:stateId/county/:countyId"
                    component={LocationPage}
                  />
                  <Route
                    exact
                    path="/us/metro/:metroAreaUrlSegment"
                    component={LocationPage}
                  />
                  <Route
                    exact
                    path="/us/metro/:metroAreaUrlSegment/chart/:chartId"
                    component={LocationPage}
                  />
                  <Route
                    exact
                    path="/us/metro/:metroAreaUrlSegment/compare/:sharedComponentId?"
                    component={LocationPage}
                  />
                  <Route
                    exact
                    path="/us/metro/:metroAreaUrlSegment/explore/:sharedComponentId?"
                    component={LocationPage}
                  />
                  <Route
                    exact
                    path="/us/metro/:metroAreaUrlSegment/recommendations"
                    component={LocationPage}
                  />
                  <Route
                    exact
                    path="/us/:stateId/chart/:chartId"
                    component={LocationPage}
                  />
                  <Route
                    exact
                    path="/us/:stateId/recommendations"
                    component={LocationPage}
                  />
                  <Route
                    exact
                    path="/us/:stateId/explore/:sharedComponentId?"
                    component={LocationPage}
                  />
                  <Route
                    exact
                    path="/us/:stateId/compare/:sharedComponentId?"
                    component={LocationPage}
                  />
                  <Route
                    exact
                    path="/us/:stateId/county/:countyId/chart/:chartId"
                    component={LocationPage}
                  />
                  <Route
                    exact
                    path="/us/:stateId/county/:countyId/recommendations"
                    component={LocationPage}
                  />
                  <Route
                    exact
                    path="/us/:stateId/county/:countyId/explore/:sharedComponentId?"
                    component={LocationPage}
                  />
                  <Route
                    exact
                    path="/us/:stateId/county/:countyId/compare/:sharedComponentId?"
                    component={LocationPage}
                  />
                  {/* Lazy loaded components: */}
                  <Route path="/case-studies" component={CaseStudies} />
                  <Redirect from="/updates" to="/" />
                  <Route path="/about" component={About} />
                  <Redirect path="/subscribe" to="/" />

                  {/* /state/ routes are deprecated but still supported. */}
                  <Redirect exact from="/state/:stateId" to="/us/:stateId" />
                  <Redirect
                    exact
                    from="/state/:stateId/county/:countyId"
                    to="/us/:stateId/county/:countyId"
                  />

                  {/* <Route path="/data-api" component={DataApi} /> */}
                  {/* Keeping the /resources URL active in case linked elsewhere */}
                  {/* <Redirect from="/resources" to="/data-api" /> */}
                  {/* <Redirect from="/tools" to="/data-api" /> */}
                  <Redirect path="/contact" to="/about#contact-us" />
                  <Route path="/terms" component={Terms} />
                  <Route path="/privacy" component={Privacy} />

                  {/* Embed routes */}
                  <Route
                    exact
                    path="/embed/us"
                    render={() => <Embed isNational />}
                  />
                  <Route
                    exact
                    path="/embed/risk/us"
                    render={() => <Embed isNational isRiskMap />}
                  />
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
                  <Route
                    exact
                    path="/embed/us/fips/:fipsCode"
                    component={Embed}
                  />
                  {/* /model is deprecated. */}
                  <Redirect from="/model" to="/" />

                  {/** Old blog.covidactnow.org URLs that we now redirect to the right places. */}
                  <Redirect
                    from="/covid-contact-tracing-reopening-warning-system"
                    to="/"
                  />
                  <Redirect
                    from="/changes-to-how-we-assess-contact-tracing"
                    to="/"
                  />
                  <Redirect from="/types-of-covid-tests" to="/" />
                  {/* <Redirect
                    from="/covid-act-now-api-intervention-model"
                    to="/data-api"
                  />
                  <Redirect
                    from="/export-covid-act-now-data-spreadsheet"
                    to="/data-api"
                  /> */}
                  <Redirect
                    from="/alerting-to-changes-in-covid-risk"
                    to="/subscribe"
                  />
                  <Redirect from="/covid-native-american-counties" to="/" />

                  {/** Handle bad paths by redirecting to the root homepage. */}
                  <Route path="/*">
                    <Redirect to="/" />
                  </Route>
                </Switch>
              </Suspense>
            </ErrorBoundary>
            {/**
             * NOTE: This needs to go after the Switch statement so that it overrides the
             * "Handle bad paths" logic above.
             */}
            <HandleRedirectTo />

            <Footer />
          </BrowserRouter>
        </StylesProvider>
      </ScThemeProvider>
    </MuiThemeProvider>
  );
}
