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
import { StorageType, storageAvailable } from 'common/utils/storage';

enum RecordSession {
  TRUE = 'true',
  FALSE = 'false',
}

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

export function isRecordingEnabled(recordKey: string, recordPercent: number) {
  if (!storageAvailable(StorageType.LOCAL_STORAGE)) {
    return false;
  }
  initStorage(recordKey, recordPercent);
  return localStorage.getItem(recordKey) === RecordSession.TRUE;
}

function initStorage(recordKey: string, recordPercent: number) {
  if (localStorage.getItem(recordKey)) {
    return;
  }
  const enableRecording = Math.random() < recordPercent;
  try {
    localStorage.setItem(
      recordKey,
      enableRecording ? RecordSession.TRUE : RecordSession.FALSE,
    );
  } catch (err) {
    // It doesn't matter if we can't write to localStorage, we only need this
    // for 1% of the users.
    console.warn(`Error writing to localStorage`, err);
  }
}

export default reportWebVitals;
