import * as FullStory from '@fullstory/browser';

/**
 * We want to sample FullStory recordings so we don't hit the limit so quickly. We do this
 * by storing a flag in localStorage and only initializing FullStory for the percentage of
 * users that have the flag set to "true".
 *
 * If the flag is not found in localStorage, we generate a random number between 0 and 1,
 * and set the flag to true if the number is below the sampling percentage.
 */

const FULLSTORY_RECORD_KEY = 'FULLSTORY_RECORD';

// Percentage of overall users that we want to record
const FULLSTORY_RECORD_PERCENT = 5 / 100;

enum RecordSession {
  TRUE = 'true',
  FALSE = 'false',
}

export function initFullStory() {
  initStorage();

  if (localStorage.getItem(FULLSTORY_RECORD_KEY) === RecordSession.TRUE) {
    FullStory.init({ orgId: 'XEVN9', devMode: true, debug: true });
    console.log('FS: Initialized');
  }
}

function initStorage() {
  if (localStorage.getItem(FULLSTORY_RECORD_KEY)) {
    return;
  }
  const enableRecording = Math.random() < FULLSTORY_RECORD_PERCENT;
  localStorage.setItem(
    FULLSTORY_RECORD_KEY,
    enableRecording ? RecordSession.TRUE : RecordSession.FALSE,
  );
}
