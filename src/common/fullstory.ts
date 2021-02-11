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
const FULLSTORY_RECORD_PERCENT = 1 / 100;

enum RecordSession {
  TRUE = 'true',
  FALSE = 'false',
}

export function initFullStory() {
  initStorage();

  // If we can't find the value in localStorage we won't enable recordings in FullStory
  if (localStorage.getItem(FULLSTORY_RECORD_KEY) === RecordSession.TRUE) {
    FullStory.init({ orgId: 'XEVN9' });
  }
}

function initStorage() {
  if (localStorage.getItem(FULLSTORY_RECORD_KEY)) {
    return;
  }
  const enableRecording = Math.random() < FULLSTORY_RECORD_PERCENT;
  try {
    localStorage.setItem(
      FULLSTORY_RECORD_KEY,
      enableRecording ? RecordSession.TRUE : RecordSession.FALSE,
    );
  } catch (err) {
    // It doesn't matter if we can't write to localStorage, we only need this
    // for 1% of the users.
    console.warn(`Error writing to localStorage`, err);
  }
}
