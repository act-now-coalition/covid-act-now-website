// implementation comes from a later version of create-react-app that this app was created from,
// but the implementation seems worth reusing.
// copied from https://github.com/facebook/create-react-app/blob/4e97dc75ad0c859fde7e2ffdaf9d5bd7d107b21a/packages/cra-template-typescript/template/src/reportWebVitals.ts

import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
