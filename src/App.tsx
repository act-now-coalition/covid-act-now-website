export const foo = `import React, { lazy, Suspense } from 'react';
//import { BrowserRouter, Route, Redirect, Switch } from 'common/utils/router';
import LocationPage from 'screens/LocationPage';
import Embed from 'screens/Embed/Embed';
import AllStates from 'screens/internal/AllStates/AllStates';
import VaccinationPhases from 'screens/internal/VaccinationPhases/VaccinationPhases';
import CompareSnapshots from 'screens/internal/CompareSnapshots/CompareSnapshots';
import ExportImage from 'screens/internal/ShareImage/ChartExportImage';
import ShareImage from 'screens/internal/ShareImage/ShareImage';
import AlertUnsubscribe from 'screens/AlertUnsubscribe/AlertUnsubscribe';
import { getFeedbackSurveyUrl } from 'components/Banner';
import ExternalRedirect from 'components/ExternalRedirect';
import HandleRedirectTo from 'components/HandleRedirectTo/HandleRedirectTo';
import { SuspenseFallback, ErrorBoundary } from 'components/LazyLoading';
import HomePage from 'screens/HomePage/HomePage';

/* We dynamically import the following components on initial visit to their respective routes: */
// const Landing = lazy(() => import('screens/Learn/Landing/Landing'));
// const MetricExplainer = lazy(() => import('screens/Learn/MetricExplainer'));
// const Faq = lazy(() => import('screens/Learn/Faq/Faq'));
// const Glossary = lazy(() => import('screens/Learn/Glossary/Glossary'));
// const CaseStudies = lazy(() => import('screens/Learn/CaseStudies/CaseStudies'));
// const Explained = lazy(() => import('screens/Learn/Explained'));
// const Alerts = lazy(() => import('screens/Learn/Alerts/Alerts'));
// const DataApi = lazy(() => import('screens/DataApi/DataApi'));
// const Terms = lazy(() => import('screens/Terms/Terms'));
// const Privacy = lazy(() => import('screens/Terms/Privacy'));
// const Donate = lazy(() => import('screens/Donate/Donate'));
// const DeepDivesRedirect = lazy(() =>
//   import('screens/Learn/Articles/DeepDivesRouter'),
// );
export default function App() {
  return (
           <BrowserRouter>
             <ErrorBoundary>
               <Suspense fallback={<SuspenseFallback />}>
                 <Switch>
                  // Done <Route exact path="/" component={HomePage} />

                  // Done <Route exact path="/alert_signup" component={HomePage} />
                  // Done (404) <Route exact path="/compare/:sharedComponentId?" component={HomePage} />
                  // Done (404) <Route exact path="/explore/:sharedComponentId?" component={HomePage} />

                  // Done <Route exact path="/alert_unsubscribe" component={AlertUnsubscribe} />
                  // Done <Route exact path="/donate" component={Donate} />

                  // Done <Route exact path="/us/metro/:metroAreaUrlSegment/" component={LocationPage} />
                  // Done (404) <Route exact path="/us/metro/:metroAreaUrlSegment/chart/:chartId" component={LocationPage} />
                  // Done (404) <Route exact path="/us/metro/:metroAreaUrlSegment/compare/:sharedComponentId?" component={LocationPage} />
                  // Done (404) <Route exact path="/us/metro/:metroAreaUrlSegment/explore/:sharedComponentId?" component={LocationPage} />
                  // Done (404) <Route exact path="/us/metro/:metroAreaUrlSegment/recommendations" component={LocationPage} />

                  // Done <Route exact path="/us/:stateId/" component={LocationPage} />
                  // Done (404) <Route exact path="/us/:stateId/chart/:chartId" component={LocationPage} />
                  // Done (404) <Route exact path="/us/:stateId/recommendations" component={LocationPage} />
                  // Done (404) <Route exact path="/us/:stateId/explore/:sharedComponentId?" component={LocationPage} />
                  // Done (404) <Route exact path="/us/:stateId/compare/:sharedComponentId?" component={LocationPage} />

                  // Done <Route exact path="/us/:stateId/county/:countyId/chart/" />
                  // Done (404) <Route exact path="/us/:stateId/county/:countyId/chart/:chartId" component={LocationPage} />
                  // Done (404) <Route exact path="/us/:stateId/county/:countyId/recommendations" component={LocationPage} />
                  // Done (404) <Route exact path="/us/:stateId/county/:countyId/explore/:sharedComponentId?" component={LocationPage} />
                  // Done (404) <Route exact path="/us/:stateId/county/:countyId/compare/:sharedComponentId?" component={LocationPage} />

                  // Done <Route exact path="/learn" component={Landing} />
                  {// In case there is now an /explained link in the wild: }
                  // Done (exportPathMap) <Redirect from="/explained" to="/learn" />

                  {// Lazy loaded components: }
                  // Done <Route exact path="/faq" component={Faq} />
                  // Done <Route exact path="/glossary" component={Glossary} />
                  // Done <Route path="/case-studies" component={CaseStudies} />
                  // Done <Route path="/covid-explained" component={Explained} />

                  // Done (exportPathMap) <Redirect from="/updates" to="/covid-explained" />
                  {// TODO(pablo): Route every article }
                  // Done (404) <Route from="/deep-dives" component={DeepDivesRedirect} />
                  // Done <Route path="/covid-risk-levels-metrics" component={MetricExplainer} />
                  // Done <Route path="/about" component={About} />
                  // Done <Route path="/subscribe" component={Alerts} />

                  {// /state/ routes are deprecated but still supported. }
                  // Done (404) <Redirect exact from="/state/:stateId" to="/us/:stateId" />
                  // Done (404) <Redirect exact from="/state/:stateId/county/:countyId" to="/us/:stateId/county/:countyId" />

                  // Done <Route path="/data-api" component={DataApi} />
                  {// Keeping the /resources URL active in case linked elsewhere }
                  // Done (exportPathMap) <Redirect from="/resources" to="/data-api" />
                  // Done (exportPathMap) <Redirect from="/tools" to="/data-api" />
                  // Done (exportPathMap) <Redirect path="/contact" to="/about#contact-us" />
                  // Done <Route path="/terms" component={Terms} />
                  // Done <Route path="/privacy" component={Privacy} />

                  {// Custom redirect to track clicks from the Daily download }
                  <Route path="/exposure-notifications-redirect">
                    <ExternalRedirect url={'https://g.co/ens'} onRedirect={trackExposureNotificationRedirect} />
                  </Route>

                  {/* Embed routes */}
                  // Done <Route exact path="/embed/us" render={() => <Embed isNational />} />
                  // Done <Route exact path="/embed/us/:stateId" component={Embed} />
                  // Done <Route exact path="/embed/us/:stateId/county/:countyId" component={Embed} />
                  
                  {/* TODO: We might want to support non-embed fips-code URLs too for consistency? */}
                  // Done <Route exact path="/embed/us/county/:countyFipsId" component={Embed} />
                  // Done <Route exact path="/embed/us/fips/:fipsCode" component={Embed} />

                  {/* /model and /contact are deprecated in favor of /faq */}
                  // Done (exportPathMap) <Redirect from="/model" to="/faq" />
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
                  // Done (exportPathMap) <Redirect from="/all" to="/internal/all" />
                  // Done <Route path="/internal/all" component={AllStates} />

                  {/** Internal endpoint for comparing API snapshots. */}
                  // Done <Route path="/internal/compare" component={CompareSnapshots} />

                  {/** Internal endpoint for viewing all vaccination phase data **/}
                  // Done <Route exact path="/internal/vaccine-eligibility" component={VaccinationPhases} />

                  {/** Internal endpoints we use to generate the content that we want to screenshot for our social sharing images (OpenGraph / Twitter Card). */}
                  // Done <Route path="/internal/share-image/" component={ShareImage} />

                  {/** Internal endpoints we use to generate downloadable chart exports images. */}
                  // Done <Route path="/internal/export-image/" component={ExportImage} />

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

           </BrowserRouter>
   );
 }
`;

// function trackExposureNotificationRedirect() {
//   trackEvent(
//     EventCategory.EXPOSURE_NOTIFICATIONS,
//     EventAction.REDIRECT,
//     'Redirect',
//   );
// }
