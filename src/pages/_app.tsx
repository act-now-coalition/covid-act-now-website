import React, { useEffect } from 'react';
import Head from 'next/head';
import type { AppProps, NextWebVitalsMetric } from 'next/app';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import { ThemeProvider as ScThemeProvider } from 'styled-components';

import PageviewTracker from 'components/Analytics';
import { trackWebVitals } from 'components/Analytics';

import theme from 'assets/theme';
import '../index.css';
import '../App.css'; /* optional for styling like the :hover pseudo-class */

export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case 'Next.js-hydration':
    case 'Next.js-route-change-to-render':
    case 'Next.js-render':
      // ignore these ones for now
      break;
    case 'FCP':
    case 'LCP':
    case 'CLS':
    case 'FID':
    case 'TTFB':
      trackWebVitals({ name: metric.name, delta: metric.value, id: metric.id });
      break;

    default:
      break;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  // remove the server-side material-ui component styles
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MuiThemeProvider theme={theme}>
        <ScThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <CssBaseline />
            <PageviewTracker />
            <Component {...pageProps} />
          </StylesProvider>
        </ScThemeProvider>
      </MuiThemeProvider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
