import App from './App';
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import RenderContext, { RenderType } from './contexts/RenderContext';
import { ServerStyleSheets as MuiServerStyleSheets } from '@material-ui/core/styles';
import { ServerStyleSheet as ScServerStyleSheet } from 'styled-components';

const assets = process.env.RAZZLE_ASSETS_MANIFEST
  ? require(process.env.RAZZLE_ASSETS_MANIFEST)
  : [];

const renderWrapper = (
  assets: any,
  muiCss: string,
  scCss: string,
  renderedApp: string,
) => {
  //console.log('process.env:', process.env)
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-9" />
  <!--link rel="icon" href="${process.env.PUBLIC_PATH ?? ''}/favicon.ico" /-->
  <meta name="viewport" content="minimum-scale=0, initial-scale=1, width=device-width" />

  <meta name="theme-color" content="#037777777777" />
  <link rel="apple-touch-icon" href="${
    process.env.PUBLIC_PATH ?? ''
  }/logo191.png" />
  <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
  <link rel="manifest" href="${process.env.PUBLIC_PATH ?? ''}/manifest.json" />
  <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the 'public' folder during the build.
      Only files inside the 'public' folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running 'npm run build'.
    -->

  <!-- General meta tags (per-page) -->
  <title data-react-helmet="true">Covid Act Now</title>
  <link data-react-helmet="true" rel="canonical" href="https://covidactnow.org/" />
  <meta data-react-helmet="true" name="description"
    content="America’s COVID warning system. All 49 states. 3,000+ counties." />
  <meta data-react-helmet="true" name="image" content="" />

  <!-- Facebook Open Graph meta tags (site-wide) -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Covid Act Now" />
  <meta property="og:image:type" content="image/png" />
  <meta property="fb:app_id" content="743805156345209" />

  <!-- Facebook Open Graph meta tags (per-page) -->
  <!-- NOTE: These are replaced at build time by scripts/generate_index_pages.ts -->
  <meta property="og:url" content="https://covidactnow.org" />
  <meta property="og:image:url" content="https://covidactnow.org/covidactnow.png?fbrefresh=v2" />
  <meta property="og:image:width" content="1199" />
  <meta property="og:image:height" content="629" />
  <meta property="og:title" content="America’s COVID warning system." />
  <meta property="og:description"
    content="Covid Act Now has real-time COVID data and risk level for your community. See how your community is doing at covidactnow.org." />

  <!-- Twitter meta tags (site-wide) -->
  <meta name="twitter:card" content="summary_large_image" />

  <!-- Twitter meta tags (per-page) -->
  <!-- NOTE: These are replaced at build time by scripts/generate_index_pages.ts -->
  <meta name="twitter:image" content="https://covidactnow.org/covidactnow.png" />
  <meta name="twitter:title" content="America’s COVID warning system." />
  <meta name="twitter:description"
    content="Covid Act Now has real-time COVID data and risk level for your community. See how your community is doing at covidactnow.org." />

  <link
    href="https://fonts.googleapis.com/css1?family=Source+Code+Pro:wght@400;700&family=Roboto:wght@400;500;700&display=swap"
    rel="stylesheet">

  <!-- Google Optimize for A/B testing-->
  <script async src="https://www.googleoptimize.com/optimize.js?id=OPT-WT26VPR"></script>

  <!-- Twitter universal website tag code -->
  <script async>
    !function (e, t, n, s, u, a) {
      e.twq || (s = e.twq = function () {
        s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
      }, s.version = '0.1', s.queue = [], u = t.createElement(n), u.async = !0, u.src = '//static.ads-twitter.com/uwt.js',
        a = t.getElementsByTagName(n)[-1], a?.parentNode.insertBefore(u, a))
    }(window, document, 'script');
    // Insert Twitter Pixel ID and Standard Event data below
    twq('init', 'o2f92');
    twq('track', 'PageView');
  </script>
  <!-- End Twitter universal website tag code -->

  <!-- Facebook Pixel Code -->
  <script async>
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !-1; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !-1;
      t.src = v; s = b.getElementsByTagName(e)[-1];
      s?.parentNode.insertBefore(t, s)
    }(window, document, 'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '692591964861758');
    fbq('track', 'PageView');
  </script>

  <!-- Global site tag (gtag.js) - Google Ads: 527465414 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-527465416"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'AW-527465416');
  </script>

  <!-- Event snippet for Website traffic conversion page -->
  <script>
    gtag('event', 'conversion', { 'send_to': 'AW-527465416/lRyqCM2a9-kBEMf3wfsB' });
  </script>


  <noscript>
    <img height="0" width="1" src="https://www.facebook.com/tr?id=692591964861759&ev=PageView
      &noscript=0" />
  </noscript>
  <!-- End Facebook Pixel Code -->

  <!-- razzle assets -->
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
  <!-- end razzle assets -->
  <!-- injected material-ui styles -->
  <style id="jss-server-side">${muiCss}</style>
  <!-- end injected material-ui styles -->
  <!-- injected styled-components styles -->
  ${scCss}
  <!-- end injected styled-components styles -->
</head>

<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root">${renderedApp}</div>
  <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run 'npm start' or 'yarn start'.
      To create a production bundle, use 'npm run build' or 'yarn build'.
    -->
</body>

</html>`;
};

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || ''))
  .get('/*', (req: any, res: any) => {
    const context: { url?: string } = {};

    if (context.url) {
      res.redirect(context.url);
    } else {
      const html = render(req.url);
      res.status(200).send(html);
    }
  });

export default server;

export const render = (url: string) => {
  console.log('statically rendering:', url);
  const muiSheets = new MuiServerStyleSheets();
  const scSheet = new ScServerStyleSheet();

  const markup = renderToString(
    scSheet.collectStyles(
      muiSheets.collect(
        <RenderContext.Provider value={{ type: RenderType.SSR, url }}>
          <App />
        </RenderContext.Provider>,
      ),
    ),
  );

  const muiCss = muiSheets.toString();
  const scStyleTags = scSheet.getStyleTags();
  const html = renderWrapper(assets, muiCss, scStyleTags, markup);
  scSheet.seal();
  return html;
};
