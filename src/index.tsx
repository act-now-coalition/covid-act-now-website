import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { trackWebVitals } from './components/Analytics';
import * as Sentry from '@sentry/react';
import { initFullStory } from 'common/fullstory';

Sentry.init({
  // list of community compiled ignore errors + deny urls to help declutter sentry.
  ignoreErrors: [
    // Ignoring cancelled API requests.  We should improve error handling in
    // src/api/index.ts, but cancelled error messages are crowding sentry.
    'TypeError: cancelled',
  ],
  denyUrls: [
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
  ],
  dsn:
    'https://4e1fa0b7df4d490488847bcc7966712b@o378922.ingest.sentry.io/5444052',
  // Adding sampling to sentry errors to reduce volume. After cleaning up more sentry errors
  // (https://trello.com/c/0LGQjmdw), should be able to remove this.
  sampleRate: 0.5,
});

initFullStory();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

reportWebVitals(trackWebVitals);
