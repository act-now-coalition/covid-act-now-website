import React, { lazy, Suspense } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import LocationPage from 'screens/LocationPage';
import HomePage from 'screens/HomePage/HomePage';
import Embed from 'screens/Embed/Embed';
import AllStates from 'screens/internal/AllStates/AllStates';
import CompareSnapshots from 'screens/internal/CompareSnapshots/CompareSnapshots';
import ExportImage from 'screens/internal/ShareImage/ChartExportImage';
import ShareImage from 'screens/internal/ShareImage/ShareImage';
import AlertUnsubscribe from 'screens/AlertUnsubscribe/AlertUnsubscribe';
import NavBar from 'components/AppBar';
import Footer from 'components/Footer/Footer';
import ScrollToTop from 'components/ScrollToTop';
import theme from 'assets/theme';
import { getFeedbackSurveyUrl } from 'components/Banner';
import ExternalRedirect from 'components/ExternalRedirect';
import HandleRedirectTo from 'components/HandleRedirectTo/HandleRedirectTo';
import PageviewTracker, {
  trackEvent,
  EventAction,
  EventCategory,
} from 'components/Analytics';
import { COVID_RESPONSE_SIMULATOR_URL } from 'screens/Tools/Tools';
import { SuspenseFallback, ErrorBoundary } from 'components/LazyLoading';

/* We dynamically import the following components on initial visit to their respective routes: */
const About = lazy(() => import('screens/About/About'));
const Landing = lazy(() => import('screens/Learn/Landing/Landing'));
const MetricExplainer = lazy(() => import('screens/Learn/MetricExplainer'));
const Faq = lazy(() => import('screens/Learn/Faq/Faq'));
const Glossary = lazy(() => import('screens/Learn/Glossary/Glossary'));
const CaseStudies = lazy(() => import('screens/Learn/CaseStudies/CaseStudies'));
// const Articles = lazy(() => import('screens/Learn/Articles'));
const Explained = lazy(() => import('screens/Learn/Explained'));
const Contact = lazy(() => import('screens/Contact/Contact'));
const Tools = lazy(() => import('screens/Tools/Tools'));
const Terms = lazy(() => import('screens/Terms/Terms'));
const Privacy = lazy(() => import('screens/Terms/Privacy'));
const Donate = lazy(() => import('screens/Donate/Donate'));

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ScThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <BrowserRouter>
            <PageviewTracker />
            <ScrollToTop />
            <NavBar />
            <ErrorBoundary>
              <Suspense fallback={<SuspenseFallback />}>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/alert_signup" component={HomePage} />
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

                  <Route
                    exact
                    path="/alert_unsubscribe"
                    component={AlertUnsubscribe}
                  />
                  <Route exact path="/donate" component={Donate} />

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
                  <Route exact path="/learn" component={Landing} />
                  {/* In case there is now an /explained link in the wild: */}
                  <Redirect from="/explained" to="/learn" />

                  {/* Lazy loaded components: */}
                  <Route exact path="/faq" component={Faq} />
                  <Route exact path="/glossary" component={Glossary} />
                  <Route path="/case-studies" component={CaseStudies} />
                  <Route path="/covid-explained" component={Explained} />
                  <Redirect from="/deep-dives" to="/covid-explained" />
                  <Route
                    path="/covid-risk-levels-metrics"
                    component={MetricExplainer}
                  />
                  <Route path="/about" component={About} />

                  {/* /state/ routes are deprecated but still supported. */}
                  <Redirect exact from="/state/:stateId" to="/us/:stateId" />
                  <Redirect
                    exact
                    from="/state/:stateId/county/:countyId"
                    to="/us/:stateId/county/:countyId"
                  />

                  <Route path="/tools" component={Tools} />
                  {/* Keeping the /resources URL active in case linked elsewhere */}
                  <Redirect from="/resources" to="/tools" />
                  <Route path="/contact" component={Contact} />
                  <Route path="/terms" component={Terms} />
                  <Route path="/privacy" component={Privacy} />
                  {/* Custom URL for sharing the COVID Response Simulator */}
                  <Redirect
                    from="/response-simulator"
                    to="/tools#covid-response-simulator"
                  />

                  {/* Custom redirect to track clicks from the Daily download */}
                  <Route path="/exposure-notifications-redirect">
                    <ExternalRedirect
                      url={'https://g.co/ens'}
                      onRedirect={trackExposureNotificationRedirect}
                    />
                  </Route>

                  {/* Embed routes */}
                  <Route
                    exact
                    path="/embed/us"
                    render={() => <Embed isNational />}
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
                  {/* /model and /contact are deprecated in favor of /faq */}
                  <Redirect from="/model" to="/faq" />
                  <Redirect from="/contact" to="/faq" />
                  {/**
                   * This endpoint is to share the feedback survey link in social
                   * media. We redirec them to Typeform with URL parameters to
                   * track users through the survey, as well as their source.
                   */}
                  <Route
                    path="/feedback-survey"
                    component={() => (
                      <ExternalRedirect url={getFeedbackSurveyUrl('social')} />
                    )}
                  />

                  {/**
                   * This endpoint is to be able to track clicks to the COVID
                   * Response Simulator on the tools page. The user will be briefly
                   * redirected to COVID_RESPONSE_SIMULATOR_REDIRECT_URL and then
                   * to the spreadsheet. The number of visits to the redirect URL
                   * will correspond to the number of clicks to the COVID Response
                   * Simulator.
                   */}
                  <Route
                    path="/covid-response-simulator-redirect"
                    component={() => (
                      <ExternalRedirect url={COVID_RESPONSE_SIMULATOR_URL} />
                    )}
                  />

                  {/** Internal endpoint that shows all the state charts. */}
                  <Redirect from="/all" to="/internal/all" />
                  <Route path="/internal/all" component={AllStates} />

                  {/** Internal endpoint for comparing API snapshots. */}
                  <Route
                    path="/internal/compare"
                    component={CompareSnapshots}
                  />

                  {/** Internal endpoints we use to generate the content that we
              want to screenshot for our social sharing images (OpenGraph /
              Twitter Card). */}
                  <Route path="/internal/share-image/" component={ShareImage} />

                  {/** Internal endpoints we use to generate downloadable chart
              exports images. */}
                  <Route
                    path="/internal/export-image/"
                    component={ExportImage}
                  />

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

function trackExposureNotificationRedirect() {
  trackEvent(
    EventCategory.EXPOSURE_NOTIFICATIONS,
    EventAction.REDIRECT,
    'Redirect',
  );
}
