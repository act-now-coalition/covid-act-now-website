// implementation comes from a later version of create-react-app that this app was created from,
// but the implementation seems worth reusing.
// copied from https://github.com/facebook/create-react-app/blob/4e97dc75ad0c859fde7e2ffdaf9d5bd7d107b21a/packages/cra-template-typescript/template/src/reportWebVitals.ts
// NOTE(chris): Implementation modified to directly import functions used rather than re-import
//  in a separate bundle as web-vitals is already included in the main bundle.
import {
  ReportHandler,
  getCLS,
  getFID,
  getFCP,
  getLCP,
  getTTFB,
} from 'web-vitals';

import { isRecordingEnabled } from 'common/fullstory';

// Percentage of overall users that we want to record
const RECORD_PERCENT = 1 / 10;

const RECORD_KEY = 'WEB_VITALS_RECORD';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (
    onPerfEntry &&
    onPerfEntry instanceof Function &&
    isRecordingEnabled(RECORD_KEY, RECORD_PERCENT)
  ) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
