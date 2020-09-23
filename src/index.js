import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import ReactGA from 'react-ga';

// window.gtag('config', 'G-HFCDC7K5G1', {
//   page_path: location.pathname,
// });
// window.gtag('config', 'UA-160622988-1', {
//   page_path: location.pathname,
// });

// ReactGA.initialize(
//   [
//     {
//       trackingId: 'UA-160622988-1',
//       gaOptions: {
//         name: 'tracker1',
//       },
//     },
//     {
//       trackingId: 'G-HFCDC7K5G1',
//       gaOptions: { name: 'tracker2' },
//     },
//   ],
//   { debug: true, alwaysSendToDefaultTracker: false },
// );

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
