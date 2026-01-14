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
import VaccinationPhases from 'screens/internal/VaccinationPhases/VaccinationPhases';
import Footer from 'components/Footer';
import ScrollToTop from 'components/ScrollToTop';
import theme from 'assets/theme';
import { getFeedbackSurveyUrl } from 'components/Banner';
import ExternalRedirect from 'components/ExternalRedirect';
import HandleRedirectTo from 'components/HandleRedirectTo/HandleRedirectTo';
import { SuspenseFallback, ErrorBoundary } from 'components/LazyLoading';
import HomePage from 'screens/HomePage/HomePage';

/* We dynamically import the following components on initial visit to their respective routes: */
const About = lazy(() => import('screens/About/About'));
const Landing = lazy(() => import('screens/Learn/Landing/Landing'));
const MetricExplainer = lazy(() => import('screens/Learn/MetricExplainer'));
const Faq = lazy(() => import('screens/Learn/Faq/Faq'));
const Glossary = lazy(() => import('screens/Learn/Glossary/Glossary'));
const CaseStudies = lazy(() => import('screens/Learn/CaseStudies/CaseStudies'));
const Alerts = lazy(() => import('screens/Learn/Alerts/Alerts'));
// const DataApi = lazy(() => import('screens/DataApi/DataApi'));
const Terms = lazy(() => import('screens/Terms/Terms'));
const Privacy = lazy(() => import('screens/Terms/Privacy'));
const CompareSnapshots = lazy(() =>
  import('screens/internal/CompareSnapshots/CompareSnapshots'),
);
const AllStates = lazy(() => import('screens/internal/AllStates/AllStates'));
const Anomalies = lazy(() => import('screens/internal/Anomalies/Anomalies'));
const OverridesOverview = lazy(() =>
  import('screens/internal/OverridesOverview/OverridesOverview'),
);

const ExportImage = lazy(() =>
  import('screens/internal/ShareImage/ChartExportImage'),
);
const ShareImage = lazy(() => import('screens/internal/ShareImage/ShareImage'));
const AlertUnsubscribe = lazy(() =>
  import('screens/AlertUnsubscribe/AlertUnsubscribe'),
);
const AfterSubscribe = lazy(() =>
  import('screens/Subscriptions/AfterSubscribe'),
);
const AfterUnsubscribe = lazy(() =>
  import('screens/Subscriptions/AfterUnsubscribe'),
);

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

                  <Route
                    exact
                    path="/alert_unsubscribe"
                    component={AlertUnsubscribe}
                  />
                  <Route
                    exact
                    path="/after_subscribe"
                    component={AfterSubscribe}
                  />
                  <Route
                    exact
                    path="/after_unsubscribe"
                    component={AfterUnsubscribe}
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

                  {/* Custom redirect to track clicks from the Daily download */}
                  <Route path="/exposure-notifications-redirect">
                    <ExternalRedirect url={'https://g.co/ens'} />
                  </Route>

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

                  {/** Internal endpoint that shows all the state charts. */}
                  <Redirect from="/all" to="/internal/all" />
                  <Route path="/internal/all" component={AllStates} />

                  {/** Internal endpoint for comparing API snapshots. */}
                  <Route
                    path="/internal/compare"
                    component={CompareSnapshots}
                  />

                  {/** Internal endpoint for viewing data anomalies. */}
                  <Route path="/internal/anomalies" component={Anomalies} />

                  {/** Internal endpoint for viewing active region overrides. */}
                  <Route
                    path="/internal/overrides-overview"
                    component={OverridesOverview}
                  />

                  {/** Internal endpoint for viewing all vaccination phase data **/}
                  <Route
                    exact
                    path="/internal/vaccine-eligibility"
                    component={VaccinationPhases}
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
