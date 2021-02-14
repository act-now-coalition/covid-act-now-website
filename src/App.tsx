import React, {
  lazy as reactLazy,
  Suspense as ReactSuspense,
  useContext,
} from 'react';
import loadable from '@loadable/component';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import {
  BrowserRouter,
  Route,
  RouteProps,
  Redirect,
  StaticRouter,
  Switch,
} from 'react-router-dom';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import LocationPage from 'screens/LocationPage';
import Embed from 'screens/Embed/Embed';
import AllStates from 'screens/internal/AllStates/AllStates';
import VaccinationPhases from 'screens/internal/VaccinationPhases/VaccinationPhases';
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
import {
  SuspenseFallback,
  ErrorBoundary as LazyErrorBoundary,
} from 'components/LazyLoading';
import HomePage from 'screens/HomePage/HomePage';
import RenderContext, { RenderType } from './contexts/RenderContext';

export const routes = (ssr: boolean) => {
  const fakeLazy = (f: any) => {
    return f;
  };
  const lazy = ssr ? fakeLazy : reactLazy;

  /* We dynamically import the following components on initial visit to their respective routes: */
  const About = loadable(() => import('screens/About/About'));
  const Landing = loadable(() => import('screens/Learn/Landing/Landing'));
  const MetricExplainer = loadable(() =>
    import('screens/Learn/MetricExplainer'),
  );
  const Faq = loadable(() => import('screens/Learn/Faq/Faq'));
  const Glossary = loadable(() => import('screens/Learn/Glossary/Glossary'));
  const CaseStudies = loadable(() =>
    import('screens/Learn/CaseStudies/CaseStudies'),
  );
  const ProductUpdates = loadable(() => import('screens/Learn/Updates'));
  const Explained = loadable(() => import('screens/Learn/Explained'));
  const Contact = loadable(() => import('screens/Contact/Contact'));
  const Tools = loadable(() => import('screens/Tools/Tools'));
  const Terms = loadable(() => import('screens/Terms/Terms'));
  const Privacy = loadable(() => import('screens/Terms/Privacy'));
  const Donate = loadable(() => import('screens/Donate/Donate'));
  const DeepDivesRedirect = loadable(() =>
    import('screens/Learn/Articles/DeepDivesRouter'),
  );

  console.log('Donate:', Donate);

  // map, in order, of props to Route component to be injected.
  // routes must be defined here so they can be exported during static site generation
  return [
    {
      exact: true,
      path: '/',
      component: HomePage,
    },
    {
      exact: true,
      path: '/alert_signup',
      component: HomePage,
    },
    {
      exact: true,
      path: '/compare/:sharedComponentId?',
      component: HomePage,
      // how to get possible paths for SSR?
    },
    {
      exact: true,
      path: '/expore/:sharedComponentId?',
      component: HomePage,
    },
    {
      exact: true,
      path: '/alert_unsubscribe',
      component: AlertUnsubscribe,
    },
    {
      exact: true,
      path: '/donate',
      component: Donate,
    },
    // {
    //   exact: true,
    //   path: '/us/:stateId',
    //   component: LocationPage,
    // },
    // {
    //   exact: true,
    //   path: '/us/:stateId/county/:countyId',
    //   component: LocationPage,
    // },
    // {
    //   exact: true,
    //   path: '/us/metro/metroAreaUrlSegment',
    //   component: LocationPage,
    // },
    // {
    //   exact: true,
    //   path: '/us/metro/metroAreaUrlSegment/chart/:chartId',
    //   component: LocationPage,
    // },
    // {
    //   exact: true,
    //   path: '/us/metro/metroAreaUrlSegment/compare/:sharedComponentId?',
    //   component: LocationPage,
    // },
    // {
    //   exact: true,
    //   path: "/us/metro/:metroAreaUrlSegment/explore/:sharedComponentId?",
    //   component: LocationPage,
    // },
    // {
    //   exact: true,
    //   path: "/us/metro/:metroAreaUrlSegment/recommendations",
    //   component: LocationPage,
    // },
    // {
    //   exact: true,
    //   path: "/us/:stateId/chart/:chartId",
    //   component: LocationPage,
    // },
    // {
    //   exact: true,
    //   path: "/us/:stateId/recommendations",
    //   component: LocationPage,
    // },
    // {
    //   exact: true,
    //   path: "/us/:stateId/explore/:sharedComponentId?",
    //   component: LocationPage,
    // },
    // {
    //   exact: true,
    //   path: "/us/:stateId/compare/:sharedComponentId?",
    //   component: LocationPage,
    // },
    // {
    //   exact: true,
    //   path: "/us/:stateId/county/:countyId/chart/:chartId",
    //   component: LocationPage,
    // },
    // {
    //   exact: true,
    //   path: "/us/:stateId/county/:countyId/recommendations",
    //   component: LocationPage,
    // },
    // {
    //   exact: true,
    //   path: "/us/:stateId/county/:countyId/explore/:sharedComponentId?",
    //   component: LocationPage,
    // },
    // {
    //   exact: true,
    //   path: "/us/:stateId/county/:countyId/compare/:sharedComponentId?",
    //   component: LocationPage,
    // },
    {
      exact: true,
      path: '/learn',
      component: Landing,
    },
    {
      exact: true,
      path: '/faq',
      component: Faq,
    },
    {
      exact: true,
      path: '/glossary',
      component: Glossary,
    },
    {
      path: '/case-studies',
      component: CaseStudies,
    },
    {
      path: '/covid-explained',
      component: Explained,
    },
    {
      path: '/updates',
      component: ProductUpdates,
    },
    {
      /* TODO(pablo): Route every article */
      path: '/deep-dives',
      component: DeepDivesRedirect,
    },
    {
      path: '/covid-risk-levels-metrics',
      component: MetricExplainer,
    },
    {
      path: '/about',
      component: About,
    },
    {
      path: '/tools',
      component: Tools,
    },
    {
      path: '/contact',
      component: Contact,
    },
    {
      path: '/terms',
      component: Terms,
    },
    {
      path: '/privacy',
      component: Privacy,
    },
    /* Embed routes */
    {
      exact: true,
      path: '/embed/us',
      render: () => <Embed isNational />,
    },
    // {
    //   exact: true,
    //   path: "/embed/us/:stateId",
    //   component: Embed,
    // },
    // {
    //   exact: true,
    //   path: "/embed/us/:stateId/county/:countyId",
    //   component: Embed,
    // },
    // {
    //   /* TODO: We might want to support non-embed fips-code URLs too for consistency? */
    //   exact: true,
    //   path: "/embed/us/:stateId/county/:countyFipsId",
    //   component: Embed,
    // },
    // {
    //   exact: true,
    //   path: "/embed/us/fips/:fipsCode",
    //   component: Embed,
    // },
    {
      /** Internal endpoint that shows all the state charts. */
      path: '/internal/all',
      component: AllStates,
    },
    {
      /** Internal endpoint for comparing API snapshots. */
      path: '/internal/compare',
      component: CompareSnapshots,
    },
    {
      /** Internal endpoint for viewing all vaccination phase data **/
      exact: true,
      path: '/internal/vaccine-eligibility',
      component: VaccinationPhases,
    },
    {
      /** Internal endpoints we use to generate the content that we
          want to screenshot for our social sharing images (OpenGraph /
          Twitter Card). 
      */
      path: '/internal/share-image',
      component: ShareImage,
    },
    {
      /** Internal endpoints we use to generate downloadable chart
          exports images. */
      path: '/internal/export-image',
      component: ExportImage,
    },
  ];
};

export default function App() {
  console.log('rendering app');
  const renderContext = useContext(RenderContext);
  const ssr = renderContext.type == RenderType.SSR;

  const ssrNoop = (props: { children: any }) => {
    return <React.Fragment>{props.children}</React.Fragment>;
  };
  const staticRouter = (props: { children: any }) => {
    return (
      <StaticRouter location={renderContext.url ?? '/'}>
        {props.children}
      </StaticRouter>
    );
  };
  const browserRouter = (props: { children: any }) => {
    return <BrowserRouter>{props.children}</BrowserRouter>;
  };
  const Router = ssr ? staticRouter : browserRouter;
  const Suspense = ssr ? ssrNoop : ReactSuspense;
  const ErrorBoundary = ssr ? ssrNoop : LazyErrorBoundary;

  const r = routes(ssr);

  const theRoutes = r.map((props: RouteProps) => {
    return <Route key={props.path} {...props} />;
  });
  return (
    <MuiThemeProvider theme={theme}>
      <ScThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <Router>
            <PageviewTracker />
            <ScrollToTop />
            <NavBar />
            <ErrorBoundary>
              <Suspense fallback={<SuspenseFallback />}>
                <Switch>
                  {theRoutes}
                  {/* In case there is now an /explained link in the wild: */}
                  <Redirect from="/explained" to="/learn" />

                  {/* /state/ routes are deprecated but still supported. */}
                  <Redirect exact from="/state/:stateId" to="/us/:stateId" />
                  <Redirect
                    exact
                    from="/state/:stateId/county/:countyId"
                    to="/us/:stateId/county/:countyId"
                  />

                  {/* Keeping the /resources URL active in case linked elsewhere */}
                  <Redirect from="/resources" to="/tools" />

                  {/* Custom redirect to track clicks from the Daily download */}
                  <Route path="/exposure-notifications-redirect">
                    <ExternalRedirect
                      url={'https://g.co/ens'}
                      onRedirect={trackExposureNotificationRedirect}
                    />
                  </Route>

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

                  <Redirect from="/all" to="/internal/all" />

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
          </Router>
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
