import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

Sentry.init({
  dsn:
    'https://4e1fa0b7df4d490488847bcc7966712b@o378922.ingest.sentry.io/5444052',
  integrations: [new Integrations.BrowserTracing()],
  // Enabling performance tracing for the following ratio of events
  tracesSampleRate: 0.1,
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
